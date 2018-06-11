

module.exports={
    count:function(msg){
            usermodel.find({},function(err,users){
            blockerbot.sendMessage(msg.from.id,users.length)
            });
    },
    usernames:function(msg){
        usermodel.find({},function(err,users){
        text="";
        for(i=0;i<users.length;i++){
        text+=users[i].username?"@"+users[i].username+"\r\n":"";
        if(i%100==0){
          blockerbot.sendMessage(msg.from.id,text)
          text="";
        }
        }
        if(text)
        blockerbot.sendMessage(msg.from.id,text)
        });
    },
comments:function(msg,status,page){
      page=page?page:0;
    usermodel.find({comments:{$elemMatch: {status:status,message: { $ne: null}}}},null,{sort: {"comments.send": -1}, skip: (page*10), limit:10}, function (err, users) {
					btns=[];
					for(ci=0;ci<users.length;ci++){
					btns.push([blockerbot.inlineButton(users[ci].username||users[ci].chatid , { callback: 'messagelistopration'+status+"-"+users[ci].chatid})])
					}
      btns.push([
        blockerbot.inlineButton("<<<<" , { callback: 'page-'+(page-1)}),
        blockerbot.inlineButton(">>>>" , { callback: 'page-'+(page+1)})
      ])
      btns=blockerbot.inlineKeyboard(btns);

		markup=btns;
		blockerbot.sendMessage(msg.from.id,"comment list",{markup});
	})
},
checkPhoto:function(msg){
	    	var params=msg.data.split('-');
              console.log(params)
              usermodel.findOne({chatid:params[1]},function(err,user){
                   let reply = params[2];
                  if(params[0]=="photoblock"){
                        user.status="blocked";
                        user.save();
                        blockerbot.answerCallback(msg.id,varM.msg.done, true);
                        bot.sendMessage(msg.from.id,varM.msg.blocked,{reply});
                  }
                  else{
                        user.countofnotice++;
                        user.save();
                        blockerbot.answerCallback(msg.id,varM.msg.done, true);
                        bot.sendMessage(msg.from.id,varM.msg.notice,{reply});
                  }
              });
	},
commentlistopration:function(msg,status) {
				var params=msg.data.split('-')
				var dateFormat=require('dateformat')
				usermodel.findOne({chatid:params[1]},null,{sort: {"comments.send": -1},limit:20}, function (err, user) {
					btns=[];
					for(mi=0;mi<user.comments.length;mi++){
					if(user.comments[mi].status==status&&user.comments[mi]['_id']){
					btns.push(
[blockerbot.inlineButton(user.comments[mi].message?
user.comments[mi].message.substr(0,75):""
,
{ callback: 'messagelistoprationread'+status+'-'+user.comments[mi]['_id']})]
)
					}
				}
                    btns=blockerbot.inlineKeyboard(btns);
		markup=btns;
		blockerbot.sendMessage(msg.from.id,(user.username||user.chatid),{markup});
	})
}
,
commentread:function(msg){
				var params=msg.data.split('-')
				usermodel.findOne({comments:{$elemMatch: {_id:new mongoose.Types.ObjectId(params[1])}}}, function (err,user) {
for(mi=0;mi<user.comments.length;mi++){
					if(user.comments[mi]['_id']==params[1]){
mesg=user.comments[mi].message;
user.comments[mi].status="read"
		user.save();
break;
					}

}
markup=varM.markups.comment;
					bot.sendMessage(user.chatid,"نظر شما توسط مدیر خوانده شد",{markup});
					blockerbot.sendMessage(msg.from.id,(user.username?"@"+user.username:user.chatid)+"\r\n"+mesg);
})
},
sendmessage:function(msg){
 //   console.log(msg)
//  chatid:{ $in :adminids }
            usermodel.find({},function(err,users){
                //    console.log(err,users)

var fn = function asyncMultiplyBy2(v){ // sample async action
    return new Promise(resolve => setTimeout(() => {
        markup=varM.markups.comment;
                  if(!myobjects[v].msg['forward_from_chat']){
             if (myobjects[v].msg.photo)
              bot.sendPhoto(myobjects[v].chatid, myobjects[v].msg.photo[0]['file_id'], {markup:markup,caption: myobjects[v].msg.caption}).then(res=>resolve(new Date()));
        else if (myobjects[v].msg.audio)
              bot.sendAudio(myobjects[v].chatid, myobjects[v].msg.audio['file_id'], {markup:markup,caption: myobjects[v].msg.caption}).then(res=>resolve(new Date()));
        else if (myobjects[v].msg.video)
              bot.sendVideo(myobjects[v].chatid, myobjects[v].msg.video['file_id'], {markup:markup,caption: myobjects[v].msg.caption}).then(res=>resolve(new Date()));
        else if (myobjects[v].msg.document)
             blockerbot.sendDocument(myobjects[v].chatid, myobjects[v].msg.document['file_id'], {markup:markup,caption: myobjects[v].msg.caption}).then(res=>resolve(new Date()));
        else if (myobjects[v].msg.text)
              bot.sendMessage(myobjects[v].chatid, myobjects[v].msg.text,{markup:markup}).then(res=>resolve(new Date()))
                  }
                  else {
                                           bot.forwardMessage(myobjects[v].chatid,myobjects[v].msg['forward_from_chat'].id,myobjects[v].msg.forward_from_message_id).then(res=>resolve(myobjects[v]));
                  }

    }, 50));
};
 global.myobjects=[];
 array=[];
 for(i=0;i<users.length;i++){
    // console.log(users[i].chatid)
     myobjects.push({
         chatid:users[i].chatid,
         msg:msg
     })
     array.push(i);
 }

var actions = array.map(fn);


var results = Promise.all(actions); // pass array of promises

results.then(data =>{
  //  console.log(data)
                  return blockerbot.sendMessage(msg.from.id, "ارسال شد")

})
	});
}
}
