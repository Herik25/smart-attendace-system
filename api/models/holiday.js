const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
  },
});

const Holiday = mongoose.model("Holiday", holidaySchema);

module.exports = Holiday;
