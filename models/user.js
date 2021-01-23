const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

userSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uuid = _id;
    return object;
});

module.exports = model('User', userSchema);