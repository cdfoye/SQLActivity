const router = require('express').Router();
const { Traveller, Trip, Location} = require('../../models');

router.get('/', async (req, res) => {
    // findAll Travellers and return back json
    try {
        const travellerData = await Traveller.findAll({
            include: [{model: Trip}, {model: Location}]
        });
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//It's done when the GET route /api/travellers/:id returns a single traveller's data with their associated trips and a list of locations in Insomnia.

router.get("/:id", async (req, res) => {
    // find a single traveller by primary key and include
    // the Location mode and Trip Model as 'planned_trips'
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
            include: [{ model: Location, through: Trip, as: "planned_trips" }]
    // return json traveller data
        });

        if(!travellerData) {
            res.status(404).json({message: 'No traveller found with that id!'});
            return;
        }
        // return json traveller data
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new traveller and return json
    try {
        const travellerData = await Traveller.create(req.body);
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // destroy a single traveler where req.params.id
    try {
        const travellerData = await Traveller.destroy({
            where: { id: req.params.id,},
        });

        if(!travellerData) {
            res.status(404).json({message: 'No traveller found with that id.'});
            return;
        }

        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;