const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contacts");
const validate = require('./validation')

router.get("/", contactsControllers.getAll);

router.get("/:id", contactsControllers.getById);

router.post("/", validate.createContact, contactsControllers.create);

router.delete("/:id", contactsControllers.remove);

router.patch(
  "/:id", validate.updateContact, contactsControllers.update);

module.exports = router;