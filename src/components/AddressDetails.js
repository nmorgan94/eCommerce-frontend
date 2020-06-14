import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  StyledErrorMessage,
  StyledField,
  FieldWrapper,
} from "../styles/StyledComponents";

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
      <FieldWrapper>
        <StyledField name="firstName" placeholder="First Name" />
        <ErrorMessage
          name="firstName"
          render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        />
      </FieldWrapper>
      <FieldWrapper>
        <StyledField name="lastName" placeholder="Last Name" />
        <ErrorMessage
          name="lastName"
          render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        />
      </FieldWrapper>
      <FieldWrapper>
        <StyledField name="address1" placeholder="Address Line 1" />
        <ErrorMessage
          name="address1"
          render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        />
      </FieldWrapper>
      <FieldWrapper>
        <StyledField name="city" placeholder="City" />
        <ErrorMessage
          name="city"
          render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        />
      </FieldWrapper>
      <FieldWrapper>
        <StyledField name="postcode" placeholder="Post Code" />
        <ErrorMessage
          name="postcode"
          render={(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        />
      </FieldWrapper>
      <Button type="submit">Pay Now</Button>
    </Form>
  </Formik>
);
