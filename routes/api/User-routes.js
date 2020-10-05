const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById
} = require('../../controllers/user-controller');


router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:_id')
    .put(updateUser)
    .delete(deleteUser)
    .get(getUserById);

module.exports = router;
