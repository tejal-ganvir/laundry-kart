import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const handleClick = (event) => {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
};

const AppBreadcrumb = (props) => {
  return (
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link underline='hover' color='inherit' to='/vendor/dashboard'>
          Dashboard
        </Link>
        <Link
          underline='hover'
          color='primary'
          aria-current='page'>
          {props.secondtext}
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default AppBreadcrumb;
