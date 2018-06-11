module.exports={
    allInput:function(msg){
        console.log(msg)
        // if(msg.text&&msg.text.indexOf('delete')!=-1){
        //     usermodel.remove({},function (err,res) {
        //         console.log(res.result,err)
        //     })
        //     return;
        // }
        if(msg.from&&msg.from.id) {
            usermodel.findOne({chatid: msg.from.id}, function (err, user) {
                if(!user){
                    m = new usermodel;
                    m.chatid=msg.from.id;
                    m.username=msg.from.username;
                    m.create=new Date().getTime();
                    m.countofused=0;
                    m.countofnotice=0;
                    m.limitused=1;
                    m.limitfriends=5;
                    m.status="ok";
                    m.fstatus="ok";
                    m.name=(msg.from.first_name?msg.from.first_name+" ":"")+(msg.from.last_name?msg.from.last_name:"");
                    m.link="https://t.me/"+varM.consts.botname+"?start="+msg.from.id;
                    m.save()
                    user=m;
                }
                console.log(user)
                bot.getChatMember("@golkuchic", msg.from.id).then(function(axpro) {
                //    console.log(axpro.result.status, user.countofused, user.limitused,adminids.indexOf(msg.from.id))
                    if (adminids.indexOf(msg.from.id) != -1 || user.countofused < user.limitused||(
                            (
                            (axpro && axpro.result && axpro.result.status != 'left') ||
                            user.countofused < user.limitused) &&
                            ( user.countofused < user.limitused || user.invited.length >= user.limitfriends)
                        )) {
                        if (user.status != "blocked") {
                            if (user.fstatus == 'ok'&&msg.text) {
                                if (msg.text == "ارسال نظر") {
                                    markup = varM.markups.cancel;
                                    return bot.sendMessage(msg.from.id, varM.msg.comment, {markup, ask: 'comment',notification:true});
                                }
                                else if (msg.text == "راهنما") {
                                    markup = varM.markups.comment;
                                    return bot.sendMessage(msg.from.id, varM.msg.help, {markup,notification:true});
                                }
                                else if (msg.text == "جستوجو") {
                                    // if(user.age) {
                                    //     markup = varM.markups.ageForSearch;
                                    //     return bot.sendMessage(msg.from.id, varM.msg.ageSearch, {markup});
                                    // }
                                    // else
                                    {
                                        markup = varM.markups.sexForSearch;
                                        return bot.sendMessage(msg.from.id,varM.msg.search, {markup,notification:true});
                                    }
                                }
                                else if (msg.text == "تغییر جنسیت") {
                                    user.fstatus="sex";
                                    user.save(function (err) {
                                        markup = varM.markups.sexForChange;
                                        return bot.sendMessage(msg.from.id, varM.msg.sexChange, {markup,notification:true});
                                    })
                                }
                                else if (msg.text == "تغییر شهر") {
                                    user.fstatus="city";
                                    user.save(function (err) {
                                        markup = varM.markups.cancelCity;
                                        return bot.sendMessage(msg.from.id, varM.msg.cityChange, {markup,notification:true});
                                    })
                                }
                                else if (msg.text == "تغییر عکس") {
                                    user.fstatus="photo";
                                    user.save(function (err) {
                                        markup = varM.markups.cancelPhoto;
                                        return bot.sendMessage(msg.from.id, varM.msg.photoChange, {markup,notification:true});
                                    })
                                }
                                else if (msg.text == "تغییر سن") {
                                    user.fstatus="age";
                                    user.save(function (err) {
                                        this.ageBtns = [];
                                        this.ageBtns.push([bot.inlineButton('پایین تر از 16', {callback: "age-15"})])
                                        this.rowTmp = [];
                                        for (this.ai = 16; this.ai < 41; this.ai++) {
                                            this.rowTmp.push(bot.inlineButton(this.ai + "سال", {callback: "age-" + this.ai}))
                                            if (this.rowTmp.length == 4) {
                                                this.ageBtns.push(this.rowTmp)
                                                this.rowTmp = [];
                                            }
                                        }
                                        this.ageBtns.push([bot.inlineButton('بالاتر از 40', {callback: "age-40"})])
                                        markup = bot.inlineKeyboard(this.ageBtns);
                                        return bot.sendMessage(msg.from.id, varM.msg.ageChange, {markup,notification:true});
                                    })
                                }
                                else if (msg.text == "بلاکی ها") {
                                    new utilM.findBlUsers(msg,user,true);
                                }
                                else if (msg.text.indexOf("/start")==0) {
                                    new botM.start(msg, user)
                                }
                            }
                            else if (user.fstatus == "connect") {

                                if (msg.text != "انصراف از چت"&&msg.text != "بلاک کردن") {
                                    new chatM.connect(msg, user)
                                }
                                else if(msg.text != "بلاک کردن") {
                                    new chatM.disconnect(msg, user)
                                }
                                else{
                                    new chatM.addToBlackList(msg, user)
                                }
                            }
                            else if ((user.fstatus == "search"||user.fstatus == "verify"||user.fstatus == "verified")&&msg.text) {
                                if (msg.text == "انصراف از جستوجو") {
                                    new chatM.cancelSerching(msg, user)
                                }
                            }
                            else if (user.fstatus == "city") {

                                if (msg.text != "انصراف از تغییر شهر") {
                                    user.fstatus="ok";
                                    user.city=msg.text;
                                    user.save(function (err) {
                                        markup = varM.markups.comment;
                                        bot.sendMessage(msg.from.id, varM.msg.cityChanged, {markup,notification:true});
                                    })
                                }
                                else {
                                    user.fstatus="ok";
                                    user.save(function (err) {
                                        markup = varM.markups.comment;
                                        bot.sendMessage(msg.from.id, varM.msg.canceled, {markup,notification:true});
                                    })
                                }
                            }
                            else if (user.fstatus == "photo") {

                                if (msg.text != "انصراف از تغییر عکس" &&
                                    (msg.photo/*||
                                    (msg.document&&msg.document.mime_type&&msg.document.mime_type.indexOf('image')!=-1)*/)) {
                                    user.fstatus="ok";
                                   // if(msg.photo)
                                        this.fileid = (msg.photo ? (msg.photo[2]?msg.photo[2]['file_id']:msg.photo[1]['file_id']) : msg.document['file_id']);
                                  //  else
                                     //   this.fileid=msg.document['file_id'];
                                    user.photo=this.fileid;

                                    user.save(function (err) {
                                        markup = varM.markups.comment;

                                        bot.sendMessage(msg.from.id, varM.msg.photoChanged, {markup,notification:true});
                                        //if(msg.photo)
                                            this.fileid = (msg.photo ? (msg.photo[2]?msg.photo[2]['file_id']:msg.photo[1]['file_id']) : msg.document['file_id']);
                                       // else
                                         //   this.fileid=msg.document['file_id'];
                                        new utilM.sendPhoto(msg, user, this.fileid);
                                    })
                                }
                                else if (msg.text == "انصراف از تغییر عکس" ) {
                                    user.fstatus="ok";
                                    user.save(function (err) {
                                        markup = varM.markups.comment;
                                        bot.sendMessage(msg.from.id, varM.msg.canceled, {markup,notification:true});
                                    })
                                }
                            }
                        }
                        else {
                            return bot.sendMessage(msg.from.id, varM.msg.blocked, {markup: 'hide',notification:true});
                        }
                    }
                    else {
                        markup = varM.markups.channel;
                        return bot.sendMessage(msg.from.id, varM.msg.link.replace('~link', user.link).replace('~count', user.invited.length), {markup,notification:true});
                    }
                })
            });
        }
    },
    callBack:function(msg){
        if(msg.from&&msg.from.id)
        {
            console.log( msg.data.split('-'))
            usermodel.findOne({chatid: msg.from.id}, function (err, user) {
                console.log(user)
                bot.getChatMember("@Che_Khub", msg.from.id).then(function (axpro) {
            //        console.log(axpro.result.status, user.countofused, user.limitused)
                    if (adminids.indexOf(msg.from.id) != -1 || user.countofused < user.limitused|| (
                            (
                            (axpro && axpro.result && axpro.result.status != 'left') ||
                            user.countofused < user.limitused) &&
                            ( user.countofused < user.limitused || user.invited.length >= user.limitfriends)
                        )) {
                        if (user.status != "blocked") {

                            if (msg.data.indexOf('sexc-') == 0 && user.fstatus == "sex") {
                                new cbqM.sexChange(msg, user, msg.data.split('-'))
                            }
                            else if (msg.data.indexOf('sexs-') == 0) {
                                new cbqM.sexSearch(msg, user, msg.data.split('-'))
                            }
                            else if (msg.data.indexOf('bl-') == 0) {
                                new cbqM.changeBlackList(msg, user, msg.data.split('-'))
                            }
                            else if (msg.data.indexOf('ages-') == 0) {
                                new cbqM.ageSearch(msg, user, msg.data.split('-'))
                            }
                            else if (msg.data.indexOf('age-') == 0 && user.fstatus == "age") {
                                new cbqM.ageChange(msg, user, msg.data.split('-'))
                            }
                            else if (msg.data.indexOf('connect-') == 0 && user.fstatus == "verify") {
                                new cbqM.connectChange(msg, user, msg.data.split('-'))
                            }
                            else if (msg.data.indexOf('waiting-deny') == 0 && user.fstatus == "verified") {
                                new cbqM.disconnect(msg, user, msg.data.split('-'))
                            }
                        }
                        else {
                            return bot.sendMessage(msg.from.id, varM.msg.blocked, {markup: 'hide',notification:true});
                        }
                    }
                    else {
                        markup = varM.markups.channel;
                        return bot.sendMessage(msg.from.id, varM.msg.link.replace('~link', user.link).replace('~count', user.invited.length), {markup,notification:true});
                    }
                })
            })
        }
    },
}
