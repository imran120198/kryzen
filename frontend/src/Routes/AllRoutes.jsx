import React from "react";
import Product from "../Pages/Product";
import { Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Privateroute from "./PrivateRoute";
import Login from "../Pages/Login";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/:userUID/product-page"
          element={
            <Privateroute>
              <Product />
            </Privateroute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
