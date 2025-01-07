const expensesService = require('./../services/expense.service.js');
const userService = require('./../services/user.service.js');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.status(200).send(expensesService.getAll(userId, categories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).end();
  }

  const expenses = expensesService.getById(id);

  if (!expenses) {
    return res.status(404).end();
  }

  res.status(200).send(expenses);
};

const post = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && spentAt && title && amount && category && note)) {
    return res.status(400).end();
  }

  const user = userService.getById(userId);

  if (!user) {
    return res.status(400).end();
  }

  const person = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(person);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    return res.status(404).end();
  }

  expensesService.remove(id);

  res.status(204).end();
};

const patch = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!expensesService.getById(id)) {
    return res.status(404).end();
  }

  if (typeof title !== 'string') {
    return res.status(400).end();
  }

  const user = expensesService.change(id, title);

  res.status(200).send(user);
};

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
