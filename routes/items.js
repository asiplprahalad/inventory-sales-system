const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.post('/', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).send(item);
});

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

router.put('/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(item);
});

router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

module.exports = router;