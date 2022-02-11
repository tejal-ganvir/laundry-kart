import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as SlideLink } from "react-scroll";
// Components
import Sidebar from "../components/Nav/Sidebar";
import Backdrop from "../components/Elements/Backdrop";
// Assets
import BurgerIcon from "../assets/svg/BurgerIcon";
import LogoIcon from "../components/LogoIcon";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import ProfileDropdown from "./ProfileDropdown";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link to="/" className="pointer flexNullCenter">
            <LogoIcon width={50} height={50} />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              LaundryKart
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <NavLink style={{ padding: "10px 15px" }} to="/">
                Home
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink style={{ padding: "10px 15px" }} to="/laundry">
                Laundry
              </NavLink>
            </li>
            {/* <li className="semiBold font15 pointer">
              <SlideLink activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </SlideLink>
            </li> */}
            {/* <li className="semiBold font15 pointer">
              <SlideLink activeClass="active" style={{ padding: "10px 15px" }} to="projects" spy={true} smooth={true} offset={-80}>
                Projects
              </SlideLink>
            </li> */}
            {/* <li className="semiBold font15 pointer">
              <SlideLink activeClass="active" style={{ padding: "10px 15px" }} to="blog" spy={true} smooth={true} offset={-80}>
                Blog
              </SlideLink>
            </li> */}
            {/* <li className="semiBold font15 pointer">
              <SlideLink activeClass="active" style={{ padding: "10px 15px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                Pricing
              </SlideLink>
            </li> */}
            {/* <li className="semiBold font15 pointer">
              <SlideLink activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </SlideLink>
            </li> */}
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            {/* <li className="semiBold font15 pointer">
              <Link to="/login" style={{ padding: "10px 30px 10px 0" }}>
                Log in
              </Link>
            </li> */}
            <li className="semiBold font15 pointer flexCenter">
              <Button 
                sx={{borderRadius: 4, px: 3}}
                variant="outlined" 
                component={Link} 
                to="/login" >
                Schedule a Pickup
              </Button>
            </li>
            <li className="semiBold font15 pointer">
              <ProfileDropdown />
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


