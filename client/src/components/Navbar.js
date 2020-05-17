import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Navbar = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.handleLogin();
    }, [dataStore]);
    let history = useHistory();

    const handleLogout = () => {
      dataStore.handleLogoutState();
      history.push("/");
    };

    let title = process.env.REACT_APP_API_NAME || "e-com2";

    return (
      <nav>
        <NavWrapper>
          <NavbarLinks>
            <StyledNavLink to="/">{title}</StyledNavLink>
          </NavbarLinks>
          <NavbarLinks>
            {dataStore.isAuthenticated ? (
              <NavbarItem>
                Hi there {dataStore.currentUser.firstName}{" "}
              </NavbarItem>
            ) : null}

            {dataStore.isAuthenticated ? (
              <NavbarItem onClick={handleLogout}>logout</NavbarItem>
            ) : (
              <NavbarItem>
                <StyledNavLink to="/login">login</StyledNavLink>
              </NavbarItem>
            )}

            <NavbarItem>
              <StyledNavLink to="/basket">basket</StyledNavLink>
            </NavbarItem>
          </NavbarLinks>
        </NavWrapper>
      </nav>
    );
  })
);

const NavbarLinks = styled.div`
  display: flex;
  list-style-type: none;
  align-items: center;
  padding: 0;
  margin: 0;
  text-decoration: none;
  width: 50%;
  color: white;
`;

const NavbarItem = styled.div`
  padding: 14px 16px;
  text-decoration: none;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: palevioletred;
  font-weight: bold;
`;

const NavWrapper = styled.nav`
  background-color: #000766;
  display: flex;
`;

export default Navbar;
