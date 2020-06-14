import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import colours from "../styles/colours";
import {
  Button,
  StyledErrorMessage,
  StyledField,
  FieldWrapper,
} from "../styles/StyledComponents";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
});

const SignupPage = () => {
  let history = useHistory();
  const [userNameExists, setUserNameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  return (
    <SignUpWrapper>
      <h2>Create account</h2>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) => {
          const signupRequest = JSON.stringify(values);

          setUserNameExists(false);
          setEmailExists(false);

          fetch("/api/auth/signup", {
            method: "POST",
            body: signupRequest,
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.message === "Username is already taken!") {
                setUserNameExists(true);
              } else if (response.message === "Email Address already in use!") {
                setEmailExists(true);
              } else {
                history.push(`/login`);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <FieldWrapper>
            <StyledField name="name" placeholder="Your Name" />
            <ErrorMessage
              name="name"
              render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            />
          </FieldWrapper>

          <FieldWrapper>
            <StyledField name="username" placeholder="Choose your Usernname" />
            <ErrorMessage
              name="username"
              render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            />
            {userNameExists && <div>Username already exsists</div>}
          </FieldWrapper>

          <FieldWrapper>
            <StyledField name="email" placeholder="Your Email" />
            <ErrorMessage
              name="email"
              render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            />

            {emailExists && <div>Email already exsists</div>}
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
          <FieldWrapper>
            <StyledField
              name="passwordConfirm"
              placeholder="Re-enter your Password"
              type="password"
            />
            <ErrorMessage
              name="passwordConfirm"
              render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
            />
          </FieldWrapper>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
  width: 25%;
  text-align: center;
  border: 1px solid ${colours.lightGrey};
  border-radius: 1rem;
  margin: 2rem auto;
`;

export default SignupPage;
