const { thought, User } = require('../models');

const thoughtController = {
  // add Thought to User
  addThought({ body }, res) {
    // console.log(body);
    thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userid },
          { $push: { thoughts:_id } },
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

// remove thought
  removeThought({ params }, res) {
    thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        // console.log({deletedThought})
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return thought.findOneAndUpdate(
          { _id: deletedThought.userId },
          { $pull: { thoughts: deletedThought._id } },
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

  // update thought by id
updateThought({ params, body }, res) {
    User.findOneAndUpdate(
        {_id: params.thoughtId },
        body,
        { new: true }
        )
      .then(dbThoughtData => {
        console.log({dbThoughtData})
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
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