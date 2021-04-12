let express = require('express') ;
let path = require('path') ;
let cors = require('cors') ;
let bodyParser = require('body-parser') ;
let mongoose = require('mongoose') ;
let mongoDB = require('./database/db.js') ;

mongoose.Promise = global.Promise ;
mongoose.connect(mongoDB.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connect Success') ;
}, error => {
    console.log('Database error' + error) ;
})

const productRoute = require('./routes/product.routes.js')

const app = express() ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({
    extended: false
})) ;
app.use(cors()) ;

// Static directory path 
app.use(express.static(path.join(__dirname, 'dist/')))
// Base route 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'))
})

// API Root
app.use('/api',productRoute) ;

// Port
const port = process.env.PORT || 8000 ;
app.listen(port, () => {
    console.log('Listening on port ' + port) ;
})

// 404 Handler
app.use((req, res, next) => {
    next(createError(404)) ;
})

// Error Handler
app.use((req, res, next) => {
    console.log(err.message) ;
    if(!err.statusCode) err.statusCode = 500 ;
    res.status(err.statusCode).send(err.message) ;
})