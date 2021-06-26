import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonProps,
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
import { useAddCopyMutation } from "../graphql/mutations/AddCopy";
import to from "await-to-js";
import { CopyStatus } from "../interfaces";

const AddCopy: React.FC<{
  bookId: number;
  buttonProps?: ButtonProps;
}> = ({ buttonProps, bookId }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addCopy] = useAddCopyMutation();

  const required = (value: any, label: string) => {
    let error;
    if (!value) {
      error = `${label} is required!`;
    }
    return error;
  };

  return (
    <>
      <Button onClick={onOpen} {...buttonProps}>
        {buttonProps?.title || "Add Copy"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Copy</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              rackNo: "",
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const [error, result] = await to(
                addCopy({
                  variables: {
                    copyInput: {
                      bookId,
                      status: CopyStatus.AVAILABLE,
                      ...values,
                    },
                  },
                  update(cache) {
                    cache.modify({
                      fields: {
                        books() {},
                      },
                    });
                  },
                })
              );

              const errorMessage =
                result?.data?.addCopy.error ||
                (error ? "An error occurred" : null);

              if (errorMessage) {
                setSubmitting(false);
                toast({
                  title: errorMessage,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }

              resetForm();
              toast({
                title: `Copy added!`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <Field
                    name="rackNo"
                    validate={(value: string) => required(value, "Rack No")}
                  >
                    {({ form, field }: FieldProps) => (
                      <FormControl
                        isInvalid={Boolean(
                          form.errors.rackNo && form.touched.rackNo
                        )}
                      >
                        <FormLabel htmlFor="rackNo">Rack No</FormLabel>
                        <Input
                          {...field}
                          id="rackNo"
                          placeholder="XX-XX-XX"
                          textTransform="uppercase"
                        />
                        <FormErrorMessage>
                          {form.errors.rackNo}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <ButtonGroup spacing={2}>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme="blue"
                    >
                      Add
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

export default AddCopy;
