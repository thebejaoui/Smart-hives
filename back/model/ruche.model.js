const mongoose = require ('mongoose'); 
var Schema = mongoose.Schema;

var ruche = new Schema({
    
    libele: String,
    humidite: String,
    temperature: String,
    poids: String,
    motion: Number

});
module.exports = mongoose.model('ruche',ruche);