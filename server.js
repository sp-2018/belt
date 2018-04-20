
var express = require("express");

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// Require path
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/author_mongoose');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(express.static( __dirname + '/client/dist' ));

// var AuthorSchema = new mongoose.Schema({
//     name: { 
//         type: String, 
//         required: [true,"Name field cannot be empty!"], 
//         minlength: [3,"Name should have more than 2 characters!"]
//     },
    
//    }, {timestamps: true })

   var UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        unique: true,
        //unique: "This name already exists!", 
        required: [true,"Name field cannot be empty!"], 
        minlength: [3,"Name should have atleast 3 characters!"]
    },
    type: { 
        type: String, 
        required: [true,"Type field cannot be empty!"], 
        minlength: [3,"Type should have atleast 3 characters!"]
    },
    desc: { 
        type: String, 
        required: [true,"Description field cannot be empty!"], 
        minlength: [3,"Description should have atleast 3 characters!"]
    },

    skill1: String,
    skill2: String,
    skill3: String,
    likes:  Number,
   }, {timestamps: true })

mongoose.model('User', UserSchema); 
var User = mongoose.model('User') 

// mongoose.model('Author', AuthorSchema); 
// var Author = mongoose.model('Author') 

// root route, Retrieve all authors
app.get('/pets', function (req, res){  
    User.find({},null,{sort: 'type'}, function(err, users) {
        
        if(err){
            console.log("could not get pets", err);
            res.json({message: "Error", error: err})
         }
         else {
            res.json({message: "Success", data: users})
         }       
    })

});

//create a author, post route
app.post('/pets', function (req, res){

    var user = new User(req.body);

    user.save(function(err, users) {

        if(err) {
            console.log('something went wrong');

            if (err && (11000 === err.code || 11001 === err.code) ){
                res.json({message: "Error name is not unique", error: err})
                console.log(err)
             }
            else{
                res.json({message: "Error", error: err})
                console.log(err)
            }
            
        } else { 
            console.log('successfully added a author!');
            res.json({message: "Success", data: users})
            //res.redirect('/tasks');
        }
    })
});

//Retrieve a Pet by ID
app.get('/pets/:id', function (request, res){
    id = request.params.id;

    User.findOne({_id:id},null,{sort: '-createdAt'}, function(err, users) {
        if(err){
            console.log("could not get pet", err);
            res.json({message: "Error: Could not get pet", error: err})
        }
        else {
            res.json({message: "Success", data: users})
        }
    })
    
});

//edit task: Update a Pet by ID
app.put('/pets/:id', function (request, res){
    id = request.params.id;
    console.log("ID",id)
    //Task.findByIdAndUpdate(id, {$set:request.body}, {new: true}, { runValidators: true }, function(err, task) {
        User.findByIdAndUpdate(id, {$set:request.body},  { runValidators: true }, function(err, user) {
    
        if(err){
            console.log("could not update pet", err);
            res.json({message: "Error", error: err})
        }
        else {
            console.log("ok")
            res.json({message: "Success", data: user})
        }
    })    
});

//delete pet by ID
app.delete('/pets/destroy/:id', function (request, res){
    console.log("in server")
    id = request.params.id;
    console.log("ID",id)

    User.remove({_id: id}, function(err,user){
        if(err) {
            console.log('could not delete pet',err);
            res.json({message: "Error: Could not delete pet", error: err})      
        } else { 
            console.log('successfully deleted pet!');
            res.json({message: "Success", data: user})
        }
   })
    
});

//this._http.post('/quotes/upvote/'+author_id, quote_id)
app.post('/quotes/upvote/:user_id', function (request, res){
    id = request.params.user_id;
    console.log("ID in server upvote",id,request.body.quote_id)
   
        User.update({_id:id}, {$inc: {'likes': 1}},  { runValidators: true }, function(err, author) {
        //Model.update({ _id: doc._id }, { $inc: { age: 1 } }, function(error, rawResponse) {
        if(err){
            console.log("could not update user in server", err);
            res.json({message: "Error in server", error: err})
        }
        else {
            console.log("ok",author)
            res.json({message: "Success in server", data: author})
        }
    })    
});

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});


app.listen(8000, function() {
  console.log("listening on port 8000");
})
