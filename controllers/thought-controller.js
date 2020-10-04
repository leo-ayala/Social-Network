const { thought, User } = require('../models');

const thoughtController = {
  // add Thought to User
  addThought({ params, body }, res) {
    console.log(body);
    thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: userid },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
      // get all thoughts
      getAllThoughts(req, res) {
        thought.find({})
        .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
}

module.exports = thoughtController;