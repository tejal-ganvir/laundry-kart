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

// Material Dashboard 2 PRO React helper functions
import rgba from "../functions/rgba";
import pxToRem from "../functions/pxToRem";

const { dark, transparent, white } = colors;

export default {
  styleOverrides: {
    root: {
      backgroundColor: "transparent",
      backgroundImage: `linear-gradient(to right, ${rgba("#000000", 0)}, ${rgba(
        "#000000",
        0.4,
      )}, ${rgba("#000000", 0)}) !important`,
      height: pxToRem(1),
      margin: `${pxToRem(16)} 0`,
      borderBottom: "none",
      opacity: 0.25,
    },

    vertical: {
      backgroundColor: "transparent",
      backgroundImage: `linear-gradient(to bottom, ${rgba(
        "#000000",
        0,
      )}, ${rgba("#000000", 0.4)}, ${rgba("#000000", 0)}) !important`,
      width: pxToRem(1),
      height: "100%",
      margin: `0 ${pxToRem(16)}`,
      borderRight: "none",
    },

    light: {
      backgroundColor: "transparent",
      backgroundImage: `linear-gradient(to right, ${rgba(
        "#ffffff",
        0,
      )}, ${"#ffffff"}, ${rgba("#ffffff", 0)}) !important`,

      "&.MuiDivider-vertical": {
        backgroundImage: `linear-gradient(to bottom, ${rgba(
          "#ffffff",
          0,
        )}, ${"#ffffff"}, ${rgba("#ffffff", 0)}) !important`,
      },
    },
  },
};
