import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AllProducts from "./pages/dashboard/AllProducts";
import ProductDetails from "./pages/dashboard/ProductDetails";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/overview" element={<DashboardHome />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
