const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    subscribed: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

const childUserSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    additionalField: String
});

const ChildUser = User.discriminator('ChildUser', childUserSchema);

module.exports = { User, ChildUser };
