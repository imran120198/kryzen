import { Button, Flex, Select } from "@chakra-ui/react";
import React, { useState } from "react";

const ProductList = ({
  products,
  onEdit,
  onDelete,
  onFilter,
  onSortByTime,
}) => {
  const [filterType, setFilterType] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  const handleFilterTypeChange = (event) => {
    const selectedType = event.target.value;
    setFilterType(selectedType);
    onFilter({ type: selectedType });
  };

  const handlePriceOrderChange = (event) => {
    const selectedOrder = event.target.value;
    setPriceOrder(selectedOrder);
    onFilter({ priceOrder: selectedOrder });
  };

  return (
    <div>
      <Flex justifyContent="space-evenly">
        <Button onClick={onSortByTime}>Sort by Creation Time</Button>
        <Select
          placeholder="Filter by Product Type"
          onChange={handleFilterTypeChange}
          width="200px"
        >
          <option value="Electronic">Electronic</option>
          <option value="Shoe">Shoe</option>
          <option value="Clothing">Clothing</option>
        </Select>
        <Select
          placeholder="Sort by Price"
          onChange={handlePriceOrderChange}
          width="200px"
        >
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </Select>
      </Flex>
      <table width={"90%"} m={"auto"}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Product Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={
                    product.image
                      ? product.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrA7AnzVfkvExs3rWGo4jL69PZTPbDsSnKLg&s"
                  }
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.product_type}</td>
              <td>
                <Button colorScheme="green" onClick={() => onEdit(product)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button colorScheme="red" onClick={() => onDelete(product.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
