// Import the mongoose module
const mongoose = require('mongoose');

// Set up default mongoose connection
const uri =
  'xxx';
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'Woi! MongoDB connection error:'));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
db.once('open', function (callback) {
  console.log('Connection Succeeded');
});

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  description: {
    type: String,
    minLength: 1,
    required: [true, 'description cannot empty lah!'],
  },
  created: Date,
  updated: Date,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;