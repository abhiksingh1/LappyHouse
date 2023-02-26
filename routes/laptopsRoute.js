const express = require("express");
const router = express.Router();
const Laptop = require("../models/laptopModel");

router.get("/getalllaptops", async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.send(laptops);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addlaptop", async (req, res) => {
  
  try {
    
    const newlaptop = new Laptop(req.body);
    await newlaptop.save();
    
    res.send("Laptop added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editlaptop", async (req, res) => {
  try {
    const laptop = await Laptop.findOne({ _id: req.body._id });
    laptop.name = req.body.name;
    laptop.image = req.body.image;
    laptop.modelNo = req.body.modelNo;
    laptop.brand = req.body.brand;
    laptop.processor = req.body.processor;
    laptop.ramCapacity = req.body.ramCapacity;
    laptop.romCapacity = req.body.romCapacity;
    laptop.romType = req.body.romType;
    laptop.displaySize = req.body.displaySize;
    laptop.osType = req.body.osType;
    laptop.rentPerHour = req.body.rentPerHour;

    await laptop.save();

    res.send("laptop details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletelaptop", async (req, res) => {
  try {
    await Laptop.findOneAndDelete({ _id: req.body.laptopid });

    res.send("Laptop deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
