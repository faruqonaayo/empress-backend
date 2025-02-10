// importing 3rd party modules
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import appRootPath from "app-root-path";

// importing custom models
import Category from "../models/category.js";
import deleteFile from "../utils/deleteFile.js";
import Promotion from "../models/promotion.js";
import Product from "../models/product.js";

export async function addNewCategory(req, res, next) {
  try {
    const categoryNameInput = req.body.categoryName;
    const categoryImageInput = req.file;

    // checking if a image file was uploaded
    if (!categoryImageInput) {
      return res
        .status(422)
        .json({ message: "No image uploaded", statusCode: 422 });
    }

    const { errors } = validationResult(req);

    //   checking for errors in the user input
    if (errors.length > 0) {
      // deleting uploaded file before error response
      if (categoryImageInput) {
        deleteFile(`${appRootPath.path}/${categoryImageInput.path}`);
      }
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    const categoryExist = await Category.findOne({
      categoryName: categoryNameInput,
    });

    //   checking if the category name exists in the database
    if (categoryExist) {
      // deleting uploaded file before error response
      if (categoryImageInput) {
        deleteFile(`${appRootPath.path}/${categoryImageInput.path}`);
      }

      return res
        .status(422)
        .json({ message: "Category exist in the database", statusCode: 422 });
    }

    //   creating a new category
    const newCategory = new Category({
      categoryName: categoryNameInput,
      categoryImage: categoryImageInput.path.split("public\\")[1],
    });

    //   saving new strategy
    await newCategory.save();

    return res.status(201).json({
      message: `Category '${categoryNameInput}' created successfully`,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req, res, next) {
  try {
    //   fetching all categories from the database
    const allCategories = await Category.find();

    return res.status(200).json({
      message: "All categories fetched sucessfully",
      data: allCategories,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.query;
    const categoryNameInput = req.body.categoryName;
    const categoryImageInput = req.file;

    //   checking if id is a valid ObjectID
    if (!mongoose.isValidObjectId(id) || !id) {
      return res.status(422).json({
        message: "Invalid category ID",
        statusCode: 422,
      });
    }

    const { errors } = validationResult(req);

    //   checking for errors in the user input
    if (errors.length > 0) {
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    const categoryExist = await Category.findOne({
      _id: id,
    });

    const oldName = categoryExist.categoryName;

    //   checking if category exists
    if (!categoryExist) {
      return res
        .status(422)
        .json({ message: "Category does not exist", statusCode: 422 });
    }

    // checking if an image was uploaded
    let newImagePath;
    if (categoryImageInput) {
      // new image path
      newImagePath = categoryImageInput.path.split("public\\")[1];

      // deleting the previous image
      deleteFile(`${appRootPath.path}/public/${categoryExist.categoryImage}`);
    }

    categoryExist.categoryName = categoryNameInput;

    // checking if there is a new image path
    if (newImagePath) {
      categoryExist.categoryImage = newImagePath;
    }

    await categoryExist.save();

    return res.status(200).json({
      message: `Category '${oldName}' updated to '${categoryExist.categoryName}'`,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.query;

    //   checking if id is a valid ObjectID
    if (!mongoose.isValidObjectId(id) || !id) {
      return res.status(422).json({
        message: "Invalid category ID",
        statusCode: 422,
      });
    }

    const categoryExist = await Category.findById(id);

    //   checking if category exists
    if (!categoryExist) {
      return res
        .status(422)
        .json({ message: "Category does not exist", statusCode: 422 });
    }

    // deleting the image of the category
    deleteFile("public\\" + categoryExist.categoryImage);

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Category '${categoryExist.categoryName}' deleted`,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function addNewPromotion(req, res, next) {
  try {
    const promotionNameInput = req.body.promotionName;
    const discountInput = req.body.discount;
    const expiryInput = req.body.expiry;
    const promotionImageInput = req.file;

    // checking if a image file was uploaded
    if (!promotionImageInput) {
      return res
        .status(422)
        .json({ message: "No image uploaded", statusCode: 422 });
    }

    const { errors } = validationResult(req);

    //   checking for errors in the user input
    if (errors.length > 0) {
      // deleting uploaded file before error response
      if (promotionImageInput) {
        deleteFile(`${appRootPath.path}/${promotionImageInput.path}`);
      }
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    const promotionExist = await Promotion.findOne({
      promotionName: promotionNameInput,
    });

    //   checking if the category name exists in the database
    if (promotionExist) {
      // deleting uploaded file before error response
      if (promotionImageInput) {
        deleteFile(`${appRootPath.path}/${promotionImageInput.path}`);
      }

      return res
        .status(422)
        .json({ message: "Promotion exist in the database", statusCode: 422 });
    }

    //   creating a new category
    const newPromotion = new Promotion({
      promotionName: promotionNameInput,
      discount: discountInput,
      expiry: expiryInput,
      promotionImage: promotionImageInput.path.split("public\\")[1],
    });

    //   saving new strategy
    await newPromotion.save();

    return res.status(201).json({
      message: `Promotion '${promotionNameInput}' created successfully`,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllPromotions(req, res, next) {
  try {
    //   fetching all promotions from the database
    const allPromotions = await Promotion.find();

    return res.status(200).json({
      message: "All promotions fetched sucessfully",
      data: allPromotions,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePromotion(req, res, next) {
  try {
    const { id } = req.query;
    const promotionNameInput = req.body.promotionName;
    const discountInput = req.body.discount;
    const expiryInput = req.body.expiry;
    const promotionImageInput = req.file;

    //   checking if id is a valid ObjectID
    if (!mongoose.isValidObjectId(id) || !id) {
      return res.status(422).json({
        message: "Invalid promotion ID",
        statusCode: 422,
      });
    }

    const { errors } = validationResult(req);

    //   checking for errors in the user input
    if (errors.length > 0) {
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    const promotionExist = await Promotion.findOne({
      _id: id,
    });

    const oldName = promotionExist.promotionName;

    //   checking if promotion exists
    if (!promotionExist) {
      return res
        .status(422)
        .json({ message: "Promotion does not exist", statusCode: 422 });
    }

    // checking if an image was uploaded
    let newImagePath;
    if (promotionImageInput) {
      // new image path
      newImagePath = promotionImageInput.path.split("public\\")[1];

      // deleting the previous image
      deleteFile(`${appRootPath.path}/public/${promotionExist.promotionImage}`);
    }

    promotionExist.promotionName = promotionNameInput;
    promotionExist.discount = discountInput;
    promotionExist.expiry = expiryInput;

    // checking if there is a new image path
    if (newImagePath) {
      promotionExist.promotionImage = newImagePath;
    }

    await promotionExist.save();

    return res.status(200).json({
      message: `Promotion '${oldName}' updated to '${promotionExist.promotionName}'`,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function deletePromotion(req, res, next) {
  try {
    const { id } = req.query;

    //   checking if id is a valid ObjectID
    if (!mongoose.isValidObjectId(id) || !id) {
      return res.status(422).json({
        message: "Invalid category ID",
        statusCode: 422,
      });
    }

    const promotionExist = await Promotion.findById(id);

    //   checking if promotion exists
    if (!promotionExist) {
      return res
        .status(422)
        .json({ message: "Promotion does not exist", statusCode: 422 });
    }

    // deleting the image of the promotion
    deleteFile("public\\" + promotionExist.promotionImage);

    await Promotion.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Promotion '${promotionExist.promotionName}' deleted`,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function putNewProduct(req, res, next) {
  try {
    const productNameInput = req.body.productName;
    const priceInput = req.body.price;
    const promotionInput = req.body.promotion;
    const stockInput = req.body.stock;
    const visibleInput = req.body.visible;
    const summaryInput = req.body.summary;
    const descriptionInput = req.body.description;
    const productCareInput = req.body.productCare;
    const categoryInput = req.body.category;
    let productImagesInput = req.files.productImages;
    let product3DInput = req.files.product3D;

    const productExist = await Product.findOne({
      productName: productNameInput,
    });

    // checking if images were uploaded
    if (!productImagesInput || productImagesInput.length === 0) {
      // deleting uploaded file before error response
      if (product3DInput && product3DInput.length > 0) {
        deleteFile(`${appRootPath.path}/${product3DInput[0].path}`);
      }

      return res
        .status(422)
        .json({ message: "No image uploaded", statusCode: 422 });
    }

    // checking if the category and promotion exist
    let promotionExist;
    let categoryExist;

    if (promotionInput !== "") {
      promotionExist = await Promotion.findOne({
        promotionName: promotionInput,
      });

      if (!promotionExist) {
        // deleting uploaded file before error response
        if (productImagesInput && productImagesInput.length > 0) {
          productImagesInput.forEach((image) => {
            deleteFile(`${appRootPath.path}/${image.path}`);
          });
        }

        if (product3DInput && product3DInput.length > 0) {
          deleteFile(`${appRootPath.path}/${product3DInput[0].path}`);
        }

        return res
          .status(422)
          .json({ message: "Promotion does not exist", statusCode: 422 });
      }
    }

    // checking if the category exist
    categoryExist = await Category.findOne({ categoryName: categoryInput });

    if (!categoryExist) {
      // deleting uploaded file before error response
      if (productImagesInput && productImagesInput.length > 0) {
        productImagesInput.forEach((image) => {
          deleteFile(`${appRootPath.path}/${image.path}`);
        });
      }

      if (product3DInput && product3DInput.length > 0) {
        deleteFile(`${appRootPath.path}/${product3DInput[0].path}`);
      }

      return res
        .status(422)
        .json({ message: "Category does not exist", statusCode: 422 });
    }

    const { errors } = validationResult(req);

    // checking for errors in the user input or the product exists
    if (errors.length > 0 || productExist) {
      // deleting uploaded file before error response
      if (productImagesInput && productImagesInput.length > 0) {
        productImagesInput.forEach((image) => {
          deleteFile(`${appRootPath.path}/${image.path}`);
        });
      }

      if (product3DInput && product3DInput.length > 0) {
        deleteFile(`${appRootPath.path}/${product3DInput[0].path}`);
      }

      if (productExist) {
        return res
          .status(422)
          .json({ message: "Product exist in the database", statusCode: 422 });
      }
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    // getting the path of the images
    const productImages = productImagesInput.map((image) => {
      return image.path.split("public\\")[1];
    });

    // getting the path of the 3D image
    let product3D;
    if (product3DInput && product3DInput.length > 0) {
      product3D = product3DInput[0].path.split("public\\")[1];
    }

    // creating a new product
    const newProduct = new Product({
      productName: productNameInput,
      price: priceInput,
      promotion: promotionExist ? promotionExist._id : null,
      stock: stockInput,
      visible: visibleInput,
      summary: summaryInput,
      description: descriptionInput,
      productCare: productCareInput,
      category: categoryExist._id,
      productImages: productImages,
      product3D: product3D,
    });

    await newProduct.save();

    return res.status(201).json({
      message: `Product '${newProduct.productName}' added successfully`,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProducts(req, res, next) {
  try {
    // fetching all products from the database
    const allProducts = await Product.find();

    return res.status(200).json({
      message: "All products fetched sucessfully",
      data: allProducts,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const productId = req.query.id;
    const productNameInput = req.body.productName;
    const priceInput = req.body.price;
    const promotionInput = req.body.promotion;
    const stockInput = req.body.stock;
    const visibleInput = req.body.visible;
    const summaryInput = req.body.summary;
    const descriptionInput = req.body.description;
    const productCareInput = req.body.productCare;
    const categoryInput = req.body.category;

    // checking if productId is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(422).json({
        message: "Product ID is not valid",
        statusCode: 422,
      });
    }

    // checking if product exist in the database
    const productExist = await Product.findOne({ _id: productId });
    if (!productExist) {
      return res
        .status(422)
        .json({ message: "Product does not exist", statusCode: 422 });
    }

    // checking if the category and promotion exist
    let promotionExist;
    let categoryExist;

    if (promotionInput !== "") {
      promotionExist = await Promotion.findOne({
        promotionName: promotionInput,
      });

      if (!promotionExist) {
        return res
          .status(422)
          .json({ message: "Promotion does not exist", statusCode: 422 });
      }
    }

    // checking if the category exist
    categoryExist = await Category.findOne({ categoryName: categoryInput });

    if (!categoryExist) {
      return res
        .status(422)
        .json({ message: "Category does not exist", statusCode: 422 });
    }

    const { errors } = validationResult(req);

    // checking for errors in the user input
    if (errors.length > 0) {
      return res.status(422).json({ message: errors[0].msg, statusCode: 422 });
    }

    // updating the product
    productExist.productName = productNameInput;
    productExist.price = priceInput;
    productExist.promotion = promotionExist ? promotionExist._id : null;
    productExist.stock = stockInput;
    productExist.visible = visibleInput;
    productExist.summary = summaryInput;
    productExist.description = descriptionInput;
    productExist.productCare = productCareInput;
    productExist.category = categoryExist._id;

    //  saving the updated product
    await productExist.save();

    return res
      .status(200)
      .json({ message: "Product updated", statusCode: 200 });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const productId = req.query.id;
    const idIsValid = mongoose.Types.ObjectId.isValid(productId);

    // checking if productId is valid
    if (!idIsValid) {
      return serverResponse(res, 422, "Product ID is not valid");
    }

    const productExist = await Product.findOne({ _id: productId });

    // checking if product exist in the database
    if (!productExist) {
      return res
        .status(422)
        .json({ message: "Product does not exist", statusCode: 422 });
    }

    // deleting the images of the product
    productExist.productImages.forEach((image) => {
      deleteFile("public\\" + image);
    });

    // deleting the 3D image of the product
    if (productExist.product3D) {
      deleteFile("public\\" + productExist.product3D);
    }

    // if it is available the product gets deleted
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      message: `Product '${productExist.productName}' deleted successfully`,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
