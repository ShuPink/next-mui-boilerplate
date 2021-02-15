import React from 'react';

import PropTypes from 'prop-types';

const svgPropTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
};

const pretty = (name) => {
  let prettyClass = name;
  if (name.length > 0) {
    prettyClass = ` ${name}`;
  }
  return prettyClass;
};

/* ---- Bootstrap Icons ----
  https://icons.getbootstrap.com */

// bootstrap icons default props
const bsDefaultProps = {
  className: '',
  width: '1.5em',
  height: '1.5em',
  viewBox: '0 0 16 16',
  fill: 'currentColor',
};

/** bi-three-dots-vertical */

export const BiThreeDotsVertical = ({
  className,
  width,
  height,
  viewBox,
  fill,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`bi bi-three-dots-vertical${pretty(className)}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
    />
  </svg>
);

BiThreeDotsVertical.propTypes = svgPropTypes;
BiThreeDotsVertical.defaultProps = bsDefaultProps;

/** bi-house */

export const BiHouse = ({
  className, width, height, viewBox, fill,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`bi bi-info-square-fill${pretty(className)}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
    />
    <path
      fillRule="evenodd"
      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
    />
  </svg>
);

BiHouse.propTypes = svgPropTypes;
BiHouse.defaultProps = bsDefaultProps;

/* ---- Loaders ----
  https://github.com/ajwann/svg-loaders-react
  https://github.com/SamHerbert/SVG-Loaders */

export const RingLoader = ({
  className,
  width,
  height,
  viewBox,
  fill,
  stroke,
}) => (
  <svg
    width={width}
    height={height}
    stroke={stroke}
    viewBox={viewBox}
    className={`svg-loaders-svg${className ? ` ${className}` : ''}`}
  >
    <g
      fill={fill}
      fillRule="evenodd"
      transform="translate(1 1)"
      strokeWidth={2}
    >
      <circle cx={22} cy={22} r={6} strokeOpacity={0}>
        <animate
          attributeName="r"
          begin="1.5s"
          dur="3s"
          values="6;22"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="1.5s"
          dur="3s"
          values="1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-width"
          begin="1.5s"
          dur="3s"
          values="2;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={22} cy={22} r={6} strokeOpacity={0}>
        <animate
          attributeName="r"
          begin="3s"
          dur="3s"
          values="6;22"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="3s"
          dur="3s"
          values="1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-width"
          begin="3s"
          dur="3s"
          values="2;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={22} cy={22} r={8}>
        <animate
          attributeName="r"
          begin="0s"
          dur="1.5s"
          values="6;1;2;3;4;5;6"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

RingLoader.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

RingLoader.defaultProps = {
  className: '',
  width: '1.5em',
  height: '1.5em',
  viewBox: '0 0 45 45',
  fill: 'none',
  stroke: 'currentColor',
};

export const ThreeDots = ({
  className, width, height, viewBox, fill,
}) => (
  <svg
    width={width}
    height={height}
    fill={fill}
    viewBox={viewBox}
    className={`svg-loaders-svg${className ? ` ${className}` : ''}`}
  >
    <circle cx={15} cy={15} r={15}>
      <animate
        attributeName="r"
        from={15}
        to={15}
        begin="0s"
        dur="0.8s"
        values="15;9;15"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="fill-opacity"
        from={1}
        to={1}
        begin="0s"
        dur="0.8s"
        values="1;.5;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx={60} cy={15} r={9} fillOpacity={0.3}>
      <animate
        attributeName="r"
        from={9}
        to={9}
        begin="0s"
        dur="0.8s"
        values="9;15;9"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="fill-opacity"
        from={0.5}
        to={0.5}
        begin="0s"
        dur="0.8s"
        values=".5;1;.5"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx={105} cy={15} r={15}>
      <animate
        attributeName="r"
        from={15}
        to={15}
        begin="0s"
        dur="0.8s"
        values="15;9;15"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="fill-opacity"
        from={1}
        to={1}
        begin="0s"
        dur="0.8s"
        values="1;.5;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

ThreeDots.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
};

ThreeDots.defaultProps = {
  className: '',
  width: '4em',
  height: '1em',
  viewBox: '0 0 120 30',
  fill: 'fff',
};
