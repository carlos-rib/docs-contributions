import * as echarts from "echarts"
import type { ThemeOption } from "echarts/types/src/util/types.js"

export const KOTHAR_ECHARTS_THEMES: Record<"kothar-dark" | "kothar-light", ThemeOption> = {
  "kothar-dark": {
    color: ["#7cc4ff", "#ffb86b", "#9bdfb1", "#c39cff", "#ff7aa2", "#8be9fd", "#f1fa8c"],
    backgroundColor: "transparent",
    textStyle: {
      color: "#e7edf4",
      fontFamily: "Computer Modern",
    },
    title: {
      top: 12,
      padding: [4, 0, 12, 0],
      textStyle: {
        color: "#e7edf4",
        fontWeight: 600,
      },
      subtextStyle: {
        color: "#9aa4b2",
      },
    },
    grid: {
      top: 90,
    },
    legend: {
      textStyle: {
        color: "#cbd5e1",
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      borderColor: "rgba(148, 163, 184, 0.35)",
      textStyle: {
        color: "#e2e8f0",
      },
    },
    axisPointer: {
      lineStyle: {
        color: "#94a3b8",
      },
      label: {
        backgroundColor: "#1f2937",
      },
    },
    categoryAxis: {
      axisLine: { lineStyle: { color: "#475569" } },
      axisTick: { lineStyle: { color: "#475569" } },
      axisLabel: { color: "#cbd5e1" },
      splitLine: { lineStyle: { color: "#1f2937" } },
      splitArea: { areaStyle: { color: ["rgba(2, 6, 23, 0.1)", "rgba(2, 6, 23, 0)"] } },
    },
    valueAxis: {
      axisLine: { lineStyle: { color: "#475569" } },
      axisTick: { lineStyle: { color: "#475569" } },
      axisLabel: { color: "#cbd5e1" },
      splitLine: { lineStyle: { color: "#1f2937" } },
      splitArea: { areaStyle: { color: ["rgba(2, 6, 23, 0.1)", "rgba(2, 6, 23, 0)"] } },
    },
    logAxis: {
      axisLine: { lineStyle: { color: "#475569" } },
      axisTick: { lineStyle: { color: "#475569" } },
      axisLabel: { color: "#cbd5e1" },
      splitLine: { lineStyle: { color: "#1f2937" } },
      splitArea: { areaStyle: { color: ["rgba(2, 6, 23, 0.1)", "rgba(2, 6, 23, 0)"] } },
    },
    timeAxis: {
      axisLine: { lineStyle: { color: "#475569" } },
      axisTick: { lineStyle: { color: "#475569" } },
      axisLabel: { color: "#cbd5e1" },
      splitLine: { lineStyle: { color: "#1f2937" } },
      splitArea: { areaStyle: { color: ["rgba(2, 6, 23, 0.1)", "rgba(2, 6, 23, 0)"] } },
    },
    toolbox: {
      iconStyle: {
        borderColor: "#cbd5e1",
      },
      emphasis: {
        iconStyle: {
          borderColor: "#ffffff",
        },
      },
    },
    dataZoom: {
      backgroundColor: "rgba(15, 23, 42, 0.35)",
      fillerColor: "rgba(59, 130, 246, 0.25)",
      handleColor: "#94a3b8",
      textStyle: { color: "#cbd5e1" },
    },
  },
  "kothar-light": {
    color: ["#2563eb", "#ea580c", "#16a34a", "#7c3aed", "#dc2626", "#0891b2", "#ca8a04"],
    backgroundColor: "#ffffff",
    textStyle: {
      color: "#0f172a",
      fontFamily: "Computer Modern",
    },
    title: {
      top: 12,
      padding: [4, 0, 12, 0],
      textStyle: {
        color: "#0f172a",
        fontWeight: 600,
      },
      subtextStyle: {
        color: "#475569",
      },
    },
    grid: {
      top: 90,
    },
    legend: {
      textStyle: {
        color: "#0f172a",
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      borderColor: "rgba(15, 23, 42, 0.15)",
      textStyle: {
        color: "#0f172a",
      },
    },
    axisPointer: {
      lineStyle: {
        color: "#64748b",
      },
      label: {
        backgroundColor: "#e2e8f0",
        color: "#0f172a",
      },
    },
    categoryAxis: {
      axisLine: { lineStyle: { color: "#94a3b8" } },
      axisTick: { lineStyle: { color: "#94a3b8" } },
      axisLabel: { color: "#0f172a" },
      splitLine: { lineStyle: { color: "#e2e8f0" } },
      splitArea: { areaStyle: { color: ["rgba(148, 163, 184, 0.12)", "rgba(148, 163, 184, 0)"] } },
    },
    valueAxis: {
      axisLine: { lineStyle: { color: "#94a3b8" } },
      axisTick: { lineStyle: { color: "#94a3b8" } },
      axisLabel: { color: "#0f172a" },
      splitLine: { lineStyle: { color: "#e2e8f0" } },
      splitArea: { areaStyle: { color: ["rgba(148, 163, 184, 0.12)", "rgba(148, 163, 184, 0)"] } },
    },
    logAxis: {
      axisLine: { lineStyle: { color: "#94a3b8" } },
      axisTick: { lineStyle: { color: "#94a3b8" } },
      axisLabel: { color: "#0f172a" },
      splitLine: { lineStyle: { color: "#e2e8f0" } },
      splitArea: { areaStyle: { color: ["rgba(148, 163, 184, 0.12)", "rgba(148, 163, 184, 0)"] } },
    },
    timeAxis: {
      axisLine: { lineStyle: { color: "#94a3b8" } },
      axisTick: { lineStyle: { color: "#94a3b8" } },
      axisLabel: { color: "#0f172a" },
      splitLine: { lineStyle: { color: "#e2e8f0" } },
      splitArea: { areaStyle: { color: ["rgba(148, 163, 184, 0.12)", "rgba(148, 163, 184, 0)"] } },
    },
    toolbox: {
      iconStyle: {
        borderColor: "#475569",
      },
      emphasis: {
        iconStyle: {
          borderColor: "#0f172a",
        },
      },
    },
    dataZoom: {
      backgroundColor: "rgba(148, 163, 184, 0.18)",
      fillerColor: "rgba(37, 99, 235, 0.22)",
      handleColor: "#64748b",
      textStyle: { color: "#0f172a" },
    },
  },
}

export type KotharEChartsTheme = keyof typeof KOTHAR_ECHARTS_THEMES
export const DEFAULT_KOTHAR_ECHARTS_THEME: KotharEChartsTheme = "kothar-dark"

for (const [name, options] of Object.entries(KOTHAR_ECHARTS_THEMES)) {
  echarts.registerTheme(name, options)
}
