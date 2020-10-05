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

  // get one thought by id
getthoughtById({ params }, res) {
    thought.findOne({ _id: params.thoughtId })
    .select('-__v')
      .then(dbthoughtData => {
        // If no thought is found, send 404
        if (!dbthoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
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
          { new: false }
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
    thought.findOneAndUpdate(
        {_id: params.thoughtId },
        body,
        { new: false }
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

  addReaction({ params, body }, res) {
    thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove Reaction
  removeReaction({ params }, res) {
    thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController;