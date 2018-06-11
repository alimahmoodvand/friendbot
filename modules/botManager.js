module.exports={
	start:function(){
		bot.on(['/start'],  (msg) => {
		  //  console.log(msg)
		  // usermodel.remove({chatid:msg.from.id},function(err,user){})
		  var cmt=bot.keyboard([
        ['ارسال نظر']
], {resize: true});
		    usermodel.findOne({chatid:msg.from.id},function(err,user){
		        if(!user){
		             m = new usermodel;
        		    m.chatid=msg.from.id;
        		    m.username=msg.from.username;
        		    m.create=new Date().getTime();
        		    m.countofused=0;
        		    m.countofnotice=0;
        		    m.limitused=1;
        		    m.limitfriends=10;
        		    m.status="ok";
        		    m.link="https://t.me/"+varM.consts.botname+"?start="+msg.from.id;
        		    m.save()
        		    user=m;
		        }
		     //   console.log(user);
		        if(true || user.countofused<user.limitused || user.invited.length>=user.limitfriends)
		        {
		            if(user.status!="blocked"){
		                var number =msg.text.replace('/start','').trim();
            //  console.log(number,!isNaN(number));
                    if(!isNaN(number)){
                        number=number.trim()
                        		    usermodel.findOne({chatid:number},function(err,target){
                        		        usermodel.findOne({invited:msg.from.id},function(err,invited){
                        		    //    console.log(target)
                        		       
                        		           if(target && target.invited.indexOf(number)==-1&&msg.from.id!=number)
		        {
		            if(!invited){
		            target.invited.push(msg.from.id);
		            target.save();
		           // console.log(target,target.invited.length,target.limitfriends,target.invited.length==target.limitfriends)
		            if( target.invited.length==target.limitfriends){
		                                     bot.sendMessage(target.chatid,varM.msg.invitedpass,{notification:true});
		            }
		            }
                        		      // else{
                        		      //     		                                     bot.sendMessage(msg.from.id,varM.msg.beforefriend);
                        		      // }
		        }
		        markup=cmt;
                    return bot.sendMessage(msg.from.id, varM.msg.welcome ,{markup,notification:true});
                        		      
                        		      
                        		        }) 
                        		        
                        		    })
                    }
                    else{
                        		        markup=cmt;
                    return bot.sendMessage(msg.from.id,varM.msg.welcome ,{markup,notification:true});
                    }
		            }
		            else{
		                  return bot.sendMessage(msg.from.id,varM.msg.blocked ,{markup:'hide',notification:true});
		            }
                }
                else{
    markup=[blockerbot.inlineButton(`عضویت در کانال عکس پروفایل`, {url:  "https://telegram.me/joinchat/BSdaojwyZ2OcY0RRo4h06A"})];
                                        markup=blockerbot.inlineKeyboard([markup])

                    		return bot.sendMessage(msg.from.id,varM.msg.link.replace('~link',user.link).replace('~count',user.invited.length) ,{markup,notification:true});
                }
		    })
		});
		bot.on('*',function(msg,data){

		  var cancel=bot.keyboard([
        ['انصراف']
], {resize: true});
		//    	console.log(msg)
			if(msg.photo||msg.document) {
			     usermodel.findOne({chatid:msg.from.id},function(err,user){
			         //console.log(adminids.indexOf(msg.from.id),)
if(user){			         
if(
    adminids.indexOf(msg.from.id)!=-1||
    user.countofused<user.limitused || user.invited.length>=user.limitfriends
    ){
  if(user.status!="blocked"){
    //console.log("msg",msg.text=="use profile photo")
//   bot.getUserProfilePhotos(msg.from.id, {offset:0, limit:1}).then(function (profile) {
//   if(msg.text=="use profile photo"){
//      //  console.log(profile.result)
//      fileid="";
//       if(profile.result.total_count==1)
//             fileid=profile.result.photos[0][2].file_id
//         else
//             return bot.sendMessage(msg.from.id, `not exist profile photo `,{ markup: markup});
//   }
//   else
   {
          fileid=(msg.photo?msg.photo[2]['file_id']:msg.document['file_id']);
   }
   console.log(fileid)
   
                	bot.getFile(
              fileid
                	).then(function (info) {
                	 //   console.log(info)
                url="https://api.telegram.org/file/bot"+token+"/"+info['file_path'];
                // if(msg.document){
                    if(!utilM.isImage(info['fileLink'])){
                        return;
                    }
                // }
                console.log(url)
                                fileName="img/"+new Date().getTime()+"."+url.split('.').pop()
                               
                utilM.download(url,fileName,function () {
                     markup=[
                                    blockerbot.inlineButton(`notice(${user.countofnotice})`, {callback:  "notice-" + msg.from.id+"-"+msg.message_id}),
                                    blockerbot.inlineButton(`blocked`, {callback: "blocked-" + msg.from.id+"-"+msg.message_id})
                                    ];
                                    markup=blockerbot.inlineKeyboard([markup])
                                    for(i=0;i<adminids.length;i++)
 blockerbot.sendPhoto(adminids[i],"http://raz-network.ir/imgbot/"+fileName, {markup: markup })
                    markup=utilM.btnInline(fileName);
                    // console.log(msg.from.id,"http://raz-network.ir/imgbot/"+fileName, {
                    //     markup: markup,
                    //     replyToMessage: msg.message_id
                    // });
                        user.countofused++;
    user.save();
                    return bot.sendPhoto(msg.from.id,"http://raz-network.ir/imgbot/"+fileName, {
                        markup: markup,
                        caption:varM.msg.caption.replace('~botname',varM.consts.botname),
                        replyToMessage: msg.message_id
                    })
                })
                	})
//   })
}
 else{
		                  return bot.sendMessage(msg.from.id,varM.msg.blocked ,{markup:'hide'});
		            }
}
else{
    markup=[blockerbot.inlineButton(`عضویت در کانال عکس پروفایل`, {url:  "https://telegram.me/joinchat/BSdaojwyZ2OcY0RRo4h06A"})];
                                        markup=blockerbot.inlineKeyboard([markup])

                    		return bot.sendMessage(msg.from.id,varM.msg.link.replace('~link',user.link).replace('~count',user.invited.length) ,{markup});
}
}
			     });
            }
            else if(msg.text=="ارسال نظر'"){
                markup=cancel;
               return bot.sendMessage(msg.from.id,varM.msg.comment,{markup,ask:'comment'});
            }
		})
		bot.ask('comment',msg => {
		    			     usermodel.findOne({chatid:msg.from.id},function(err,user){
			         //console.log(adminids.indexOf(msg.from.id),)
if(user){			         
if(
    adminids.indexOf(msg.from.id)!=-1||
    user.countofused<user.limitused || user.invited.length>=user.limitfriends
    ){
  if(user.status!="blocked"){
      if(msg.text!=""){
          user.comments.push(msg.text);
      }
      markup=cmt;
                     return bot.sendMessage(msg.from.id,varM.msg.done,{markup});
}
 else{
		                  return bot.sendMessage(msg.from.id,varM.msg.blocked ,{markup:'hide'});
		            }
}
else{
    markup=[blockerbot.inlineButton(`عضویت در کانال عکس پروفایل`, {url:  "https://telegram.me/joinchat/BSdaojwyZ2OcY0RRo4h06A"})];
                                        markup=blockerbot.inlineKeyboard([markup])

                    		return bot.sendMessage(msg.from.id,varM.msg.link.replace('~link',user.link).replace('~count',user.invited.length) ,{markup});
}
}
			     });
		})
        bot.on('callbackQuery', msg => {
        	var params=msg.data.split('-');
        	  markup=utilM.btnInline(params[1]);
        	 var interval=null;
        	  this.dot=1;
        	    var that=this;
        	   bot.sendMessage(msg.from.id,varM.msg.loading).then(function(re){
        	    //   console.log(re)
        	       interval=setInterval(
        	          function (){
        	              chatId=re.result.chat.id
        	              messageId=re.result['message_id'] 
        	              if(that.dot>=5){
        	                  that.dot=0;
        	              }
        	         bot.editText(
		 { chatId,messageId }, varM.msg.loading+(Array(++that.dot).join(".")).toString(),
		 {}
		).catch(error => console.log('Error:', error));
        	   },1000)
        	   })
        	if(cloadbinMethods.indexOf(params[0])==-1){
        xml=imgM[params[0]](fileUrl+params[1]);
        hash=crypto.createHmac('sha1', key).update(xml).digest('hex');
           requestM.getRequestId(hash,xml,function(url) {
           //   fs.unlinkSync(fileName)
           //  console.log(msg.from.id,url,markup,msg.id);
         //  ['chat_id', 'message_id']
           
         //  bot.deleteMessage(msg.from.id,messageid)
        // console.log(bot)
        //   .then(function(re){
        // 	      console.log(re,messageid)
        // 	   })
        clearInterval(interval);
           if(utilM.isImage(url)){
               return bot.sendPhoto(msg.from.id,url,{
                   markup: markup,
                                           caption:varM.msg.caption.replace('~botname',varM.consts.botname),
                   replyToMessage: msg.id
               })
           }
           else{
                return bot.sendPhoto(msg.from.id,fileUrl+params[1],{
                   markup: markup,
                   caption:varM.msg.error,
                   replyToMessage: msg.id
               })
           }
           })
        	}
        	else{
        	    console.log(msg.data);
           cbM[params[0]](fileUrl+params[1],function(url) {
           //   fs.unlinkSync(fileName)
           //  console.log(msg.from.id,url,markup,msg.id);
               return bot.sendPhoto(msg.from.id,url,{
                   markup: markup,
                                           caption:varM.msg.caption.replace('~botname',varM.consts.botname),
                   replyToMessage: msg.id
               })
           })
        	}
        })
        			blockerbot.on(['/start'],  (msg) => {
        			      usermodel.find({},function(err,users){
        			    //      for(i=0;i<adminids.length;i++)
   blockerbot.sendMessage(msg.from.id,users.length)
        			      });
        			})
        				blockerbot.on(['/hello'],  (msg) => {
        			      usermodel.find({},function(err,users){
        			          text="";
        			            for(i=0;i<users.length;i++){
        			                text+=users[i].username?"@"+users[i].username+"\r\n":"";
        			            }
        			       //   for(i=0;i<adminids.length;i++)
   blockerbot.sendMessage(msg.from.id,text)
        			      });
        			})
		  
          blockerbot.on('callbackQuery', msg => {
        	var params=msg.data.split('-');
              console.log(params)
              usermodel.findOne({chatid:params[1]},function(err,user){
                   let reply = params[2];
                  if(params[0]=="blocked"){
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
          })
		blockerbot.connect();
		bot.connect();

	}
}