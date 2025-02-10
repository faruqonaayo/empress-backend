// custom modules
import Category from "../models/category.js";
import Product from "../models/product.js";
import Promotion from "../models/promotion.js";

export async function getAllProducts(req, res, next) {
  try {
    const allProducts = await Product.find({});

    return res.status(200).json({
      message: "All product sucessfully fetched",
      statusCode: 200,
      products: allProducts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req, res, next) {
  try {
    const allCategories = await Category.find({});

    return res.status(200).json({
      message: "All categories sucessfully fetched",
      statusCode: 200,
      categories: allCategories,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllPromotions(req, res, next) {
  try {
    const allPromotions = await Promotion.find({});

    return res.status(200).json({
      message: "All promotions sucessfully fetched",
      statusCode: 200,
      promotions: allPromotions,
    });
  } catch (error) {
    next(error);
  }
}
