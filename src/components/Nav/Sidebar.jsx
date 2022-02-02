import React from "react";
import styled from "styled-components";
import { Link as SlideLink} from "react-scroll";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoIcon from "../../components/LogoIcon";
import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <LogoIcon width={50} height={50} />
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            LaundryKart
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <SlideLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Home
          </SlideLink>
        </li>
        <li className="semiBold font15 pointer">
          <SlideLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="services"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Services
          </SlideLink>
        </li>
        <li className="semiBold font15 pointer">
          <SlideLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="blog"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Blog
          </SlideLink>
        </li>
        <li className="semiBold font15 pointer">
          <SlideLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="contact"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Contact
          </SlideLink>
        </li>
      </UlStyle>
      <UlStyle className="flexSpaceCenter">
        {/* <li className="semiBold font15 pointer">
          <Link to="/login" style={{ padding: "10px 30px 10px 0" }} onClick={() => toggleSidebar(!sidebarOpen)} className="whiteColor">
            Log in
          </Link>
        </li> */}
        <li className="semiBold font15 pointer flexCenter">
          <Link to="/login" className="radius8 lightBg" onClick={() => toggleSidebar(!sidebarOpen)} style={{ padding: "10px 15px" }}>
            Schedule a pickup
          </Link>
        </li>
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
