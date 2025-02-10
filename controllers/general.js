// custom modules
import Category from "../models/category.js";
import Product from "../models/product.js";
import Sales from "../models/sales.js";
import Messages from "../models/messages.js";
import serverResponse from "../utils/serverResponse.js";

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

export async function getAllCategories(req, res, next) {
  try {
    const allCategories = await Category.find({});

    return serverResponse(res, 200, "All categories sucessfully fetched", {
      categories: allCategories,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllSales(req, res, next) {
  try {
    const allSales = await Sales.find({});

    return serverResponse(res, 200, "All sales sucessfully fetched", {
      sales: allSales,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllMessages(req, res, next) {
  try {
    const allMessages = await Messages.find({});

    return serverResponse(res, 200, "All messages sucessfully fetched", {
      messages: allMessages,
    });
  } catch (error) {
    next(error);
  }
}
