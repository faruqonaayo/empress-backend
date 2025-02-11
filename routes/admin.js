// importing 3rd party modules
import express from "express";
import { body } from "express-validator";
import multer from "multer";

// importing custom controllers
import * as adminControllers from "../controllers/admin.js";

// express router app
const router = express.Router();

//
// filtering the type of file to accept
function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
// filtering the type of file to accept
function productFileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/octet-stream"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// customizing the storage location for categories
const categoriesStorage = multer.diskStorage({
  destination: "public/uploads/categories",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// category image upload middleware
const categoriesUploads = multer({
  storage: categoriesStorage,
  fileFilter: fileFilter,
});

// customizing the storage location for promotions
const promotionsStorage = multer.diskStorage({
  destination: "public/uploads/promotions",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// promotion image upload middleware
const promotionsUploads = multer({
  storage: promotionsStorage,
  fileFilter: fileFilter,
});

// customizing the storage location for products
const productsStorage = multer.diskStorage({
  destination: "public/uploads/products",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// product image upload middleware
const productsUploads = multer({
  storage: productsStorage,
  fileFilter: productFileFilter,
});

// routes
// route to add new category
router.put(
  "/new-category",
  categoriesUploads.single("categoryImage"),
  [
    body("categoryName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Category name cannot be empty"),
  ],
  adminControllers.addNewCategory
);

// route to get all categories
router.get("/all-categories", adminControllers.getAllCategories);

// route to update a category
router.patch(
  "/category/update",
  categoriesUploads.single("categoryImage"),
  [
    body("categoryName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Category name cannot be empty"),
  ],
  adminControllers.updateCategory
);

// route to delete a category
router.delete("/category/delete", adminControllers.deleteCategory);

// route to add new promotion
router.put(
  "/new-promotion",
  promotionsUploads.single("promotionImage"),
  [
    body("promotionName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Category name cannot be empty"),
    body("discount")
      .trim()
      .custom((value, { req }) => {
        if (value <= 0) {
          throw new Error("Invalid discount");
        }
        return true;
      })
      .withMessage("Discount must be greater than 0%"),
    body("expiry").trim().isDate().withMessage("Enter a valid expiry date"),
  ],
  adminControllers.addNewPromotion
);

// route to get all promotions
router.get("/all-promotions", adminControllers.getAllPromotions);

// route to update a promotion
router.patch(
  "/promotion/update",
  promotionsUploads.single("promotionImage"),
  [
    body("promotionName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Category name cannot be empty"),
    body("discount")
      .trim()
      .custom((value, { req }) => {
        if (value <= 0) {
          throw new Error("Invalid discount");
        }
        return true;
      })
      .withMessage("Discount must be greater than 0%"),
    body("expiry").trim().isDate().withMessage("Enter a valid expiry date"),
  ],
  adminControllers.updatePromotion
);

// route to delete a promotion
router.delete("/promotion/delete", adminControllers.deletePromotion);

// route to add new product
router.put(
  "/new-product",
  productsUploads.fields([{ name: "productImages" }, { name: "product3D" }]),
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
    body("promotion").trim(),
  ],
  adminControllers.putNewProduct
);

// route to update a product
router.patch(
  "/product/update",
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
    body("promotion").trim(),
  ],
  adminControllers.updateProduct
);

// route to get all products
router.get("/all-products", adminControllers.getAllProducts);

router.delete("/product/delete", adminControllers.deleteProduct);

export default router;
