function getRandomNumber() {
  const min = 0;
  const max = 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let expenses = [];

const start = () => {
  expenses = [];
};

const getAll = (userId, categories, from, to) => {
  if (userId) {
    const filteredByUser = expenses.filter((e) => e.userId === +userId);

    if (categories) {
      return filteredByUser.filter((e) => e.category === categories);
    }

    return filteredByUser;
  }

  if (from || to) {
    return expenses.filter((e) => e.spentAt >= from && e.spentAt <= to);
  }

  return expenses;
};

const getById = (id) => {
  return expenses.find((person) => person.id === +id);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: getRandomNumber(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const change = (id, title) => {
  const expense = getById(id);

  if (expense) {
    expense.title = title;

    return expense;
  }

  return null;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  change,
};
