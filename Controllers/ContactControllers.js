import asyncHandler from "express-async-handler"; //asyncHandler package eliminates all try catch blocks in order to catch errors. using for error handling.
import contactModel from "../Models/ContactModel.js";

// get all contacts
//GET - api/conatct/
const getContacts = asyncHandler(async (req, res) => {
  // req.user is coming from token... see validateToken middleware to know more...
  const contacts = await contactModel.find({ user_id: req.user._id });
  res.status(200).json(contacts);
});

// post a contact
//POST - api/conatct/

const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw new Error("All fields are mandotory!");
  }

  const payload = {
    user_id: req.user._id,
    name,
    email,
    phone,
  };
  console.log(payload);
  const newContact = await contactModel.create(payload);
  res.status(200).json(newContact);
});

// get a single contact
//GET - api/conatct/id

const getASingleContact = asyncHandler(async (req, res) => {
  // const contact = await contactModel.findById(req.params.contactId);
  const AlContacts = await contactModel.find({ user_id: req.user._id });
  console.log(AlContacts);
  const contact = AlContacts.filter(
    (item) => item._id.toString() === req.params.contactId
  );

  if (contact.length<1) {
    res.status(404);
    throw new Error("No Contact is Associate with provided ID!");
  }
  res.status(200).json(contact);
});

// update a contact
//PUT - api/conatct/id

const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.contactId);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact is Associate with provided ID!");
  }
  if (req.user._id !== contact.user_id.toString()) {
    res.status(401);
    throw new Error("User don't have permit to update other user's details!");
  }
  const updatedContact = await contactModel.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// delete a contact
//DELETE - api/conatct/id
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.contactId);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact is Associate with provided ID!");
  }

  if (req.user._id !== contact.user_id.toString()) {
    res.status(401);
    throw new Error("User don't have permit to delete other user's details!");
  }

  await contactModel.findByIdAndRemove(req.params.contactId);
  res
    .status(200)
    .json({ message: `Contact with id ${contact.id} is deleted!`, contact });
});

export {
  getContacts,
  postContact,
  getASingleContact,
  updateContact,
  deleteContact,
};
