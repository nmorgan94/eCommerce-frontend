import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

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

const SignupPage = inject("dataStore")(
  observer(({ dataStore }) => {
    let history = useHistory();
    const [userNameExists, setUserNameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const handleErrors = (response) => {
      if (response.message === "Username is already taken!") {
        setUserNameExists(true);
      }
      if (response.message === "Email is already taken!") {
        setEmailExists(true);
      }
    };

    return (
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

          //   dataStore
          //     .signup(signupRequest)
          //     .then((response) => {
          //       history.push(`/login`);
          //     })
          //     .catch((error) => {
          //       console.log("caught");
          //       handleErrors(error);
          //     });

          fetch("/auth/signup", {
            method: "POST",
            body: signupRequest,
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              return response.json();
            })
            .then(() => {
              history.push(`/login`);
            })
            .catch((error) => {
              console.log("caught");
              handleErrors(error);
            });
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <Field name="name" />
          <ErrorMessage name="name" />
          <br />
          <Field name="username" />
          <ErrorMessage name="username" />
          {userNameExists && <div>Username already exsists</div>}
          <br />
          <Field name="email" />
          <ErrorMessage name="email" />

          {emailExists && <div>Email already exsists</div>}
          <br />
          <Field name="password" />
          <ErrorMessage name="password" />
          <br />
          <Field name="passwordConfirm" />
          <ErrorMessage name="passwordConfirm" />
          <br />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );
  })
);

export default SignupPage;
