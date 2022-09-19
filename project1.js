//jshint esversion:6

const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs")
const mongoose = require ('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://hulo9:<password>@cluster0.ihunb0h.mongodb.net/blogDB", {useNewUrlParser : true});



const postSchema = {
  name: String,
  phone: Number,
  email: String,
  displayedContact: String,
  city: String,
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("pages/home", { /
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});



app.get("/compose", function(req, res){
  res.render("pages/compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    displayedContact: req.body.displayedContact,
    city: req.body.city,
    title: req.body.postTitle,
    content: req.body.postBody
  });

    post.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });

});


app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("pages/post", {
      name: post.title,
      displayedContact: post.displayedContact,
      city: post.city,
      title: post.title,
      content: post.content
    });
  });

});

app.get("/register", function(req, res){
  res.render("pages/register");
});



app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
