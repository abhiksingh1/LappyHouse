const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    laptop: { type: mongoose.Schema.Types.ObjectID, ref: "laptops" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    chargerRequired: { type: Boolean },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
