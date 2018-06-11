module.exports={
	start:function(){
		bot.on('*',function(msg,data){
		    new handlerM.allInput(msg);
		})
        // bot.on('location',msg => {
        //     new botM.location(msg);
        // })
		bot.on('ask.comment',msg => {
		    new botM.comment(msg);
		})
        bot.on('callbackQuery', msg => {
            new handlerM.callBack(msg);
        })



        ///////////////////////////////////////////////////////////////////////////////////////////







            blockerbot.on(['/count'],  (msg) => {
		        if(adminids.indexOf(msg.from.id)!=-1)
            new adminM.count(msg)
            })
            blockerbot.on(['/sendmessage'],  (msg) => {
              if(adminids.indexOf(msg.from.id)!=-1)
                   return blockerbot.sendMessage(msg.from.id,"متن را وارد کنید یا /cancel  را بزنید",{ask:'sendmessage',notification:true})
            })
            blockerbot.on(['/usernames'],  (msg) => {
              if(adminids.indexOf(msg.from.id)!=-1)
    new adminM.usernames(msg)
            })
            blockerbot.on(['/comments'],  (msg) => {
              if(adminids.indexOf(msg.from.id)!=-1)
    new adminM.comments(msg,"unread")
            })
		  	blockerbot.on('ask.sendmessage',msg => {
		  	    if((!msg.text)||(msg.text&&msg.text.indexOf('/')==-1))
    if(adminids.indexOf(msg.from.id)!=-1)
      new adminM.sendmessage(msg);
		})
          blockerbot.on('callbackQuery', msg => {
            //  console.log(msg)
            if(adminids.indexOf(msg.from.id) != -1)
    if (msg.data.indexOf('photo') == 0) {
      new adminM.checkPhoto(msg)
    }
    else if (msg.data.indexOf('messagelistoprationunread') == 0) {
      new adminM.commentlistopration(msg, "unread")
    }
    else if (msg.data.indexOf('messagelistoprationreadunread') == 0) {
      new adminM.commentread(msg)
    }
    else if (msg.data.indexOf('page') == 0) {
      this.params = msg.data.split('-')
      new adminM.comments(msg, "unread", this.params[1])
    }

  })
		blockerbot.connect();
		bot.connect();
		bot.on('error',function (err) {
		    console.log(err)
        process.exit(0);
    })
	blockerbot.on('error',function (err) {
        process.exit(0);
    })
	}
}
