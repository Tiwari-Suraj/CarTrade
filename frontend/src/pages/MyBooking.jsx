import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Title from "../components/Title";
import { motion } from "framer-motion";
import axiosInstance from "../util/axiosInstance";

const MyBookings = () => {
  const user = useSelector((state) => state.app.user);
  const rupees = import.meta.env.VITE_RUPEES;

  const [bookings, setBookings] = useState([]);
  const [deletingBooking, setDeletingBooking] = useState(null);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axiosInstance.get("/api/booking/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleContactOwner = (booking) => {
    // You can implement different contact methods here

    // Option 1: Show a modal with contact information
    const contactInfo = `
Car: ${booking.car.brand} ${booking.car.model}
Booking ID: ${booking._id}
Location: ${booking.car.location}
Rental Period: ${booking.bookDate.split("T")[0]} to ${
      booking.purchaseDate.split("T")[0]
    }

Contact the owner for any questions about your booking.
    `;

    alert(contactInfo);

    // Option 2: You could open a chat/messaging system
    // openChatWith(booking.car.ownerId);

    // Option 3: You could navigate to a contact page
    // navigate(`/contact-owner/${booking.car.ownerId}`);

    // Option 4: You could open email client
    // window.location.href = `mailto:owner@example.com?subject=Booking Inquiry - ${booking.car.brand} ${booking.car.model}`;
  };

  const handleDeleteBooking = async (bookingId) => {
    // Debug: Check if bookingId is valid
    console.log("Attempting to delete booking with ID:", bookingId);

    if (!bookingId) {
      toast.error("Invalid booking ID");
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeletingBooking(bookingId);

      // Debug: Log the full URL being called
      console.log("DELETE URL:", `/api/booking/${bookingId}`);

      const { data } = await axios.delete(`/api/booking/${bookingId}`);

      if (data.success) {
        // Remove the booking from state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        toast.success("Booking cancelled successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete booking error:", error);

      // More specific error handling
      if (error.response?.status === 404) {
        toast.error("Booking not found or delete endpoint not configured");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this booking");
      } else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to cancel booking"
        );
      }
    } finally {
      setDeletingBooking(null);
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
    >
      <Title
        title="My Bookings"
        subTitle="View and manage your all car bookings"
        align="left"
      />

      <div>
        {bookings.map((booking, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
          >
            {/* Car Image + Info */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt=""
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-2">
                {booking.car.brand} {booking.car.model}
              </p>

              <p className="text-gray-500">
                {booking.car.year} • {booking.car.category} •{" "}
                {booking.car.location}
              </p>
            </div>

            {/* Booking Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-light rounded">
                  Booking #{index + 1}
                </p>
                <p
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-400/15 text-green-600"
                      : "bg-red-400/15 text-red-600"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.calendar_icon_colored}
                  alt=""
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-gray-500">Rental Period</p>
                  <p>
                    {booking.bookDate.split("T")[0]} To{" "}
                    {booking.purchaseDate.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets.location_icon_colored}
                  alt=""
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-gray-500">Pick-up Location</p>
                  <p>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="md:col-span-1 flex flex-col justify-between gap-6">
              <div className="text-sm text-gray-500 text-right">
                <p>Total Price</p>
                <h1 className="text-2xl font-semibold text-primary">
                  {rupees}
                  {booking.price}
                </h1>
                <p>Booked on {booking.createdAt.split("T")[0]}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {/* Contact Owner Button */}
                <button
                  onClick={() => handleContactOwner(booking)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Contact Owner
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  disabled={deletingBooking === booking._id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    deletingBooking === booking._id
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {deletingBooking === booking._id
                    ? "Cancelling..."
                    : "Cancel Booking"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bookings found</p>
          <p className="text-gray-400 mt-2">
            Your car bookings will appear here once you make a reservation.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MyBookings;
