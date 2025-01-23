import { validationResult } from "express-validator";

// custom module
import serverResponse from "../utils/serverResponse.js";
import Product from "../models/product.js";

export async function putProduct(req, res, next) {
  try {
    const productNameInput = req.body.productName;
    const priceInput = req.body.price;
    const salesTypeInput = req.body.salesType;
    const stockInput = req.body.stock;
    const visibleInput = req.body.visible;
    const summaryInput = req.body.summary;
    const descriptionInput = req.body.description;
    const productCareInput = req.body.productCare;
    const categoryInput = req.body.category;

    const productExist = await Product.findOne({
      productName: productNameInput,
    });
    const { errors } = validationResult(req);

    // checking for errors in the user input or the product exists
    if (errors.length > 0 || productExist) {
      if (productExist) {
        return serverResponse(res, 422, "Product name exists already");
      }
      return serverResponse(res, 422, errors[0].msg);
    }

    // creating a new product
    const newProduct = new Product({
      productName: productNameInput,
      price: priceInput,
      salesType: salesTypeInput,
      stock: stockInput,
      visible: visibleInput,
      summary: summaryInput,
      description: descriptionInput,
      productCare: productCareInput,
      category: categoryInput,
      images: [],
    });

    await newProduct.save();

    return serverResponse(res, 201, "Product sucessfully added");
  } catch (error) {
    next(error);
  }
}

export async function getAllProducts(req, res, next) {
  try {
    const allProducts = await Product.find({});

    return serverResponse(res, 200, "All product sucessfully fetched", {
      products: allProducts,
    });
  } catch (error) {
    next(error);
  }
}
