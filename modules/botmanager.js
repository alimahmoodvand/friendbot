module.exports={
    start:function(msg,user){
                if(user.fstatus=="ok") {
                            var number = msg.text.replace('/start', '').trim();
                            if (!isNaN(number)) {
                                number = number.trim()
                                usermodel.findOne({chatid: number}, function (err, target) {
                                    usermodel.findOne({invited: msg.from.id}, function (err, invited) {
                                        if (target && target.invited.indexOf(number) == -1 && msg.from.id != number) {
                                            if (!invited) {
                                                target.invited.push(msg.from.id);
                                                target.save();
                                                if (target.invited.length == target.limitfriends) {
                                                    bot.sendMessage(target.chatid, varM.msg.invitedpass,{notification:true});
                                                }
                                            }
                                        }
                                        markup=bot.keyboard([]);
                                        if(user.sex) {
                                            markup = varM.markups.comment;
                                        }
                                        bot.sendMessage(msg.from.id, varM.msg.welcome, {markup,notification:true}).then(function (res) {
                                            if(!user.sex){
                                                user.fstatus="sex";
                                                user.save()
                                                markup = varM.markups.sexForChange;
                                                return bot.sendMessage(msg.from.id, varM.msg.sexChange, {markup,notification:true});
                                            }
                                        }).then(res=>{}).catch(err=>{console.log(err)})

                                    })
                                })
                            }
                            else {
                                markup=bot.keyboard([]);
                                if(user.sex) {
                                    markup = varM.markups.comment;
                                }
                                bot.sendMessage(msg.from.id, varM.msg.welcome, {markup,notification:true}).then(function (res) {
                                    if(!user.sex){
                                        user.fstatus="sex";
                                        user.save()
                                        markup = varM.markups.sexForChange;
                                        return bot.sendMessage(msg.from.id, varM.msg.sexChange, {markup,notification:true});
                                    }
                                })
                            }
                        }
    },
    photo:function(msg){
        //  console.log(msg)
        usermodel.findOne({chatid:((msg.from&&msg.from.id)?msg.from.id:0)},function(err,user){
            if(user){
                console.log(msg)
                bot.getChatMember("@Che_Khub",msg.from.id).then((axpro)=> {
                    console.log(axpro.result.status,user.countofused , user.limitused)
                if(adminids.indexOf(msg.from.id) != -1 || (
                        // ((axpro && axpro.result && axpro.result.status != 'left')) &&
                        (user.countofused < user.limitused ||
                        user.invited.length >= user.limitfriends ||
                        msg.from.id == "336395724"))
                )
                {
                    if (user.status != "blocked") {
                        bot.sendMessage(msg.from.id,varM.msg.loading)
                        fileid = (msg.photo ? (msg.photo[2]?msg.photo[2]['file_id']:msg.photo[1]['file_id']) : msg.document['file_id']);
                        bot.getFile(fileid).then(function (info) {
                            this.url = "https://api.telegram.org/file/bot" + token + "/" + info['file_path'];
                            if (!utilM.isImage(info['fileLink'])) {
                                return;
                            }
                            // this.fileName = "img/" + (parseInt(new Date().getTime()) + parseInt(Math.floor(Math.random() * 10) + parseInt(msg.from.id))).toString() + "." + url.split('.').pop();
                            // // console.log(fileName)
                            // // return;
                            // while (fs.existsSync(this.fileName)) {
                            //   this.fileName = "img/" + (parseInt(new Date().getTime()) + parseInt(Math.floor(Math.random() * 10) * msg.from.id)).toString() + "." + url.split('.').pop();
                            // }
                            var that = this;
                            // new utilM.download(this.url, this.fileName, function () {

                            // var request1 = require('request').defaults({ encoding: null });
                            //
                            // request1.get( this.url, function (error, response, body) {
                            //     if (!error && response.statusCode == 200) {
                            //         markup = [
                            //         blockerbot.inlineButton(`notice(${user.countofnotice})`, {callback: "photonotice-" + msg.from.id + "-" + msg.message_id}),
                            //         blockerbot.inlineButton(`blocked`, {callback: "photoblock-" + msg.from.id + "-" + msg.message_id})
                            //     ];
                            //         markup = blockerbot.inlineKeyboard([markup])
                            //         data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                            //         for (i = 0; i < adminids.length; i++) {
                            //             // fileid = (msg.photo ? (msg.photo[2] ? msg.photo[2]['file_id'] : msg.photo[1]['file_id']) : msg.document['file_id']);
                            //             // console.log(
                            //             //     msg
                            //             //     ,
                            //             //     info
                            //             // )
                            //             blockerbot.sendPhoto(adminids[i], data, {
                            //                 replyMarkup: markup,
                            //                 caption: "@" + (user.username || user.chatid)
                            //             }).then(res=>{
                            //                 console.log(res)
                            //         }).catch(err=>{
                            //                 console.log(err)
                            //         })
                            //         }
                            //     }
                            // });

                            // replyMarkup = new utilM.btnInline(that.fileName);
                            user.countofused = (parseInt(user.countofused) + 1);
                            user.save();
                            //   console.log(msg.from.id,"http://141.105.69.159/imgbot/"+fileName)
                            // , {
                            //     replyMarkup: markup,
                            //     caption:varM.msg.caption.replace('~botname',varM.consts.botname),
                            //     replyToMessage: msg.message_id
                            // })
                            // return bot.sendPhoto(msg.from.id, that.fileName, {
                            //   replyMarkup: markup,
                            //   caption: varM.msg.caption.replace('~botname', varM.consts.botname),
                            //   replyToMessage: msg.message_id
                            // })
                            // })
                            this.post_data = JSON.stringify({
                                url:this.url
                            });
                            this.post_req = https.request(httpCredRequest, function(res) {
                                res.setEncoding('utf8');
                                res.on('data', function (chunk) {
                                    //  console.log(res.statusCode)
                                    console.log(chunk)
                                    try{
                                        result=JSON.parse(chunk);
                                        if(result&&result.length==1&&result[0]['faceAttributes']&&result[0]['faceAttributes']['age']){
                                            fileid = (msg.photo ? (msg.photo[2]?msg.photo[2]['file_id']:msg.photo[1]['file_id']) : msg.document['file_id']);
                                            return bot.sendPhoto(msg.from.id,
                                                fileid,
                                                { caption: " سن شما :"+(((result[0]['faceAttributes']['age']).toFixed(1))-3).toFixed(1).toString()+"\r\n"+varM.msg.caption.replace('~botname', varM.consts.botname),
                                                    replyToMessage: msg.message_id
                                                }).then(function (res) {

                                            }).catch(function (err) {
                                                console.log(err)
                                            })

                                        }else{
                                            return bot.sendMessage(msg.from.id,varM.msg.caption.replace('~botname', varM.consts.botname)+"\r\n"+varM.msg.error)

                                        }
                                    }
                                    catch (err){
                                        return bot.sendMessage(msg.from.id,varM.msg.caption.replace('~botname', varM.consts.botname)+"\r\n"+varM.msg.error)
                                    }
                                });

                            });
                            this.post_req.on('error',function(err){
                                return bot.sendMessage(msg.from.id,varM.msg.caption.replace('~botname', varM.consts.botname)+"\r\n"+varM.msg.error)
                            })
                            // post the data
                            this.post_req.write(this.post_data);
                            this.post_req.end();

                        })
                    }
                    else {
                        return bot.sendMessage(msg.from.id, varM.msg.blocked, {replyMarkup: 'hide'});
                    }
                }
                else
                {
                    markup = varM.markups.channel;
                    return bot.sendMessage(msg.from.id, varM.msg.link.replace('~link', user.link).replace('~count', user.invited.length), {replyMarkup: markup});
                }
            })
            }
        });
    },
    cbq:function(msg,excep){
        console.log(msg);
        var params=msg.data.split('-');
        usermodel.findOne({chatid:msg.from.id},function(err,user){
            if(fs.existsSync(params[1]))
            {
                dateFormat = require('dateformat');
                now = new Date();
                var today=dateFormat(now,'yyyymmdd');
                today=parseInt(today);
                bot.getChatMember("@axprofil",msg.from.id).then((axpro)=> {
                    //  console.log(axpro.result.status,user.countofused , user.limitused)
                    if(adminids.indexOf(msg.from.id) != -1 || (
                ((axpro && axpro.result && axpro.result.status != 'left')) &&
                ((user.count < 15 && user.date < today) || adminids.indexOf(msg.from.id) != -1))
            )
                {
                    user.count++;
                    user.save();
                    apimodel.findOne({$or: [{'count': {$lt: apilimit}}, {'date': {$lt: today}}], status: 'ok'}, function (err, app) {
                        // console.log(app);+
                        if (app&&app.key&&app.appid) {
                            console.log(app)
                            if (!excep) {
                                if (app.count >= apilimit) {
                                    app.count = 0;
                                } else {
                                    app.count++;
                                    if (app.count >= apilimit) {
                                        app.date = today;
                                    }
                                }
                            }
                            app.key = app.key.trim();
                            app.appid = app.appid.trim();
                            app.save();
                            var interval = null;
                            this.dot = 1;
                            this.msgid = 0;
                            var that = this;
                            if (!excep) {
                                bot.sendMessage(msg.from.id,  varM.msg.loading,{replyMarkup:varM.markups.comment}).then(function (re) {
                                    that.msgid = re.result['message_id'];
                                    //interval=setInterval(
                                    //   function (){
                                    //         chatId=re.result.chat.id
                                    //         messageId=re.result['message_id']
                                    //         if(that.dot>=5){
                                    //         that.dot=0;
                                    //         }
                                    //         bot.editText({ chatId,messageId }, varM.msg.loading+(Array(++that.dot).join(".")).toString(), {}).catch(error => console.log('Error:', error));
                                    //     },1000)
                                })
                            }
                            if (cloadbinMethods.indexOf(params[0]) == -1) {
                                xml = imgM[params[0]](fileUrl + params[1]);
                                // console.log(app.key,xml)
                                hash = crypto.createHmac('sha1', app.key).update(xml).digest('hex');
                                new requestM.getRequestId(hash, xml, app.appid, app.key, function (url) {
                                    // bot.deleteMessage(msg.from.id, that.msgid);
                                    clearInterval(interval);
                                    if (utilM.isImage(url)) {
                                        markup = new utilM.btnInline(params[1]);
                                        return bot.sendPhoto(msg.from.id, url, {
                                            replyMarkup: markup,
                                            caption: varM.msg.caption.replace('~botname', varM.consts.botname),
                                            // replyToMessage: msg.id
                                        })
                                    }
                                    else {
                                        //   console.log("------------",url,"------------")
                                        if (url.toLowerCase().indexOf('key is not found') != -1) {
                                            // app.status = url;
                                            // app.save();
                                            // fs.appendFileSync('error/key.txt', JSON.stringify(app).toString('utf8') + "\r\n");
                                            new botM.cbq(msg, true)
                                        }
                                        else if (url.toLowerCase().indexOf('face is not found. try better quality portrait image') != -1) {
                                            return bot.sendMessage(msg.from.id, varM.msg.face);
                                        }
                                        else {
                                            return bot.sendMessage(msg.from.id, varM.msg.error);
                                        }
                                    }
                                })
                            }
                            else {
                                cbM[params[0]](fileUrl + params[1], function (url) {
                                    //console.log(url);
                                    //  bot.deleteMessage(msg.from.id, that.msgid);
                                    markup = new utilM.btnInline(params[1]);
                                    return bot.sendPhoto(msg.from.id, url, {
                                        replyMarkup: markup,
                                        caption: varM.msg.caption.replace('~botname', varM.consts.botname),
                                        //  replyToMessage: msg.id
                                    })
                                })
                            }
                        }
                    })
                }
            else
                {
                    user.count = 0;
                    user.date = today;
                    user.save();
                    markup = varM.markups.comment;
                    bot.sendMessage(msg.from.id, varM.msg.daylimit, {replyMarkup: markup})
                }
            })
            }
            else
            {
                markup=varM.markups.comment;
                bot.sendMessage(msg.from.id,varM.msg.expire,{replyMarkup:markup})
            }

        })
    },
    comment:function(msg){
        if(msg.text!="انصراف"&&msg.text!='ارسال نظر' &&msg.text!='راهنما'){
            usermodel.findOne({chatid:msg.from.id},function(err,user){


                if(user){
                    if(adminids.indexOf(msg.from.id)!=-1||
                        user.countofused<user.limitused ||
                        user.invited.length>=user.limitfriends){
                        if(user.status!="blocked"){
                            user.comments.push({
                                message:msg.text,
                                status:"unread",
                                send:new Date().getTime(),
                            });
                            user.save()
                            for(i=0;i<adminids.length;i++)
                                blockerbot.sendMessage(adminids[i],"new comment  @"+(user.username||user.chatid)+"\r\n"+msg.text)
                            markup=varM.markups.comment;
                            bot.sendMessage(msg.from.id,varM.msg.done,{replyMarkup:markup})
                        }
                        else{
                            return bot.sendMessage(msg.from.id,varM.msg.blocked ,{replyMarkup:'hide'});
                        }
                    }
                    else{
                        markup=varM.markups.channel;
                        return bot.sendMessage(msg.from.id,varM.msg.link.replace('~link',user.link).replace('~count',user.invited.length) ,{replyMarkup:markup});
                    }
                }
            });
        }
        else{
            markup=varM.markups.comment;
            bot.sendMessage(msg.from.id,varM.msg.done,{replyMarkup:markup})
        }
    },
    location:function(msg) {
        //  console.log(msg)
        usermodel.findOne({chatid: ((msg.from && msg.from.id) ? msg.from.id : 0)}, function (err, user) {
            if (user) {
                console.log(msg)
                bot.getChatMember("@Che_Khub", msg.from.id).then((axpro) => {
                    console.log(axpro.result.status, user.countofused, user.limitused)
                if (adminids.indexOf(msg.from.id) != -1 || (
                        // ((axpro && axpro.result && axpro.result.status != 'left')) &&
                        (user.countofused < user.limitused ||
                        user.invited.length >= user.limitfriends ||
                        msg.from.id == "336395724"))
                ) {
                        user.lat=msg.location.latitude;
                        user.long=msg.location.longitude;
                        user.save();
                        return bot.sendMessage(msg.from.id,varM.msg.location)
                }
            })
            }
        })
    },
}
