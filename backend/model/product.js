const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

let product = new Schema({
    name: {
            type: String
          },
    price: {
             type: String 
           },
    description: {
                    type: String
                 }
}, {
    collection: 'product'
})

module.exports = mongoose.model('product', product) ;