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
 * The base typography styles for the Soft UI Dashboard PRO Material.
 * You can add new typography style using this file.
 * You can customized the typography styles for the entire Soft UI Dashboard PRO Material using thie file.
 */

// Material Dashboard 2 PRO React Base Styles
import colors from "./colors";

// Material Dashboard 2 PRO React Helper Functions
import pxToRem from "../functions/pxToRem";

const { dark } = colors;

const baseProperties = {
  fontFamily: `"Nunito", "Arial", sans-serif`,
  fontSize: 13,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
};

const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  fontWeight: baseProperties.fontWeightBold,
};

const baseDisplayProperties = {
  fontFamily: baseProperties.fontFamily,
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2,
};

const typography = {
  fontFamily: baseProperties.fontFamily,
  fontWeightLighter: baseProperties.fontWeightLighter,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,

  h1: {},

  h2: {},

  h3: {},

  h4: {},

  h5: {},

  h6: {},

  subtitle1: {},

  subtitle2: {},

  body1: {},

  body2: {},

  button: {},

  caption: {},

  overline: {},

  d1: {},

  d2: {},

  d3: {},

  d4: {},

  d5: {},

  d6: {},

  size: {},

  lineHeight: {},
};

export default typography;
