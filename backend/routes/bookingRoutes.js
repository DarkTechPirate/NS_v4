const express = require("express");
const { createBooking, getMyBookings, getProviderBookings, updateBookingStatus } = require("../controllers/bookingControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .post(protect(), createBooking); // Any logged in user can book

router.route("/my-bookings")
    .get(protect(), getMyBookings);

router.route("/provider/:providerId")
    .get(protect({ vendor: true }), getProviderBookings);

router.route("/:id/status")
    .put(protect({ vendor: true }), updateBookingStatus);

module.exports = router;
