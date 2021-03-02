const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function readFile(patch) {
  try {
    const file = await fs.readFile(patch, "utf-8");
    const data = JSON.parse(file);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function writeFile(patch, data) {
  try {
    await fs.writeFile(patch, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.log(err);
  }
}

async function listContacts() {
  try {
    const contacts = await readFile(contactsPath);
    return contacts;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readFile(contactsPath);
    return contacts.filter((el) => el.id === Number(contactId));
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readFile(contactsPath);
    const data = contacts.filter((el) => el.id !== Number(contactId));
    console.log(contactId);
    if (data.length !== contacts.length) {
      await writeFile(contactsPath, data);
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readFile(contactsPath);
    const data = [...contacts, { id: uuidv4(), name, email, phone }];
    await writeFile(contactsPath, data);
  } catch (err) {
    console.log(err);
  }
}

async function updateContact(contactId, body) {
  try {
    const contacts = await readFile(contactsPath);
    const data = contacts.map((el) =>
      el.id === Number(contactId) ? { ...el, ...body } : el
    );
    const updateOneContact = data.find((el) => el.id === Number(contactId));
    if (updateOneContact) {
      await writeFile(contactsPath, data);
      return updateOneContact;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
