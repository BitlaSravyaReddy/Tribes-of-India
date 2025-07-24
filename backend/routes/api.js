const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define schema
const DataSchema = new mongoose.Schema({
  "name": "string",
  "tagline": "string",
  "history": [
    {
      "year": "string",
      "title": "string",
      "description": "string"
    }
  ],
  "tribes": [
    {
      "id": "string",
      "name": "string",
      "title": "string",
      "imageSrc": "string",
      "imageHint": "string",
      "history": "string",
      "origin": "string",
      "distribution": "string",
      "festivals": [
        {
          "name": "string",
          "description": "string"
        }
      ],
      "livelihood": "string",
      "challenges": ["string"],
      "beliefs": "string",
      "practices": ["string"]
    }
  ]

});

// Model with collection name
const DataModel = mongoose.model('TribalData', DataSchema, 'states_data');

// GET route
router.get('/', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;