import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ACCESS_TOKEN } from "../constants";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colours from "../styles/colours";
import {
  Button,
  StyledErrorMessage,
  StyledField,
  FieldWrapper,
} from "../styles/StyledComponents";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Required"),
  password: Yup.string().required("No password provided."),
});

const LoginPage = inject("dataStore")(
  observer(({ dataStore }) => {
    let history = useHistory();
    const [badCredentials, setBadCredentials] = useState(false);
    return (
      <LoginWrapper>
        <h2>
          Please login or <Link to="/signup">signup</Link>{" "}
        </h2>
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={(values) => {
            const loginRequest = JSON.stringify(values);
            console.log("login request: ", loginRequest);

            fetch("/api/auth/signin", {
              method: "POST",
              body: loginRequest,
              headers: { "Content-Type": "application/json" },
            })
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                if (response.status === 401) {
                  setBadCredentials(true);
                } else {
                  console.log("setting token!", response.accessToken);
                  localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                  dataStore.handleLogin();
                  history.push(`/`);
                }
              })
              .catch(() => {
                console.log("login api call failed");
              });
          }}
          validationSchema={validationSchema}
        >
          <Form>
            {badCredentials && (
              <div className="input-feedback">
                Incorrect username or password
              </div>
            )}
            <FieldWrapper>
              <StyledField
                name="usernameOrEmail"
                placeholder="Username or Email"
              />
              <ErrorMessage
                name="usernameOrEmail"
                render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
              />
            </FieldWrapper>
            <FieldWrapper>
              <StyledField
                name="password"
                placeholder="Password"
                type="password"
              />
              <ErrorMessage
                name="password"
                render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
              />
            </FieldWrapper>
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </LoginWrapper>
    );
  })
);

const LoginWrapper = styled.div`
  width: 25%;
  text-align: center;
  border: 1px solid ${colours.lightGrey};
  margin: 2rem auto;
  border-radius: 1rem;
`;

export default LoginPage;
