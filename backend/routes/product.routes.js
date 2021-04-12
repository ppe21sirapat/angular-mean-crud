const express = require('express') ;
const app = express() ;

const productRoute = express.Router() ;

let product = require('../model/product.js') ;

// Add Product 

productRoute.route('/add-product').post((req, res, next)=> {
    product.create(req.body, (error, data) => {
        if(error)
        {
            return next(error) ;
        }
        else
        {
            res.json(data) ;
        }
    })
})

// Get product

productRoute.route('/').get((req, res) => {
    product.find((error, data) => {
        if(error)
        {
            return next(error) ;
        }
        else
        {
            res.json(data) ;
        }
    })
})

// Detail product 

productRoute.route('/product-detail/:id').get((req, res) => {
    product.findById(req.params.id, (error, data) => {
        if(error)
        {
            return next(error) ;
        }
        else
        {
            res.json(data) ;
        }
    })
})

// Update product 

productRoute.route('/update-product/:id').put((req, res, next) => {
    product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error,data) => {
        if(error)
        {
            return next(error) ;
            console.log(error) ;
        }
        else
        {
            res.json(data) ;
            console.log('Product update success') ;
        }
    })
})

productRoute.route('/delete-product/:id').delete((req, res, next) => {
    product.findByIdAndRemove(req.params.id, (error, data) => {
        if(error)
        {
            return next(error) ;
        }
        else 
        {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = productRoute ;