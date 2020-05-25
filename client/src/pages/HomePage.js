import React from "react";
import { Products } from "../components/Products";
import styled from "styled-components";
import colours from "../styles/colours";

const HomePage = () => (
  <HomePageWrapper>
    <Products />
  </HomePageWrapper>
);

const HomePageWrapper = styled.div`
  background-color: ${colours.lightGrey};
  height: 100%;
`;

export default HomePage;
