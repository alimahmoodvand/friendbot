/**
 * Created by PAYA on 5/30/2017.
 */
module.exports= {
    download: function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    },
    btnInline: function (url) {
        btns = [];
        funclist = Object.keys(cbM);
        //  console.log(funclist.indexOf('xml'));
        // if(funclist.indexOf('xml')!=-1)
        //  delete funclist[funclist.indexOf('xml')];
        //funclist=funclist.splice(funclist.indexOf('xml'),1);
        funclist = funclist.concat(Object.keys(imgM));
        //  console.log(Object.keys(imgM),Object.keys(cbM))
        temp = [];
        for (i = 0; i < funclist.length; i++) {
            if (funclist[i].toString() != "xml") {
                temp.push(bot.inlineButton(funclist[i], {callback: funclist[i].toString() + "-" + url}))
                if ((i + 1) % 3 == 0) {
                    btns.push(temp)
                    temp = [];
                }
            }
            else {
                delete funclist[i];
                if (i + 1 != funclist.length) {
                    i--;
                }
            }
        }
        markup = bot.inlineKeyboard(btns);
        return markup;
    },
    isImage: function (url) {
        //  this.ext=url.substr(0,-4).toLowerCase()
        this.ext = "." + url.split('.').pop();
        if (this.ext == ".jpg" || this.ext == ".png" || this.ext == ".gif")
            return this.ext;
        //  this.ext=url.substring(0,-5).toLowerCase()
        if (this.ext == ".jpeg")
            return this.ext;
        return null;


    },
    getEffectList: function () {
        funclist = Object.keys(cbM);
        funclist = funclist.concat(Object.keys(imgM));
        temp = [];
        for (i = 0; i < funclist.length; i++) {
            if (funclist[i].toString() != "xml") {
                obj = {
                    efeName: funclist[i].toString(),
                    imgUri: funclist[i].toString() + ".jpg"
                }
                temp.push(obj)
            }
            else {
                delete funclist[i];
                if (i + 1 != funclist.length) {
                    i--;
                }
            }
        }
        return temp;
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4();
    },
    fetchUser: function (devid, cb) {
        appusermodel.findOne({devid: devid}, function (err, user) {
            //  console.log(user,err);
            if (!user) {
                m = new appusermodel;
                m.devid = devid.trim();
                m.create = new Date().getTime();
                m.countofused = 0;
                m.countofnotice = 0;
                m.limitused = 1;
                m.limitfriends = 3;
                m.status = "ok";
                m.link = devid;
                m.invitekey = null;
                m.save()
                user = m;
                user.save();

            }
            //user.invitekey=null;
            if (!user.invitekey) {
                this.query = appusermodel.find({}).select('invitekey -_id');
                this.query.exec(function (err, invitekeys) {
                    this.invitedkey = "test";
                    this.tempid = null;
                    //console.log(invitekeys);
                    while (this.invitedkey) {
                        this.tempid = utilM.guid();
                        this.invitedkey = utilM.findObjInArr(invitekeys, 'invitedkey', this.tempid);
                        //  console.log(tempid,invitedkey);

                    }
                    user.invitekey = this.tempid;
                    user.save();
                    //  console.log(user);
                    cb(user);
                });
            }
            else {
                cb(user);

            }
        });
    },
    findObjInArr: function (arr, key, value) {
        for (fi = 0; fi < arr; fi++) {
            if (arr[fi][key] == value) {
                return arr[fi];
            }
        }
        return null;
    }
    ,
    generateInfo: function (user) {
        this.text = "";
        this.text += "نام : " + user.name + "\r\n";
        this.text += "جنسیت : " + (user.sex=="men"?"پسر":"دختر") + "\r\n";
        this.text += user.age ? ("سن : " + (user.age<16?"زیر ۱۶ سال":(user.age>40?"بالاتر از 40":user.age)))+ "\r\n" : "" ;
        this.text += (user.city ? ("شهر : " + user.city) : "") + "\r\n";
        this.text+="تمایل به صحبت با ایشون رو داری؟ ";
        return this.text;
    },
    updateMessage: function (chatId, messageId, text, markup, ask) {
      return  bot.editText(
            {chatId, messageId}, text,
            {markup}
        );
    },
    findRandom:function(user){
        this.query=JSON.stringify(user.lastQuery);
        this.oprators=['nin','gte','lte','exists'];
        for(this.oi=0;this.oi<this.oprators.length;this.oi++){
            this.regExp = new RegExp(this.oprators[this.oi],'gi');
            // console.log(this.query.indexOf(this.oprators[this.oi]),this.oprators[this.oi],this.oi)
            // this.query=this.query.replace(this.oprators[this.oi],'$'+this.oprators[this.oi])
            this.query=this.query.replace(this.regExp,'$'+this.oprators[this.oi])
        }
        this.query=JSON.parse(this.query);
        if(user.blackList)
           this.query.chatid.$nin=this.query.chatid.$nin.concat(user.blackList)
      this.query.blackList={
          $ne:user.chatid
      };
      //console.log(this.query);
      usermodel.findRandom(this.query).limit(1).exec(function (err, fuser) {
         //   console.log(err, fuser);
            if (!err && fuser && fuser.length == 1) {
                fuser = fuser[0];
                user.fstatus = "verify";
                user.matchid = fuser.chatid;
                user.save();
                fuser.fstatus = "verify";
                fuser.matchid = user.chatid;
                fuser.save();
                markup = varM.markups.verifyConnect;
                this.finfo = utilM.generateInfo(fuser);
                this.info = utilM.generateInfo(user);
                if (fuser.photo) {
                    bot.sendPhoto(user.chatid, fuser.photo, {
                        caption: varM.msg.find + "\r\n" + this.finfo,
                        replyMarkup: markup
                        ,notification:true
                    })
                }
                else {
                    bot.sendMessage(user.chatid, varM.msg.find + "\r\n" + this.finfo, {markup,notification:true})
                }
                if (user.photo) {
                    bot.sendPhoto(fuser.chatid, user.photo, {
                        caption: varM.msg.find + "\r\n" + this.info,
                        replyMarkup: markup
                        ,notification:true
                    })
                }
                else {
                    bot.sendMessage(fuser.chatid, varM.msg.find + "\r\n" + this.info, {markup,notification:true})
                }
            }
        })
    },
    sendPhoto:function (msg,user,fileid) {
        bot.getFile(fileid ).then(function (info) {
            this.url = "https://api.telegram.org/file/bot" + token + "/" + info['file_path'];
        //    console.log(this.url)
            if (!utilM.isImage(info['fileLink'])) {
                return;
            }
            this.fileName = "img/" +msg.from.id +"." + url.split('.').pop();
            var that = this;
            new utilM.download(this.url, this.fileName, function () {
                markup = [
                    blockerbot.inlineButton(`notice(${user.countofnotice})`, {callback: "photonotice-" + msg.from.id + "-" + msg.message_id}),
                    blockerbot.inlineButton(`blocked`, {callback: "photoblock-" + msg.from.id + "-" + msg.message_id})
                ];
                markup = blockerbot.inlineKeyboard([markup])
                for (i = 0; i < adminids.length; i++)
                    blockerbot.sendPhoto(adminids[i], that.fileName, {
                        replyMarkup: markup,
                        caption: "@" + (user.username || (user.chatid+" "+user.name)),notification:true
                    })
            })
        })
    },
    addToTempBlackList:function (lastQuery,chatid) {
      this.lastQuery=JSON.parse(JSON.stringify(lastQuery));
      if(lastQuery.chatid.nin.indexOf(chatid)==-1)
        this.lastQuery.chatid.nin.push(parseInt(chatid))
      return this.lastQuery;
    },
    findBlUsers:function (msg,user,firstTime) {
      this.query={
        chatid:{
          $in:user.blackList
        }
      };
      // console.log(this.query)
      usermodel.find(this.query,function (err,users) {
       // console.log(err,users)
        this.blBtns = [];
        this.rowTmp = [];
        for (this.ai = 0; this.ai < users.length; this.ai++) {
          this.rowTmp.push(
            bot.inlineButton(utilM.generateInfoBl(users[this.ai]),{callback: "bl-" +users[this.ai].chatid}))
          if (this.rowTmp.length == 4) {
            this.blBtns.push(this.rowTmp)
            this.rowTmp = [];
          }
        }
        if(this.rowTmp.length>0){
          this.blBtns.push(this.rowTmp)
          this.rowTmp = [];
        }
        markup = bot.inlineKeyboard(this.blBtns);
        if(firstTime){
          return bot.sendMessage(msg.from.id, varM.msg.blackList, {markup,notification:true});
        }
        else{
          new utilM.updateMessage(
            msg.from.id,
            msg.message.message_id,
            varM.msg.blackList,
            markup
          )
        }
      })
    },
  generateInfoBl: function (user) {
    this.text = "";
    this.text += user.name + " ";
    this.text +=(user.sex=="men"?"پسر":"دختر") + " ";
    this.text += (user.age ? ((user.age<16?"زیر ۱۶":(user.age>40?"بالاتر از 40":user.age))) : "") + " ";
    this.text +=(user.city ?user.city : "") + " ";
    return this.text;
  },
}
