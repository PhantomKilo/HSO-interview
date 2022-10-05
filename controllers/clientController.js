const express = require("express");
const router = express.Router();
const client = require("../models/clients");

// Default GET for all clients
router.get("/", (req, res) => {
  client.find().then((clients) => res.json({ clients: clients }))
  .catch((error) => console.log(error));
});

// Get by either full, first or last name
router.get("/search/?", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;

  // IF statement to check whether a first name, lastname or both are part of the query
  if (firstName != null && lastName != null) {
    client
      .find({
        firstName: firstName,
        lastName: lastName,
      })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  } else if (firstName != null && lastName == null) {
    client
      .find({
        firstName: firstName,
      })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  } else if (firstName == null && lastName != null) {
    client
      .find({
        lastName: lastName,
      })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  }
});

// POST to add to clients list
router.post("/add-to/", (req, res) => {
  req.body.addressLine1 = req.body.addressLine1.replace(/[^a-z0-9' '\-]/gi, "");
  if (req.body.addressLine2 != null) {
    req.body.addressLine2 = req.body.addressLine2.replace(/[^a-z0-9' '\-]/gi, "");
  }

  const poBox = /^(?:Post(?:al)? (?:Office )?|P[. ]?O\.? )?Box(?:\s\d+)?$/gim;

  req.body.isPOBox = poBox.test(req.body.addressLine1)

  client.create(req.body).then((client) => {
    res.status(201).json({ status: 201, client: client });
  }).catch((error) => console.log(error));
});

// PUT to update client information using name
router.put("/update/?", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;

   // IF statement to check whether a first name, lastname or both are part of the query
  if (firstName != null && lastName != null) {
    client
      .findOneAndUpdate(
        { firstName: firstName, lastName: lastName },
        req.body,
        { new: true }
      )
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  } else if (firstName != null && lastName == null) {
    client
      .findOneAndUpdate({ firstName: firstName }, req.body, { new: true })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  } else if (firstName == null && lastName != null) {
    client
      .findOneAndUpdate({ lastName: lastName }, req.body, { new: true })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  }
});

// DELETE to remove clients using name
router.delete("/delete/?", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;

   // IF statement to check whether a first name, lastname or both are part of the query
  if (firstName != null && lastName != null) {
    client
      .findOneAndDelete(
        { firstName: firstName, lastName: lastName })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  } else if (firstName != null && lastName == null) {
    client
      .findOneAndDelete({ firstName: firstName })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  } else if (firstName == null && lastName != null) {
    client
      .findOneAndDelete({ lastName: lastName })
      .then((client) => res.json({ client: client }))
      .catch((error) => console.log(error));
  }
});

module.exports = router;
