import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBooking";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBooking from "./pages/owner/ManageBooking";
import Dashboard from "./pages/owner/Dashboard";
import Login from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { setToken, fetchCars, fetchUser } from "./redux/slices/appSlice";
import axiosInstance from "./util/axiosInstance";
import { Toaster } from "react-hot-toast";

const App = () => {
  const showLogin = useSelector((state) => state.app.showLogin);
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");
  const dispatch = useDispatch();

  // useEffect to fetch user data when token is available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
      axiosInstance.defaults.headers.common["Authorization"] = `${token}`;
      dispatch(setToken(token));
      dispatch(fetchUser());
    }
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      {showLogin && <Login />}

      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBooking />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
