const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');


router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:_id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
