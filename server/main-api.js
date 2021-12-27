const express = require('express');
const router = express.Router();

const Item = require('./mongoose-connection.js');

router.post('/create', function (req, res) {
  const description = req.body.description;

  const newItem = new Item({
    description,
    created: new Date(),
    updated: null,
  });

  newItem.save(function (error) {
    if (error) {
      console.error(error);
      res.status(422).send(error);
    } else {
      res.send({
        success: true,
        message: 'New item saved successfully!',
      });
    }
  });
});

router.get('/read', function (req, res) {
  Item.find({}, function (error, list) {
    if (error) {
      console.error(error);
      res.send(error);
    } else {
      res.send({
        list,
      });
    }
  });
});

router.put('/update/:id', function (req, res) {
  Item.findById(req.params.id, function (error, item) {
    if (error) {
      console.error(error);
    } else {
      item.description = req.body.description;
      item.updated = new Date();

      item.save(function (error) {
        if (error) {
          console.log(error);
          res.status(422).send(error);
        } else {
          res.send({
            success: true,
            message: 'Item successfully updated!',
          });
        }
      });
    }
  });
});

router.delete('/delete/:id', function (req, res) {
  Item.remove(
    {
      _id: req.params.id,
  	},
    function(error) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send({
          success: true,
          message: 'Item successfully deleted!',
        });
      }
    }
  );
});

module.exports = router;
