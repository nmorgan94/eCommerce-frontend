import React from "react";
import { Products } from "../components/Products";
import styled from "styled-components";

const HomePage = () => (
  <HomePageWrapper>
    <Products />
  </HomePageWrapper>
);

const HomePageWrapper = styled.div`
  background-color: #d9d9d9;
`;

export default HomePage;
