const router = require('express').Router();
const {Trip} = require('../../models');

router.post('/', async (req, res) => {
    // create a new traveller and return json
    try {
        const tripData = await Trip.create(req.body);
        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // destroy a single traveler where req.params.id
    try {
        const tripData = await Trip.destroy({
            where: { id: req.params.id,},
        });

        if(!tripData) {
            res.status(404).json({message: 'No trip found with that id.'});
            return;
        }

        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;