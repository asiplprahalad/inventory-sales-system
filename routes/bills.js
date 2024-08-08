const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');
const Item = require('../models/item');

router.post('/', async (req, res) => {
  const { items } = req.body;
  let totalAmount = 0;

  for (const billItem of items) {
    const item = await Item.findById(billItem.itemId);
    if (item.quantity < billItem.quantity) {
      return res.status(400).send({ message: `Not enough quantity for item: ${item.name}` });
    }
    item.quantity -= billItem.quantity;
    await item.save();
    totalAmount += item.price * billItem.quantity;
  }

  const bill = new Bill({ items, totalAmount });
  await bill.save();
  res.status(201).send(bill);
});

router.get('/', async (req, res) => {
  const bills = await Bill.find().populate('items.itemId');
  res.send(bills);
});

router.get('/:id', async (req, res) => {
  const bill = await Bill.findById(req.params.id).populate('items.itemId');
  res.send(bill);
});

module.exports = router;