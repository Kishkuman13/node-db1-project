const Account = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
    req.body.name = req.body.name.trim();
  const { name, budget } = req.body;

  if (!name || name == undefined || !budget || budget == undefined) {
    res.status(400).json({ message: 'name and budget are required' });
  } else if (typeof(name) !== 'string') {
    res.status(400).json({ message: 'name of account must be a string'});
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100'});
  } else if (typeof(budget) !== 'number' || isNaN(budget)) {
    res.status(400).json({ message: 'budget of account must be a number'});
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: 'budget of account is too large or too small'});
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const checkAccount = await db('accounts').where('name', req.body.name.trim()).first();

    if (!checkAccount) {
      next();
    } else {
      res.status(400).json({ message: 'that name is taken'})
    }
  } catch(err) { next(err) }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id);

    if (account) {
      res.locals.account = account;
      next();
    } else {
      res.status(404).json({ message: 'account not found' });
    }
  } catch(err) { next(err) };
}

