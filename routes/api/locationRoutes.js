const router = require('express').Router();
const { Location, Traveller, Trip } = require('../../models');

// GET all locations
router.get('/', async (req, res) => {
  // find all locations
  try {
    const locationData = await Location.findAll({
      include: [{model: Traveller}, {model: Trip}]
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET a single location
router.get('/:id', async (req, res) => {
  //find all location by PK ID and include 
  // Traveeler through trip as location_travellers
  try {
        const locationData = await Location.findByPk(req.params.id, {
            include: [{ model: Traveller, through: Trip, as: "location_travellers" }]
    // return json traveller data
        });

        if(!locationData) {
            res.status(404).json({message: 'No location found with that id!'});
            return;
        }
        // return json traveller data
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a location
router.post('/', async (req, res) => {
  // create a new location
  try {
    const locationData = await Location.create(req.body);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a location
router.delete('/:id', async (req, res) => {
  // destroy a single location by id
  try {
    const locationData = await Location.destroy({
      where: { id: req.params.id, },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id.' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;