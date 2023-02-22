const mongoose = require ('mongoose'); 
var Schema = mongoose.Schema;

var employe = new Schema({
    cin: Number,
    nom: String,
    prenom: String

});
module.exports = mongoose.model('employe',employe);