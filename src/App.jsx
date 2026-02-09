import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import TrackOrderPage from './pages/TrackOrderPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminCategories from './pages/admin/AdminCategories';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminLogin from './pages/admin/AdminLogin';

// Context
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';

// Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedCheckoutRoute from './components/ProtectedCheckoutRoute';
import LoginPage from './pages/LoginPage';

// Register standard plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Check if current path is admin to conditionally render Navbar/Footer
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div ref={mainRef} className="app-container">
      <AdminProvider>
        <CartProvider>
          {!isAdmin && <Navbar />}

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Checkout */}
            <Route element={<ProtectedCheckoutRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

            {/* Admin Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/add" element={<AdminAddProduct />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="logic" element={<Navigate to="/admin" replace />} />
              </Route>
            </Route>
          </Routes>

          {!isAdmin && <Footer />}
        </CartProvider>
      </AdminProvider>
    </div>
  );
}

export default App;
