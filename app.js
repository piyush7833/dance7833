const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});;
const app = express();
const port = process.env.PORT || 8000;

// EXPRESS specific stuff
app.use('/static', express.static('static')) //  for serving static files
//use middleware to serve static files like videos and photos in pug
app.use(express.static('public'))
// to get html form data to express
app.use(express.urlencoded())

// PUG specific stuff
app.set('view engine', 'pug')// Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// mongoose specifi stuff 
// define mogoose sc
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    querry: String,
  });

//   confirming the schema i.e. compiling a model
  var Kitten = mongoose.model('contact', contactSchema);
//ENDPOINTS
app.get("/", (req, res)=>{ 
    res.status(200).render('home.pug')
});
app.get("/contact", (req, res)=>{ 
    res.status(200).render('contact.pug')
});

app.post('/contact', (req, res)=>{
    // to make new data
    var myData = new Contact(req.body);
    // to save data
    myData.save().then(()=>{
        res.send('This item has been saved to the database')
    }).catch(()=>{
        // if error
        res.status(400).send('item was not saved to the databse')
})
})

// Start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

