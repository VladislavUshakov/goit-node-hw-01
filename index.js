const contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const list = async () => {
  const contactsList = await contacts.listContacts();
  console.table(contactsList);
};
const get = async ({ id }) => {
  const contact = await contacts.getContactById(id);
  console.log(contact);
};
const add = async ({ name, email, phone }) => {
  const contact = await contacts.addContact(name, email, phone);
  console.log(contact);
};
const remove = async ({ id }) => {
  const contact = await contacts.removeContact(id);
  console.log(contact);
};

const actions = {
  list,
  get,
  add,
  remove,
};

const invokeAction = ({ action, ...args }) => {
  try {
    actions[argv.action](args);
  } catch {
    console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
