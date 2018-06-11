mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/imgbot');
var conn = mongoose.connection;
var dateFormat = require('dateformat');
var fs = require('fs');
var now = new Date();
global.userschema={
    chatid    : {type:String,unique:true},
    // name     : String,
    username      : String,
    invited      : [],
    status      : String,
    countofused      : String,
    limitused      : String,
    limitfriends      : String,
    create      : String,
    countofnotice     : String,
    comments:[{
        message:String,
        status:String,
        send:String,
    }],
    link:String,
    count    : {type:Number,default:0},
    date    : {type:Number,default:20160202}
};
global.Schema = mongoose.Schema;
users=new Schema(userschema)
global.usermodel = mongoose.model('users', users);
// var data=[];
// for(i=1;i<=10;i++) {
//     filedata = fs.readFileSync('./data/'+i).toString('utf8');
//     data = data.concat(JSON.parse(filedata));
// }
    filedata = fs.readFileSync('./mylogs.txt').toString('utf8');
    data = filedata.replace( /\n/g, " " ).split( " " )
console.log(data.length)
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


// console.log(data)

var insertuser= function () {
        item=data[itemsProcessed]
    if(item)
        item=item.trim();
        this.obj = {
            chatid: item,
            invited: [1, 2, 3],
            status: "ok",
            countofused: 0,
            limitused: 1,
            limitfriends: 2,
            create: new Date().getTime(),
            countofnotice: 0,
            link: "https://t.me/Axinebot?start=" + item
        }
    usermodel.findOne({chatid:item},function (err, obj) {
        if(!obj) {
            usermodel.create(this.obj, function (err, obj) {
                itemsProcessed++;
                console.log((err ? err.message : "okay"), itemsProcessed)
                // resolve();
                if (itemsProcessed == data.length) {
                    console.log("end")
                }
                else {
                    insertuser();
                }
            });
        }
        else{
            itemsProcessed++;
            console.log(("duplicate : "), itemsProcessed)
            insertuser();
        }
        });
}
var itemsProcessed = 0;

var promises = [];
usermodel.remove({},function (err,resr) {
    insertuser();
})

// for (numb=0;numb< data.length;numb++) {
//     console.log(numb)
//      promises.push(insertuser(data[numb]));
// }
// console.log(promises.length)
// Promise.all(promises).then(function (data) {
//     console.log("done : ",itemsProcessed)
// })

// function callback() {
//     apimodel.find({}, function (err, resf) {
//         console.log(err, resf.length)
        // for(i=0;resf.length>i;i++){
        //     resf[i].status="ok";
        //     resf[i].save();
        //     console.log(resf[i].status,i)
        // }
        // apimodel.find({status:"ok"}, function (err, resf) {
        //     console.log("update end")
        //     console.log(err, resf.length)
        // })
    // })
// }
