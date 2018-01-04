const express=require('express');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const session=require('express-session');
const mongoose= require('mongoose');
const cors=require('cors');
const passport=require('passport');
const config=require('./config/database');

const port=process.env.PORT || 8000;
const app=express();

// Connect database
mongoose.connect(config.db);
mongoose.Promise=global.Promise;
require('./config/passport')(passport);

app.use(express.static(__dirname+'client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes')(app,passport);

app.listen(port,()=>{
    console.log('Server is running on port '+port);
})