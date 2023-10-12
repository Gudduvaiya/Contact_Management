import express from "express";
import {
  getContacts,
  getASingleContact,
  postContact,
  updateContact,
  deleteContact,
} from "../Controllers/ContactControllers.js";
import { ValidateToken } from "../Middleware/validateTokenHandler.js";
const router = express.Router();

router.use(ValidateToken)     //this will apply validate to all apis.
router.route("/").get(getContacts);

router.route("/:contactId").get(getASingleContact);

router.route("/").post(postContact);

router.route("/:contactId").put(updateContact);

router.route("/:contactId").delete(deleteContact);

export default router;
