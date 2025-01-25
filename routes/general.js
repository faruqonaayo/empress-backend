// 3rd party module
import express from "express";

// custom modules
import * as generalControllers from "../controllers/general.js";

const router = express.Router();

router.get("/all-products", generalControllers.getAllProducts);

router.get("/all-categories", generalControllers.getAllCategories);

router.get("/all-sales", generalControllers.getAllSales);

export default router;
