const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://nites-tagadghar:gorahul269@cluster0-aq5g2.mongodb.net/movieDB",{useNewUrlParser: true, useUnifiedTopology: true })

const movieSchema = {
    movie: String,
    director:String,
    actor:String,
    actress:String
};

const Movie = mongoose.model("Movie", movieSchema);

let Moviee = Movie.find({});





app.get("/",function(req,res){
    res.render("home")
});
app.get("/home",function(req,res){
    res.render("home")
});
app.get("/add",function(req,res){
    res.render("add")
});
app.get("/searchUser", function(req, res){
    res.render("searchUser")
});
app.get("/display",function(req,res){
    Movie.find({},function(err,Movie){
        if(err){
            console.log(err);
            
        }else{
            res.render("display",{Movie:Movie})
        }
    });
});

app.post("/searchUser", function(req, res){
 let usertyped = _.lowerCase(req.body.search);
  
 Movie.find({Movie}, function(err, Movie){
    
    Movie.forEach(function(Movie){
        const stored = _.lowerCase(Movie.movie);
          
        if(stored === usertyped){
            res.render("new",{
                
                movie: Movie.movie,
                director:Movie.director,
                actor:Movie.actor,
                actress:Movie.actress
            });
           
        }
            
        
    
      });

 });
    
  

});


   





app.post("/",function(req,res){
    const newMovie = new Movie({
        movie: req.body.movie_name,
        director: req.body.director_name,
        actor:req.body.actor_name,
        actress:req.body.actress_name
    });
    
    newMovie.save(function(err){
        if (!err){
            res.redirect("display");
        }else{
            res.send(err);
        }
    });

}) ;

app.get("/delete/:id",function(req,res){
    Movie.findByIdAndDelete(req.params.id,function(err){
        if (err){
            res.redirect('../display');
        }else{
            res.redirect('../display')
        }
    });
});

app.route("/Movie").get(function(req,res){
res.sendFile(__dirname + '/index.html')
    
    }) 
    
    
    .post(function(req,res){
        const newArticle = new Movie({
            movie: req.body.movie_name,
        director: req.body.director_name,
        actor:req.body.actor_name,
        actress:req.body.actress_name
        });
    
        newArticle.save(function(err){
            if (!err){
                Movie.find({},function(err,foundArticles){
                   
                    if(!err){
                        res.send(foundArticles);
                    } else{
                        res.send(err);
                    }
                    
                    });
            }else{
                res.send(err);
            }
        });

        




    }) ;

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}
app.listen(port,function(){
    console.log("server is running on port 3000");
    
});