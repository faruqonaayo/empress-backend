// 3rd party modules
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// custom modules
import Customer from "../models/customer.js";
import serverResponse from "../utils/serverResponse.js";

export async function putNewCustomer(req, res, next) {
  try {
    const firstNameInput = req.body.firstName;
    const lastNameInput = req.body.lastName;
    const emailInput = req.body.email;
    const usernameInput = req.body.username;
    const streetInput = req.body.street;
    const cityInput = req.body.city;
    const provinceInput = req.body.province;
    const postCodeInput = req.body.postCode;
    const phoneNumberInput = req.body.phoneNumber;
    const passwordInput = req.body.password;

    // checking if email or username exists
    const usernameExist = await Customer.findOne({ username: usernameInput });
    const emailExist = await Customer.findOne({ email: emailInput });

    if (usernameExist) {
      return serverResponse(res, 422, "Username is not available");
    }

    if (emailExist) {
      return serverResponse(res, 422, "Email is not available");
    }

    // checking for errors in the user input
    const { errors } = validationResult(req);

    if (errors.length > 0) {
      return serverResponse(res, 422, errors[0].msg);
    }

    //  hashing password for security
    const hashedPassword = await bcrypt.hash(passwordInput, 12);

    const newCustomer = new Customer({
      firstName: firstNameInput,
      lastName: lastNameInput,
      username: usernameInput,
      email: emailInput,
      street: streetInput,
      city: cityInput,
      province: provinceInput,
      postCode: postCodeInput,
      phoneNumber: phoneNumberInput,
      password: hashedPassword,
    });

    await newCustomer.save();

    return serverResponse(res, 201, "Customer account sucessfullly created");
  } catch (error) {
    next(error);
  }
}
