const express = require("express");
const router = express.Router();
const bookingInfo = require("../model/database");
const nodemailer = require("nodemailer");

router.get("/room", (req, res) => {
  res.render("assets/room");
});
router.get("/booking", (req, res) => {
  res.render("assets/booking");
});
router.get("/about", (req, res) => {
  res.render("assets/about");
});
router.get("/mail", (req, res) => {
  res.render("assets/mail");
});
router.get("/hotelreservation", (req, res) => {
  res.render("assets/hotelreservation");
});

router.get("/:id", (req, res) => {
  res.render("assets/message");
});

router.post("/", async (req, res) => {
  let booking = new bookingInfo({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    phoneNumber: req.body.phonenumber,
    email: req.body.email,
    arrivalDate: req.body.arrivaldate,
    departureDate: req.body.depaturedate,
    numberOfAdults: req.body.numberofadults,
    numberOfChildren: req.body.numberofchildren,
    comments: req.body.messages,
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "brucewynentreprices@gmail.com",
      pass: "bklfqowqaqieqzfg",
    },
  });

  var mailOptions = {
    from: "brucewynentreprices@gmail.com",
    to: "officialkhaoya@gmail.com",
    subject: "NEW BOOKING ALERT",
    html: `<h1 style="text-align:center;">A NEW ORDER WAS MADE</h1>
    <div style="text-align: center; color:royal-blue;">Details of the Order</div>
    <ul style="list-style-type:none;">
    <li>Name: ${req.body.firstname}, ${req.body.lastname}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone Number: ${req.body.phonenumber}</li>
    <li>Sign in Date: ${req.body.arrivaldate}</li>
    <li>Number of Adults: ${req.body.numberofadults}</li>
    <li>Number of Children: ${req.body.numberofchildren}</li>
    </ul>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "brucewynentreprices@gmail.com",
      pass: "bklfqowqaqieqzfg",
    },
  });

  var mailOptions = {
    from: "brucewynentreprices@gmail.com",
    to: `${req.body.email}`,
    subject: `YOUR BOOKING HAS BEEN RECEIVED`,
    html: `
    <ul style="list-style-type:none;">
    <li>Name: ${req.body.firstname}, ${req.body.lastname}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone Number: ${req.body.phonenumber}</li>
    <li>Sign in Date: ${req.body.arrivaldate}</li>
    <p style="margin:5px 0; font-weight:bold;">In Attendance</p>
    <li>Adults: ${req.body.numberofadults}</li>
    <li>Children: ${req.body.numberofchildren}</li>
    <ul>
    
    <div style="text-align:center; padding:10px; margin-top:20px; background:royalblue; color:white; border-radius:5px;">THANK YOU!!!</div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });

  try {
    booking = await booking.save();
    res.redirect(`/assets/${booking.id}`);
  } catch (e) {
    console.log(e);
    res.render("assets/home");
  }
});

module.exports = router;
