// 3rd party module
import express from "express";
import { body } from "express-validator";

// custom modules
import * as authControllers from "../controllers/auth.js";

const router = express.Router();

router.put(
  "/new-customer",
  [
    body("firstName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("First name field cannot be empty"),
    body("lastName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Last name field cannot be empty"),
    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Username field cannot be empty"),
    body("email")
      .trim()
      .toLowerCase()
      .isEmail()
      .withMessage("Enter a valid email address"),
    body("street")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Street field cannot be empty"),
    body("city")
      .trim()
      .isLength({ min: 1 })
      .withMessage("City field cannot be empty"),
    body("province")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Province field cannot be empty"),
    body("postCode")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Post code field cannot be empty"),
    body("phoneNumber")
      .trim()
      .isMobilePhone()
      .withMessage("Phone number must be valid"),
    body("password")
      .trim()
      .isStrongPassword({
        minLength: 7,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1,
        minUppercase: 1,
      })
      .withMessage(
        "Pasword should have a minimum length of 7 with minimum of 1 upper case, 1 lower case, 1 symbol and 1 number"
      ),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password does not match");
        }
        return true;
      })
      .withMessage("Password must match"),
  ],
  authControllers.putNewCustomer
);

export default router;
