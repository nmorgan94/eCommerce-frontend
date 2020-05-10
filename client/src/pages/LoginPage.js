import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ACCESS_TOKEN } from "../constants";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Required"),
  password: Yup.string().required("No password provided."),
});

const LoginPage = inject("dataStore")(
  observer(({ dataStore }) => {
    let history = useHistory();
    const [badCredentials, setBadCredentials] = useState(false);
    return (
      <div>
        <h1>Login</h1>
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={(values) => {
            const loginRequest = JSON.stringify(values);
            console.log("login request: ", loginRequest);

            fetch("/auth/login", {
              method: "POST",
              body: loginRequest,
              headers: { "Content-Type": "application/json" },
            })
              .then((response) => {
                return response.json();
              })
              .then((response) => {
                console.log("setting token!", response.accessToken);
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                //dataStore.handleLogin();
                //history.push(`/`);
              })
              .catch(() => console.log("login api call failed"));
          }}
          validationSchema={validationSchema}
        >
          <Form>
            {badCredentials ? (
              <div className="input-feedback">
                Incorrect username or password
              </div>
            ) : null}
            <Field name="usernameOrEmail" />
            <ErrorMessage name="usernameOrEmail" />
            <br />
            <Field name="password" />
            <ErrorMessage name="password" />
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    );
  })
);

export default LoginPage;
