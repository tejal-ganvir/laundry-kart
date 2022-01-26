import React from 'react';
import logo from '../../assets/logo/logo.png';

const LogoIcon = ({height, width}) => {
  return(
    <img src={logo} height={height} width={width} />
  );
};

export default LogoIcon;
