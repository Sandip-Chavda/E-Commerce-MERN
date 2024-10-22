const { imageUploadUtil } = require("../../config/cloudinary");
const Product = require("../../models/Product.model");

// PRODUCT IMAGE UPLOAD //

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Error while uploading image to cloudinary", error);
    res.json({
      success: false,
      message: "Error while image upload, try again",
    });
  }
};

// PRODUCT IMAGE UPLOAD //

// ADD NEW PRODUCTS //
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();

    res.status(200).json({
      success: true,
      message: "New Product Added Successfully",
    });
  } catch (error) {
    console.log("Error while add new Product...", error);
    res.status(500).json({
      success: true,
      message: "Product not added, try again!!",
    });
  }
};
// ADD NEW PRODUCTS //

// FETCH ALL PRODUCTS //
const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    res.status(200).json({
      success: true,
      data: listOfProducts,
      message: "All Fetched Successfully",
    });
  } catch (error) {
    console.log("Error while fetch all Products.", error);
    res.status(500).json({
      success: true,
      message: "Couldn't fetch all product, try again or refresh.",
    });
  }
};
// FETCH ALL PRODUCTS //

// EDIT PRODUCT //
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "This product is deleted or not exist.",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct,
      message: "Product Updated Successfully.",
    });
  } catch (error) {
    console.log("Error while edit Product.", error);
    res.status(500).json({
      success: true,
      message: "Product not updated, please try again!",
    });
  }
};
// EDIT PRODUCT //

// DELETE PRODUCT //
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not exist or already deleted.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deelted Successfully.",
    });
  } catch (error) {
    console.log("Error while delete Product.", error);
    res.status(500).json({
      success: true,
      message: "Product not deleted, please try again!",
    });
  }
};
// DELETE PRODUCT //

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
};
