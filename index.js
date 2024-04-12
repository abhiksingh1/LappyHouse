const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;


//middleware
app.use(express.json());
app.use(cors());


//routes
app.use("/api/laptops/", require("./routes/laptopsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));

mongoose.connect(
  "mongodb+srv://abhi:abhi@cluster0.mihbi.mongodb.net/lappyHouse",
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(() => {
  console.log("Connected to database!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(() => {
  console.log("Connection failed!");
});

app.get("/", (req, res) => res.send("Welcome to LappyHouse Backend!"));



