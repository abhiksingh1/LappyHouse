const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Laptop = require("../models/laptopModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51LDvD6SCKJVpRfCsukxQrF7yLpBqA94B0ec1wWzlalX7WN36XwQkQ9ohRUlymqLQVshM16EoImeuW3b21e1GkYk600ieL2ub1r"
);

router.post("/booklaptop", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: req.body.totalAmount * 100,
    //     currency: "inr",
    //     customer: customer.id,
    //     receipt_email: token.email,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // );

    if (customer) {
      //req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const laptop = await Laptop.findOne({ _id: req.body.laptop });
      console.log(req.body.laptop);
      laptop.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await laptop.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("laptop");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
