var cluster = require('cluster');
if (cluster.isMaster) {
    cluster.fork();

    cluster.on('exit', function (worker, code, signal) {
        shotdown++;
        cluster.fork();
    });
}
var shotdown = 0;
if (cluster.isWorker)
{
    var initM=require('./modules/init')
    initM.initial(true);
    var express = require('express');
    var app = express();
    var  fileUpload = require('express-fileupload');
    var bodyParser = require('body-parser');
  cron.schedule('0 0 5 * * *', function(){
    fs.readdir("img", (err, files) => {
      if (err) throw error;

    for (const file of files) {
      fs.unlink(path.join("img", file), err => {
        if (err) throw error;
    });
    }
  });
    fs.readdir("imgapp", (err, files) => {
      if (err) throw error;

    for (const file of files) {
      fs.unlink(path.join("imgapp", file), err => {
        if (err) throw error;
    });
    }
  });
    if (!fs.existsSync("img")){
      fs.mkdirSync("img");
    }
    if (!fs.existsSync("imgapp")){
      fs.mkdirSync("imgapp");
    }
  });
    app.use(fileUpload());
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin',req.headers.origin || '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware

        next();

        // console.log(req.body);
    });
  app.post('/getid',function(req, res)
  {
    console.log(req.originalUrl)
    new serverM.getid(req,res);

  })
    app.post('/uploadimage',function(req, res){
      console.log(req.originalUrl)
      new serverM.uploadimage(req,res);
        })

    app.post('/doeffect',function(req, res)
{
  console.log(req.originalUrl)
  new serverM.doeffect(req,res);

})
app.post('/invite',function(req, res)
{
  console.log(req.originalUrl)
          new serverM.invite(req,res);

})
            app.listen(5000, function() {
            console.log('Node app is running on port', 5000);
            });
            process.on('uncaughtException', function (exception) {
            console.log(exception,new Date())
            process.exit(0);
            })
}
