import styled from "styled-components";
import colours from "./colours";
import { Field } from "formik";

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${colours.lightBlue};
  border-radius: 3px;
`;

export const StyledErrorMessage = styled.div`
  color: red;
`;

export const StyledField = styled(Field)`
  width: 90%;
  padding: 0.8rem 0;
  border: 2px solid ${colours.lightGrey};
  border-radius: 0.5rem;
  padding-left: 1rem;
`;

export const FieldWrapper = styled.div`
  margin: 1rem;
`;
