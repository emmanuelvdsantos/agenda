const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Agenda= new Schema({
    nome: {
        type: String
},
    email: {
        type: String
},
    telefone: {
        type: Number
},

},{
    collection: 'agenda'
});

module.exports = mongoose.model('Agenda', Agenda);