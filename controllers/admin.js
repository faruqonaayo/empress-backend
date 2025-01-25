import { validationResult } from "express-validator";

// custom module
import serverResponse from "../utils/serverResponse.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Sales from "../models/sales.js";

export async function putNewProduct(req, res, next) {
  try {
    const productNameInput = req.body.productName;
    const priceInput = req.body.price;
    const salesInput = req.body.sales;
    const stockInput = req.body.stock;
    const visibleInput = req.body.visible;
    const summaryInput = req.body.summary;
    const descriptionInput = req.body.description;
    const productCareInput = req.body.productCare;
    const categoryInput = req.body.category;

    const productExist = await Product.findOne({
      productName: productNameInput,
    });

    // checking if the category
    let salesExist;
    let categoryExist;

    if (salesInput !== "" || categoryInput !== "") {
      salesExist = await Sales.findOne({ sales: salesInput });
      categoryExist = await Category.findOne({
        categoryName: categoryInput,
      });

      if (!salesExist) {
        return serverResponse(res, 422, "Sales does not exists");
      }

      if (!categoryExist) {
        return serverResponse(res, 422, "Category does not exists");
      }
    }

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
      sales: salesExist._id,
      stock: stockInput,
      visible: visibleInput,
      summary: summaryInput,
      description: descriptionInput,
      productCare: productCareInput,
      category: categoryExist._id,
      images: [],
    });

    await newProduct.save();

    return serverResponse(res, 201, "Product sucessfully added");
  } catch (error) {
    next(error);
  }
}

export async function putNewCategory(req, res, next) {
  try {
    const categoryNameInput = req.body.categoryName;

    const { errors } = validationResult(req);

    const categoryExist = await Category.findOne({
      categoryName: categoryNameInput,
    });

    // checking if there are errrors in the user input or if the category name exists in the DB

    if (errors.length > 0 || categoryExist) {
      if (categoryExist) {
        return serverResponse(res, 422, "Category name exists already");
      }
      return serverResponse(res, 422, errors[0].msg);
    }

    const newCategory = new Category({
      categoryName: categoryNameInput,
    });

    await newCategory.save();

    return serverResponse(res, 201, "Category sucessfully added");
  } catch (error) {
    next(error);
  }
}

export async function putNewSales(req, res, next) {
  try {
    const salesInput = req.body.sales;
    const discountInput = req.body.discount;

    const { errors } = validationResult(req);

    const salesExist = await Sales.findOne({
      sales: salesInput,
    });

    // checking if there are errrors in the user input or if the category name exists in the DB

    if (errors.length > 0 || salesExist) {
      if (salesExist) {
        return serverResponse(res, 422, "Sales with the name exists already");
      }
      return serverResponse(res, 422, errors[0].msg);
    }

    const newSales = new Sales({
      sales: salesInput,
      discount: discountInput,
    });

    await newSales.save();

    return serverResponse(res, 201, "Sales sucessfully added");
  } catch (error) {
    next(error);
  }
}
