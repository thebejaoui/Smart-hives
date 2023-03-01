const mongoose = require ('mongoose'); 
var Schema = mongoose.Schema;

var reclamation = new Schema({
    
    type:String,
    nom: String,
    cont: String,
    date: Date
   

});
module.exports = mongoose.model('reclamation',reclamation);