// 3rd party module
import { body } from "express-validator";

export function nameField(field, minLength) {
  return body(field)
    .isLength({ min: minLength })
    .withMessage(`${field} should have a minimum of ${minLength} characters`);
}

export function emailField(field) {
  return body(field).isEmail().withMessage(`Email must be a valid email`);
}

export function passwordField(field, minLength) {
  return body(field)
    .isLength({ min: minLength })
    .withMessage(`${field} should have a minimum of ${minLength} characters`);
}

export function confirmPasswordField(field, passwordField) {
  return body(field).custom((value, {req}) => {
    if (value !== req.body[`${passwordField}`]) {
      throw new Error("Passwords must match");
    }
    return true;
  });
}
