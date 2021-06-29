import React, { useContext } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import UserContext from "../contexts/UserContext";
import { UserFields } from "../graphql/fragments";

interface LoginProps {}

interface FormValues {
  username: string;
  password: string;
}

const LOGIN = gql`
  ${UserFields}
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        ...UserFields
      }
      error
    }
  }
`;

const Login: React.FC<LoginProps> = () => {
  const { saveUser } = useContext(UserContext);
  const [login] = useMutation(LOGIN);

  function validate(value: FormValues) {
    let error;
    if (!value) {
      error = "This field is required";
    }
    return error;
  }

  const initialValues: FormValues = { username: "", password: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const { data } = await login({ variables: { ...values } });

        if (data.login.error) {
          actions.setErrors({ username: data.login.error });
        } else {
          saveUser(data.login.user);
        }

        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="username" validate={validate}>
            {({ form, field }: FieldProps) => (
              <FormControl
                isInvalid={Boolean(
                  form.errors.username && form.touched.username
                )}
              >
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input {...field} id="username" placeholder="username" />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validate}>
            {({ form, field }: FieldProps) => (
              <FormControl
                mt={4}
                isInvalid={Boolean(
                  form.errors.password && form.touched.password
                )}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="password"
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={8}
            w="100%"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
