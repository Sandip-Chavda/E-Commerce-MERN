import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/auth.layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLayout from "./components/admin/admin.layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProduct from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminFeatures from "./pages/admin/Features";
import ShoppingLayout from "./components/shopping/shopping.layout";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/shopping/Home";
import ProductListing from "./pages/shopping/ProductListing";
import Account from "./pages/shopping/Account";
import CheckOut from "./pages/shopping/CheckOut";
import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/un-auth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./redux/slices/authSlice";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-full h-screen bg-red-200" />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* AUTH ROUTES */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Route>
        {/* AUTH ROUTES */}

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        {/* ADMIN ROUTES */}

        {/* SHOP ROUTES */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<ProductListing />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
        {/* SHOP ROUTES */}

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuth />} />
      </Routes>
    </div>
  );
}

export default App;
