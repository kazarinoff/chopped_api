const express    = require('express'),
      app        = express(),
      path       = require('path'),
      bodyParser = require('body-parser'),
      port       = 9700;
      mongoose   = require('./mongoose')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

const Episode = require('./episodes');

var routemyapp = function(){
    app.get('/api/index',function(req,res){
        Episode.find({}, {_id:0},function(err,items){
            if (err) {res.json({errors:err})}
            else {res.json(items)};
        });
    });
    // app.get('/api/lastest',function(req,res){
    //     query=Episode.find({},{_id:0}).limit(1);
    //     query.exec(function(err, item){
    //         if (err) {res.json({errors:err})}
    //         else {res.json(item)};
    //       });
    // })
    app.get('/api/:id',function(req,res){
        x=parseInt(req.params.id);
        Episode.findOne({seriesno:x},{_id:0},function(err,item){
            if (err) {res.json({errors:err})}
            else {res.json(item)};
        });
    });
    app.get('/api/', function(req,res){
        if (req.query.judge){
            Episode.find({judges:{$in:[req.query.judge]}},{_id:0}, function (err,items){
                if (err) {res.json({errors:err})}
                else {res.json(items)};
            })
        }
        if (req.query.contestant){
            Episode.find({contestants:{$in:[req.query.contestant]}},{_id:0}, function (err,items){
                if (err) {res.json({errors:err})}
                else {res.json(items)};
            })
        }
        if (req.query.ingredient){
            Episode.find({$text:{$search:req.query.ingredient}},{_id:0}, function (err, items){
                if (err) {res.json({errors:err})}
                else {res.json(items)};
            })
        }
        if (req.query.season){
            if (req.query.season.match(/^[0-9]+$/) != null){
                x=parseInt(req.query.season)
            }
            else{x=req.query.season};
            Episode.find({season:x},{_id:0}, function (err,items){
                if (err){res.json({errors:err})}
                else {res.json(items)};
            })
        }
        if (req.query.title){
            Episode.find({title:req.query.title},{_id:0}, function (err,item){
                if (err) {res.json({errors:err})}
                else {res.json(item)};
            })
        }
    })
    app.all("*",function(req,res){

        res.sendFile(path.resolve("./index.html"))
    });
}
routemyapp();
app.listen(port, function() {
    console.log(`this server's rocking on H0T ${port} FM`);
})