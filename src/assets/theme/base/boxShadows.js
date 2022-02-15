/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
 * The base box-shadow styles for the Soft UI Dashboard PRO Material.
 * You can add new box-shadow using this file.
 * You can customized the box-shadow for the entire Soft UI Dashboard PRO Material using thie file.
 */

// Material Dashboard 2 PRO React Base Styles
import colors from "./colors";

// Material Dashboard 2 PRO React Helper Functions
import boxShadow from "../functions/boxShadow";

const { black, white, tabs, coloredShadows } = colors;

export default {
  xs: boxShadow([0, 2], [9, -5], "#000000", 0.15),
  sm: boxShadow([0, 5], [10, 0], "#000000", 0.12),
  md: `${boxShadow([0, 4], [6, -1], "#000000", 0.1)}, ${boxShadow(
    [0, 2],
    [4, -1],
    "#000000",
    0.06,
  )}`,
  lg: `${boxShadow([0, 10], [15, -3], "#000000", 0.1)}, ${boxShadow(
    [0, 4],
    [6, -2],
    "#000000",
    0.05,
  )}`,
  xl: `${boxShadow([0, 20], [25, -5], "#000000", 0.1)}, ${boxShadow(
    [0, 10],
    [10, -5],
    "#000000",
    0.04,
  )}`,
  xxl: boxShadow([0, 20], [27, 0], "#000000", 0.05),
  inset: boxShadow([0, 1], [2, 0], "#000000", 0.075, "inset"),
  colored: {
    primary: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#e91e62",
      0.4,
    )}`,
    secondary: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#110e0e",
      0.4,
    )}`,
    info: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#00bbd4",
      0.4,
    )}`,
    success: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#4caf4f",
      0.4,
    )}`,
    warning: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#ff9900",
      0.4,
    )}`,
    error: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#f44336",
      0.4,
    )}`,
    light: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#adb5bd",
      0.4,
    )}`,
    dark: `${boxShadow([0, 4], [20, 0], "#000000", 0.14)}, ${boxShadow(
      [0, 7],
      [10, -5],
      "#404040",
      0.4,
    )}`,
  },

  navbarBoxShadow: `${boxShadow(
    [0, 0],
    [1, 1],
    "#ffffff",
    0.9,
    "inset",
  )}, ${boxShadow([0, 20], [27, 0], "#000000", 0.05)}`,
  sliderBoxShadow: {
    thumb: boxShadow([0, 1], [13, 0], "#000000", 0.2),
  },
  tabsBoxShadow: {
    indicator: boxShadow([0, 1], [5, 1], "#ddd", 1),
  },
};
