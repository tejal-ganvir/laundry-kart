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

// Material Dashboard 2 PRO React base styles
import colors from "../base/colors";
import borders from "../base/borders";
import boxShadows from "../base/boxShadows";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../functions/pxToRem";

const { grey, white, black, info } = colors;
const { borderRadius, borderWidth } = borders;
const { sliderBoxShadow } = boxShadows;

export default {
  styleOverrides: {
    root: {
      width: "100%",

      "& .MuiSlider-active, & .Mui-focusVisible": {
        boxShadow: "none !important",
      },

      "& .MuiSlider-valueLabel": {
        color: "#000000",
      },
    },

    rail: {
      height: pxToRem(2),
      background: "#f0f2f5",
      borderRadius: borderRadius.sm,
      opacity: 1,
    },

    track: {
      background: "#49a3f1",
      height: pxToRem(2),
      position: "relative",
      border: "none",
      borderRadius: borderRadius.lg,
      zIndex: 1,
    },

    thumb: {
      width: pxToRem(14),
      height: pxToRem(14),
      backgroundColor: "#ffffff",
      zIndex: 10,
      boxShadow: sliderBoxShadow.thumb,
      border: `${borderWidth[1]} solid #49a3f1`,

      "&:hover": {
        boxShadow: "none",
      },
    },
  },
};
