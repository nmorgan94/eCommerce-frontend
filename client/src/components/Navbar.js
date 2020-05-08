import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Navbar = inject("dataStore")(
  observer(({ dataStore }) => {
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
            <Title to="/">{title}</Title>
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
                <NavLink to="/login">login</NavLink>
              </NavbarItem>
            )}

            <NavbarItem>
              <NavLink to="/basket">shopping_cart</NavLink>
            </NavbarItem>
          </NavbarLinks>
        </NavWrapper>
      </nav>
    );
  })
);

const Title = styled(Link)`
  text-decoration: none;
`;

const NavbarLinks = styled.div`
  display: flex;
  list-style-type: none;
  align-items: center;
  padding: 0;
  margin: 0;
  text-decoration: none;
  width: 50%;
`;

const NavbarItem = styled.div`
  padding: 14px 16px;
  text-decoration: none;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

const NavWrapper = styled.nav`
  background-color: #f0f8ff;
  display: flex;
`;

export default Navbar;
