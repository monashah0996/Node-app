var mongoose = require('mongoose');
var Schema = mongoose.Schema;
RestaurantSchema = new Schema({
    address:{
        type:Array,
        building:{
        type:String,
    },
    coord:[{type:Array}],
    street:String,
    zipcode:String,
    },
    borough:String,
    cuisine:String,
    grades:[{
         date:{type:Date},
         grade:{type:String},
         score:{type:Number}
 }],
    name:{type:String},
    restaurant_id:{type:String}
});
module.exports = mongoose.model('restaurants', RestaurantSchema);