import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Figure.module.css';
import 'katex/dist/katex.min.css';
import { applyMathToOptions } from './echarts-math';
import { DEFAULT_KOTHAR_ECHARTS_THEME } from './echarts-theme';

const DEFAULT_ARIA_LABEL = 'Figure';
const MATH_PATTERN = /\$\$[\s\S]+?\$\$|\$[^$]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)/g;
let katexReadyPromise;

const hasKatexCssRules = () => {
  if (typeof document === 'undefined') return false;
  let count = 0;
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (!sheet.cssRules) continue;
      for (const rule of Array.from(sheet.cssRules)) {
        if (rule instanceof CSSStyleRule && rule.selectorText.includes('.katex')) {
          count += 1;
          if (count > 0) return true;
        }
      }
    } catch {
      // Cross-origin stylesheet; ignore.
    }
  }
  return false;
};

const ensureKatexReady = (maxWaitMs = 3000) => {
  if (typeof window === 'undefined') {
    return Promise.resolve(true);
  }
  if (!katexReadyPromise) {
    katexReadyPromise = new Promise((resolve) => {
      if (hasKatexCssRules()) {
        resolve(true);
        return;
      }
      const start = Date.now();
      const tick = () => {
        if (hasKatexCssRules()) {
          resolve(true);
          return;
        }
        if (Date.now() - start >= maxWaitMs) {
          resolve(false);
          return;
        }
        setTimeout(tick, 50);
      };
      tick();
    });
  }
  return katexReadyPromise;
};

const hasMathInOptions = (options) => {
  try {
    MATH_PATTERN.lastIndex = 0;
    return MATH_PATTERN.test(JSON.stringify(options));
  } catch {
    return false;
  }
};

export default function Figure({ src, alt, title, className, ...rest }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const normalizedSrc =
    typeof src === 'string'
      ? src
      : src && typeof src === 'object'
        ? src.default || src.src || ''
        : '';
  const resolvedSrc = normalizedSrc ? useBaseUrl(normalizedSrc) : '';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let chart;
    let resizeObserver;
    let cancelled = false;
    let resizeHandler;

    const load = async () => {
      try {
        if (!resolvedSrc) {
          throw new Error('Missing figure source.');
        }
        const [echartsModule, response] = await Promise.all([
          import('echarts'),
          fetch(resolvedSrc),
        ]);

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to load figure: ${response.status}`);
        }

        const options = await response.json();
        const hasMath = hasMathInOptions(options);
        const katexReady = hasMath ? await ensureKatexReady() : true;
        const themeName = 'kothar-dark';

        if (!containerRef.current || cancelled) {
          return;
        }

        const echarts = echartsModule.default ?? echartsModule;
        if (!echarts || typeof echarts.init !== 'function') {
          throw new Error('ECharts failed to load.');
        }

        chart = echarts.init(containerRef.current, themeName);

        const applyAndRender = (baseOptions) => {
          const themedOptions = applyMathToOptions(baseOptions, themeName);
          const toNumber = (value) =>
            typeof value === 'number' && Number.isFinite(value) ? value : null;
          const normalizeGrid = (grid) => {
            if (!grid || typeof grid !== 'object') return null;
            return grid;
          };
          const setGrid = (grid) => {
            themedOptions.grid = grid;
          };
          const measureTextWidth = (text, style = {}) => {
            if (typeof document === 'undefined') return 0;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) return 0;
            const fontSize = toNumber(style.fontSize) ?? 16;
            const fontFamily = style.fontFamily || 'Computer Modern';
            const fontWeight = style.fontWeight || 'normal';
            const fontStyle = style.fontStyle || 'normal';
            context.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
            return context.measureText(text).width;
          };
          const estimateAxisNameWidth = (axis, fallback = 0) => {
            if (!axis) return fallback;
            const axisItem = Array.isArray(axis) ? axis[0] : axis;
            if (!axisItem || typeof axisItem !== 'object') return fallback;
            if (typeof axisItem.name !== 'string') return fallback;
            const nameTextStyle = axisItem.nameTextStyle || axisItem.axisLabel?.textStyle || {};
            return measureTextWidth(axisItem.name, nameTextStyle);
          };
          const hasMathName = (axis) => {
            if (!axis) return false;
            const axisItem = Array.isArray(axis) ? axis[0] : axis;
            if (!axisItem || typeof axisItem !== 'object') return false;
            if (typeof axisItem.name !== 'string') return false;
            MATH_PATTERN.lastIndex = 0;
            return MATH_PATTERN.test(axisItem.name);
          };
          const defaultGrid = {
            left: 56,
            right: 56,
            top: themedOptions.title ? 72 : 24,
            bottom: 48,
            containLabel: true,
          };
          const grid = normalizeGrid(themedOptions.grid) ?? { ...defaultGrid };

          if (grid.left == null && grid.right == null) {
            const xNameWidth = estimateAxisNameWidth(themedOptions.xAxis, 0);
            const mathName = hasMathName(themedOptions.xAxis);
            const padding = mathName ? 80 : 56;
            const extra = Math.min(140, Math.max(0, Math.ceil(xNameWidth - 32)));
            grid.right = padding + extra;
            grid.left = padding;
          } else {
            if (grid.left == null) grid.left = defaultGrid.left;
            if (grid.right == null) grid.right = defaultGrid.right;
          }
          if (grid.top == null) grid.top = defaultGrid.top;
          if (grid.bottom == null) grid.bottom = defaultGrid.bottom;
          if (grid.containLabel == null) grid.containLabel = true;
          setGrid(grid);

          chart.setOption(themedOptions, true);
        };

        applyAndRender(options);

        if (hasMath && !katexReady) {
          ensureKatexReady().then((ready) => {
            if (!ready || cancelled || !chart) return;
            applyAndRender(options);
          });
        }

        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(() => {
            chart?.resize();
          });
          resizeObserver.observe(containerRef.current);
        } else {
          resizeHandler = () => chart?.resize();
          window.addEventListener('resize', resizeHandler);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err && typeof err === 'object' && 'message' in err
              ? err.message
              : 'Unable to render figure.';
          setError(message);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (chart) {
        chart.dispose();
      }
    };
  }, [resolvedSrc]);

  return (
    <div className={[styles.figure, className].filter(Boolean).join(' ')} {...rest}>
      <div
        ref={containerRef}
        className={styles.chart}
        role='img'
        aria-label={alt || title || DEFAULT_ARIA_LABEL}
      />
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
}
