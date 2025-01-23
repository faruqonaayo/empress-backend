// 3rd party module
import express from "express";

// custom modules
import * as adminControllers from "../controllers/admin.js";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/product",
  [
    body("productName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Product name cannot be empty"),
    body("price")
      .trim()
      .custom((value, { req }) => {
        if (value < 1) {
          throw new Error("Price cannot be less than 1");
        }
        return true;
      })
      .withMessage("Price cannot be less than 1"),
    body("stock")
      .trim()
      .custom((value, { req }) => {
        if (value < 0) {
          throw new Error("Stock cannot be less than 0");
        }
        return true;
      })
      .withMessage("Stock cannot be less than 0"),
    body("visible")
      .trim()
      .isBoolean()
      .withMessage("Visiblility can either be true or false"),
    body("summary")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Summary should be a minimum of 10 characters"),
    body("productCare")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Product care should be a minimum of 10 characters"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description should be a minimum of 10 characters"),
    body("category")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Category cannot be empty"),
  ],
  adminControllers.putProduct
);


router.get(
  "/all-products",
  adminControllers.getAllProducts
);

export default router;
