import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const AddressDetails = () => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      postcode: "",
    }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
      alert("This is a mock order! click ok to redirect to homepage");
      window.location.href = "/";
    }}
  >
    <Form>
      <Field name="firstName" />
      <ErrorMessage name="firstName" />
      <br />
      <Field name="lastName" />
      <ErrorMessage name="lastName" />

      <br />
      <Field name="address1" />
      <ErrorMessage name="address1" />

      <br />
      <Field name="city" />
      <ErrorMessage name="city" />
      <br />
      <Field name="postcode" />
      <ErrorMessage name="postcode" />
      <br />
      <button type="submit">Pay Now</button>
    </Form>
  </Formik>
);
