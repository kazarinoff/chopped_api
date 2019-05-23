const express    = require('express'),
      app        = express(),
      path       = require('path'),
      bodyParser = require('body-parser'),
      port       = 9700;
      mongoose   = require('./mongoose')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static( __dirname + '/public/dist/public' ));

const Episode = require('./episodes');

var routemyapp = function(){
    app.get('/api/episodes/index',function(req,res){
        Episode.find({},function(err,items){
            {res.json({errors:err,output:items})};
        });
    });
    app.get('/api/episodes/lastest',function(req,res){
        Episode.find({},{ sort: { 'premiere' : 1 } }, function(err, item) {
            res.json({errors:err,output:item});
          });
    })
    app.get('/api/episodes/:id',function(req,res){
        x=parseInt(req.params.id);
        Episode.findOne({seriesno:x},function(err,item){
            {res.json({errors:err,output:item})};
        });
    });
    app.all("*",function(req,res){
        console.log("initial page load");

        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });


}
routemyapp();
app.listen(port, function() {
    console.log(`this server's rocking on H0T ${port} FM`);
})