import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton, Stack } from "@mui/material";

function WidgetCard({ color, title, count, percentage, icon }) {
  return (
    <Card>
      <MDBox display='flex' justifyContent='space-between' pt={1} px={2}>
        <MDBox
          variant='gradient'
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius='xl'
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='4rem'
          height='4rem'
          mt={-3}>
          <Icon fontSize='medium' color='inherit'>
            {icon}
          </Icon>
        </MDBox>

        <MDBox textAlign='right' lineHeight={1.25}>
          <MDTypography variant='button' fontWeight='light' color='text'>
            {title}
          </MDTypography>
          <MDTypography variant='h4'>{count}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='flex-start'
        spacing={0}>
        <MDBox pb={2} px={2}>
          <MDTypography
            component='p'
            variant='button'
            color='text'
            display='flex'>
            <MDTypography
              component='span'
              variant='button'
              fontWeight='bold'
              color={percentage.color}>
              {percentage.amount}
            </MDTypography>
            &nbsp;{percentage.label}
          </MDTypography>
        </MDBox>
        <IconButton
          color='primary'
          aria-label='add to shopping cart'
          sx={{ mr: 2,mb:1 }}>
          <RemoveRedEyeIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}

WidgetCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

WidgetCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default WidgetCard;
