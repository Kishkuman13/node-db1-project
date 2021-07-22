const router = require('express').Router()
const Account = require('./accounts-model');
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch(err) { next(err) };
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.json(res.locals.account);
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.create({
      name: req.body.name,
      budget: req.body.budget
    });
    res.status(201).json(data);
  } catch(err) { next(err) };
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body);
    res.json(updatedAccount);
  } catch(err) { next(err) };
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account)
  } catch(err) { next(err) };
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 404).json({
    message: err.message
  })
})

module.exports = router;
