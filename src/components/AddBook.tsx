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
  ButtonGroup,
  ButtonProps,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  useAddBookMutation,
  useUpdateBookMutation,
} from "../graphql/mutations/AddBook";
import to from "await-to-js";
import { Book } from "../interfaces";

interface AddBookProps {
  book?: Book;
  buttonProps?: ButtonProps;
}

const AddBook: React.FC<AddBookProps> = ({ book, buttonProps }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const required = (
    value: any,
    fieldName: string,
    required: boolean = true
  ) => {
    let error;
    if (required && !value) {
      error = `${fieldName} is required.`;
    }
    return error;
  };

  const initialValues = book
    ? {
        ...book,
        publishedDate: new Date(book.publishedDate).toJSON().slice(0, 7),
      }
    : {
        name: "",
        isbn: "",
        cover: "",
        author: "",
        category: "",
        publishedDate: new Date().toJSON().slice(0, 7),
      };

  return (
    <>
      <Button onClick={onOpen} {...buttonProps}>
        {buttonProps?.title || "Add Book"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{book ? "Edit" : "Add"} Book</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              const [error, result] = await to(
                book
                  ? updateBook({
                      variables: {
                        bookInput: {
                          ...values,
                          publishedDate: new Date(
                            values.publishedDate
                          ).getTime(),
                        },
                      },
                    })
                  : addBook({
                      variables: {
                        bookInput: {
                          ...values,
                          publishedDate: new Date(
                            values.publishedDate
                          ).getTime(),
                        },
                      },
                    })
              );

              if (error) {
                toast({
                  title: "An error occurred.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                setSubmitting(false);
              } else {
                toast({
                  title: `Book "${
                    result?.data?.[book ? "updateBook" : "addBook"].name
                  }" ${book ? "updated" : "added"}!`,
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                onClose();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <Field
                    name="name"
                    validate={(value: string) => required(value, "Book name")}
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

                  <Field
                    name="author"
                    validate={(value: string) => required(value, "Author")}
                  >
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

                  <Field
                    name="category"
                    validate={(value: string) => required(value, "Category")}
                  >
                    {({ form, field }: FieldProps) => (
                      <FormControl
                        mt={4}
                        isInvalid={Boolean(
                          form.errors.category && form.touched.category
                        )}
                      >
                        <FormLabel htmlFor="category">Category</FormLabel>
                        <Input
                          {...field}
                          id="category"
                          placeholder="category"
                        />
                        <FormErrorMessage>
                          {form.errors.category}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field
                    name="isbn"
                    validate={(value: string) => required(value, "ISBN")}
                  >
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
                          id="isbn"
                          maxLength={13}
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

                  <Field
                    name="publishedDate"
                    validate={(value: string) =>
                      required(value, "Published date")
                    }
                  >
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
                          type="month"
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
                  <ButtonGroup spacing={2}>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme="blue"
                    >
                      {book ? "Save" : "Add"}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ButtonGroup>
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
