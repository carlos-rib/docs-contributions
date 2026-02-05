/**
 * @typedef {Object} ShimmerButtonProps
 * @property {React.ReactNode} children
 * @property {"button" | "a"} [as] - Render as a button or anchor. Defaults to "button".
 * @property {string} [href] - Required when `as === "a"`.
 * @property {"button" | "submit" | "reset"} [type] - Button type. Defaults to "button".
 * @property {boolean} [disabled] - Disabled state.
 * @property {(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void} [onClick]
 * @property {string} [className]
 */

import React from 'react';
import './Button.css';

/**
 * @param {ShimmerButtonProps} props
 */

export function Button(props) {
  const {
    children,
    as = 'button',
    href,
    type = 'button',
    disabled = false,
    onClick,
    ...rest
  } = props;

  if (as === 'a' && !href) {
    console.error('ShimmerButton: `href` is required when `as="a"`.');
  }

  if (as === 'a') {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='btn-gradient'
        aria-disabled={disabled ? 'true' : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={as}
      className='btn-gradient'
      disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
