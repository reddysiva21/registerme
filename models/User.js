/**
 * Created by siva on 11/12/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName:{ type: String, required: true, trim:true },
    lastName: { type: String, required: true, trim:true },
    userName: { type: String, required: true, trim:true },
    password: { type: String, required: true, trim:true },
    email:    { type: String, required: true, trim: true },
    created:  { type: Date, default: Date.now },
    updated:  { type: Date, default: Date.now }
});

var user = mongoose.model('User', userSchema);
exports = module.exports = user;

