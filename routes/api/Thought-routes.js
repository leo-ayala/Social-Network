const router = require('express').Router();

const {
    getAllThoughts,
    addThought,
    removeThought,
    updateThought,
    getthoughtById,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:thoughtId')
    .delete(removeThought)
    .put(updateThought)
    .get(getthoughtById)
    .put(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;