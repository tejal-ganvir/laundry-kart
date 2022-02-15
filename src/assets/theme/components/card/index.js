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

// Material Dashboard 2 PRO React Base Styles
import colors from "../../base/colors";
import borders from "../../base/borders";
import boxShadows from "../../base/boxShadows";

// Material Dashboard 2 PRO React Helper Function
import rgba from "../../functions/rgba";

const { black, white } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

export default {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundColor: "#ffffff",
      backgroundClip: "border-box",
      border: `${borderWidth[0]} solid ${rgba("#000000", 0.125)}`,
      borderRadius: borderRadius.xl,
      boxShadow: md,
      overflow: "visible",
    },
  },
};
