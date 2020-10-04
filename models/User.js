const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
         },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'thought'
            }
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User'
            }
          ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);
module.exports = User;