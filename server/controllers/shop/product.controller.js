const Product = require("../../models/Product.model");

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      data: products,
      message: "All Product Fetched Successfully.",
    });
  } catch (error) {
    console.log("Error while get filterProducts", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try refresh",
    });
  }
};

module.exports = { getFilteredProducts };
