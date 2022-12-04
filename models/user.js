var mongoose = require('mongoose');
var Schema = mongoose.Schema;
UserSchema = new Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},
    entryDate: {type:Date, default:Date.now}
});

module.exports = mongoose.model('users', UserSchema);