const router = require('express').Router();

const {
    getAllThoughts,
    addThought,
    removeThought,
    updateThought
} = require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:thoughtId')
    .delete(removeThought)
    .put(updateThought);

module.exports = router;