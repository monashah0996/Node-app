require('dotenv').config() 
const express  = require('express');
const db = require('./modules/method');
const app = express()
var path = require('path');
const indexRouter = require('./routes/index')
const exphbs = require('express-handlebars'); //importing handlebars
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)

//var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.static(path.join(__dirname, 'public')));

// Intializing template engine
app.engine('.hbs', exphbs.engine({ 
	extname: '.hbs',runtimeOptions:{
		allowProtoPropertiesByDefault:true,
		allowProtoMethodsByDefault:true
	} 
}));
app.set('view engine', 'hbs');


db.initialize(process.env.DATABASE_URL)


app.use('/',indexRouter)
console.log('1')
app.listen(process.env.PORT || 8000)
