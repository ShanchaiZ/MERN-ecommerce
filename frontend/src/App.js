import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";

// Protected User Pages:
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";

// Protected Admin Pages:
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes: */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* All other routes! */}
        <Route path="*" element="Page not found: error 404" />
        {/* User Protected Routes: */}
        <Route element={<ProtectedRoutesComponent />}>
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/my-orders" element={<UserOrdersPage />} />
          <Route path="/user/cart-details" element={<UserCartDetailsPage />} />
          <Route path="/user/order-details" element={<UserOrderDetailsPage />} />
        </Route>
        {/* Admin Protected Routes: */}
        <Route element={<ProtectedRoutesComponent />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-users" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/create-new-product" element={<AdminCreateProductPage />} />
          <Route path="/admin/edit-product" element={<AdminEditProductPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/order-details" element={<AdminOrderDetailsPage />} />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
