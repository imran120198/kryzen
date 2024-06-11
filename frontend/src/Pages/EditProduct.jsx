import React from "react";
import "./ProductModal.css";
import { Button, Input, Select, useToast } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditProduct = ({ isOpen, onClose, product, onEdit }) => {
  const toast = useToast();

  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    product_type: Yup.string().required("Product type is required"),
  });

  const handleSubmit = (values) => {
    onEdit({ ...product, ...values });
    onClose();
    toast({
      description: "Product updated successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <Formik
          initialValues={{
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            product_type: product.product_type,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field as={Input} type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error" />
              <Field
                as={Input}
                type="text"
                name="description"
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
              <Field
                as={Input}
                type="number"
                name="price"
                placeholder="Price"
              />
              <ErrorMessage name="price" component="div" className="error" />
              <Field
                as={Input}
                type="text"
                name="image"
                placeholder="Image URL"
              />
              <ErrorMessage name="image" component="div" className="error" />
              <Field
                as={Select}
                name="product_type"
                placeholder="Select product type"
              >
                <option value="Electronic">Electronic</option>
                <option value="Shoe">Shoe</option>
                <option value="Clothing">Clothing</option>
              </Field>
              <ErrorMessage
                name="product_type"
                component="div"
                className="error"
              />
              <Button type="submit" marginTop="15px" isLoading={isSubmitting}>
                Save
              </Button>
              <Button marginTop="15px" onClick={onClose}>
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProduct;
