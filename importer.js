mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/imgbot');
var conn = mongoose.connection;
var dateFormat = require('dateformat');
var fs = require('fs');
var now = new Date();
global.apischema={
  // _id:new mongoose.mongo.ObjectId(),
  count    : {type:Number,default:0},
  email    : String,
  password    : String,
  date    : {type:Number,default:20160202},
  appid    : {type:String,unique:true},
  key    : String,
  status:{type:String,default:'ok'}
};
global.Schema = mongoose.Schema;
apis=new Schema(apischema)
global.apimodel = mongoose.model('apis', apis);
var data=[];
for(i=1;i<=10;i++) {
    filedata = fs.readFileSync('./data/'+i).toString('utf8');
    data = data.concat(JSON.parse(filedata));
}
// console.log(data)
// process.exit();
// apimodel.remove({},function (err,data) {
//
// apimodel.create(data, function (err, obj) {
//   apimodel.find({}, function (err, data) {
//     console.log(err, data)
//   })
// })
// })

// apimodel.remove({},function (err,resr) {
//   console.log(err,data)
//
// conn.collection('apis').insert(data, function (err, arr) {
//   console.log(err,arr)
//       });
// apimodel.find({},function (err,data) {
//   console.log(err,data)
// })
// })

  var itemsProcessed = 0;
// console.log(data)
  data.forEach((item, index, array) => {

    apimodel.create(item, function (err, obj) {
    itemsProcessed++;
   // console.log(err.message,itemsProcessed)
    if (itemsProcessed === array.length) {
      callback();
    }
  })
})
  ;
// });
function callback() {
  apimodel.find({}, function (err, resf) {
    console.log(err, resf.length)
    for(i=0;resf.length>i;i++){
      resf[i].status="ok";
      resf[i].save();
      console.log(resf[i].status,i)
    }
    apimodel.find({status:"ok"}, function (err, resf) {
      console.log("update end")
      console.log(err, resf.length)
    })
  })
}
