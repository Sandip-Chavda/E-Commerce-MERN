const express = require("express");
const { upload } = require("../../config/cloudinary");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProduct,
} = require("../../controllers/admin/products.controller");
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProduct);

module.exports = router;
