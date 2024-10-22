const express = require("express");
const ConnectToDB = require("./config/dbConnection");
const authRoutes = require("./routes/auth/auth.route");
const adminProductRoutes = require("./routes/admin/products.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS //
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
// CORS //

// ROUTES MAPPING //
app.use("/api/auth", authRoutes);

app.use("/api/admin/products", adminProductRoutes);
// ROUTES MAPPING //

app.listen(PORT, () => {
  console.log(`Server is running on PORT :- ${PORT}`);
  ConnectToDB();
});
