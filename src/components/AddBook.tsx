import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useAddBookMutation } from "../graphql/mutations/AddBook";
import to from "await-to-js";

const AddBook: React.FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addBook] = useAddBookMutation();

  const required = (value: any, label: string) => {
    let error;
    if (!value) {
      error = `${label} is required!`;
    }
    return error;
  };

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Add Book
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Book</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              name: "",
              isbn: "",
              cover: "",
              author: "",
              publishedDate: new Date(),
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const [error, result] = await to(
                addBook({
                  variables: {
                    bookInput: {
                      ...values,
                      isbn: +values.isbn,
                      publishedDate: new Date(values.publishedDate).getTime(),
                    },
                  },
                })
              );

              if (error) {
                setSubmitting(false);
                toast({
                  title: "An error occurred.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }

              resetForm();
              toast({
                title: `Book "${result?.data?.addBook.name}" added!`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <Field
                    name="name"
                    validate={(value: string) => required(value, "Book Name")}
                  >
                    {({ form, field }: FieldProps) => (
                      <FormControl
                        isInvalid={Boolean(
                          form.errors.name && form.touched.name
                        )}
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input {...field} id="name" placeholder="name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="isbn">
                    {({ form, field }: FieldProps) => (
                      <FormControl
                        mt={4}
                        isInvalid={Boolean(
                          form.errors.isbn && form.touched.isbn
                        )}
                      >
                        <FormLabel htmlFor="isbn">ISBN</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          id="isbn"
                          placeholder="ISBN"
                        />
                        <FormErrorMessage>{form.errors.isbn}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="cover">
                    {({ form, field }: FieldProps) => (
                      <FormControl
                        mt={4}
                        isInvalid={Boolean(
                          form.errors.cover && form.touched.cover
                        )}
                      >
                        <FormLabel htmlFor="cover">Cover</FormLabel>
                        <Input {...field} id="cover" placeholder="cover" />
                        <FormErrorMessage>{form.errors.cover}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="author">
                    {({ form, field }: FieldProps) => (
                      <FormControl
                        mt={4}
                        isInvalid={Boolean(
                          form.errors.author && form.touched.author
                        )}
                      >
                        <FormLabel htmlFor="author">Author</FormLabel>
                        <Input {...field} id="author" placeholder="author" />
                        <FormErrorMessage>
                          {form.errors.author}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="publishedDate">
                    {({ form, field }: FieldProps) => (
                      <FormControl
                        mt={4}
                        isInvalid={Boolean(
                          form.errors.publishedDate &&
                            form.touched.publishedDate
                        )}
                      >
                        <FormLabel htmlFor="publishedDate">
                          Published Date
                        </FormLabel>
                        <Input
                          {...field}
                          type="date"
                          id="publishedDate"
                          placeholder="published date"
                        />
                        <FormErrorMessage>
                          {form.errors.publishedDate}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* <DividerWithLabel label="Copies" /> */}
                </ModalBody>

                <ModalFooter>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                  >
                    Add
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBook;
