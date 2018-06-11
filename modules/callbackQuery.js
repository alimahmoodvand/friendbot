module.exports= {
  sexChange: function (msg, user, params) {
    if (user) {
      cb = user.sex ? true : false;
      if (params[1] == "w") {
        user.sex = "women";
      } else {
        user.sex = "men";
      }
      user.fstatus = "ok";
      user.save(function (err) {
        if (cb) {
          return bot.answerCallbackQuery(msg.id,
            {text: varM.msg.sexChanged, showAlert: true})
        }
        else {
          // markup = varM.markups.comment;
          // bot.sendMessage(msg.from.id, varM.msg.sexSet, {markup});

          user.fstatus = "age";
          user.save(function (err) {
            this.ageBtns = [];
            this.ageBtns.push([blockerbot.inlineButton('پایین تر از 16', {callback: "age-15"})])
            this.rowTmp = [];
            for (this.ai = 16; this.ai < 41; this.ai++) {
              this.rowTmp.push(blockerbot.inlineButton(this.ai + "سال", {callback: "age-" + this.ai}))
              if (this.rowTmp.length == 4) {
                this.ageBtns.push(this.rowTmp)
                this.rowTmp = [];
              }
            }
            this.ageBtns.push([blockerbot.inlineButton('بالاتر از 40', {callback: "age-40"})])
            markup = bot.inlineKeyboard(this.ageBtns);
            new utilM.updateMessage(
              msg.from.id,
              msg.message.message_id,
              varM.msg.ageChange,
              markup
            )
          })
          // return bot.sendMessage(msg.from.id, varM.msg.ageChange, {markup});
        }
      })
    }
  },
  sexSearch: function (msg, user, params) {
    if (user) {
      markup = JSON.parse(JSON.stringify(varM.markups.ageForSearch));
      for (mi = 0; mi < markup['inline_keyboard'].length; mi++) {
        markup['inline_keyboard'][mi][0].callback_data += "-" + params[1];
      }
      new utilM.updateMessage(
        msg.from.id,
        msg.message.message_id,
        varM.msg.ageSearch,
        markup
      )
    }
  },
  ageChange: function (msg, user, params) {
    if (user) {
      cb = user.age ? true : false;
      user.age = params[1];
      user.fstatus = "ok";
      user.save(function (err) {
        if (cb) {
          return bot.answerCallbackQuery(msg.id,
            {text: varM.msg.ageChanged, showAlert: true})
        }
        else {
          markup = varM.markups.comment;
          bot.sendMessage(msg.from.id, varM.msg.infoCompleted, {markup,notification:true});
        }
      })
    }
  },
  connectChange: function (msg, user, params) {
    usermodel.findOne({chatid: user.matchid}, function (err, fuser) {
      if (fuser) {
        if (params[1] == "deny") {
          user.fstatus = "search";
          user.matchid = undefined;
          user.lastQuery = utilM.addToTempBlackList(user.lastQuery, fuser.chatid)
          user.save(function (err) {
         //   console.log(err)
            usermodel.findOne({chatid: user.chatid}, function (err, cuser) {
            //  console.log(cuser.lastQuery.chatid)
             // console.log(err)
              fuser.fstatus = "search"
              fuser.matchid = undefined;
              // fuser.lastQuery.chatid.nin.push(user.chatid);
              fuser.lastQuery = utilM.addToTempBlackList(fuser.lastQuery, user.chatid)
              fuser.save(function (err) {
                markup = varM.markups.cancelSearching
                bot.sendMessage(fuser.chatid, varM.msg.itCancel.replace('~name', user.name), {markup,notification:true}).then(function (reb) {
                  new utilM.findRandom(fuser);
                })
                bot.sendMessage(user.chatid, varM.msg.youCancel, {markup,notification:true}).then(function (reb) {
                  new utilM.findRandom(user);
                })
              })
            })
          })
        }
        else {
          if (fuser.fstatus == "verified") {
            user.fstatus = "connect";
            user.save(function (err) {
              fuser.fstatus = "connect";
              fuser.save(function (err) {
                markup = varM.markups.cancelChat
                bot.sendMessage(fuser.chatid, varM.msg.connected, {markup,notification:true});
                bot.sendMessage(user.chatid, varM.msg.connected, {markup,notification:true});
              })
            })
          }
          else if (fuser.fstatus == "verify") {
            user.fstatus = "verified";
            user.save(function (err) {
              markup = varM.markups.verifyConnect;
              bot.sendMessage(fuser.chatid, varM.msg.waitingForYou.replace('~name', user.name), {markup,notification:true});
              markup = varM.markups.denyWaiting
              bot.sendMessage(user.chatid, varM.msg.waiting, {markup,notification:true});
            })
          }
        }
      }
    })
  },
  disconnect: function (msg, user, params) {
    usermodel.findOne({chatid: user.matchid}, function (err, fuser) {
      user.fstatus = "search";
      user.matchid = undefined;
      // user.lastQuery.chatid.nin.push(fuser.chatid);
      user.lastQuery = utilM.addToTempBlackList(user.lastQuery, fuser.chatid)

     // console.log(user.lastQuery.chatid)
      user.save(function (err) {
        fuser.fstatus = "search";
        fuser.matchid = undefined;
        // fuser.lastQuery.chatid.nin.push(user.chatid);
        fuser.lastQuery = utilM.addToTempBlackList(fuser.lastQuery, user.chatid)
        fuser.save(function (err) {
          markup = varM.markups.cancelSearching
          bot.sendMessage(fuser.chatid, varM.msg.itDeny.replace('~name', user.name), {markup,notification:true}).then(function (reb) {
            new utilM.findRandom(fuser);
          })
          bot.sendMessage(user.chatid, varM.msg.youCancel, {markup,notification:true}).then(function (reb) {
            new utilM.findRandom(user);
          })
        })
      })
    })
  },
  ageSearch: function (msg, user, params) {

    user.fstatus = "search";
    if (params[2] == "w") {
      user.fsex = "women";
    }
    else if (params[2] == "m") {
      user.fsex = "men";
    }
    else {
      user.fsex = "none";
    }
    // this.query={
    //     chatid: {$ne: msg.from.id},
    //     fstatus: user.fstatus,
    //     age:{$exists: true,$lte: 25},
    //     $or: [{sex: user.fsex}, {fsex: user.fsex}]
    // };
    // user.save();
    console.dir(this.ageQry);
    var that = this;
    markup = varM.markups.cancelSearching
    //nin,gte,lte,exists
    user.save(function (err) {
        bot.sendMessage(msg.from.id, varM.msg.searching, {markup,notification:true}).then(function (res) {
      this.query = {
        chatid: {
          nin: [msg.from.id]
        }
      }
      user.fstatus = "search";
      if (params[2] == "w") {
        this.query.fsex=user.sex;
        this.query.sex = "women";
      }
      else if (params[2] == "m") {
        this.query.fsex=user.sex;
        this.query.sex = "men";
      }
      else {
        this.query.fsex = "none";
      }

      if (params[1] == "o") {
        user.fage = "select"
        this.query.fage = "select";
        this.query.age = {exists: true, gte: user.age}
      }
      else if (params[1] == "y") {
        user.fage = "select"
        this.query.fage = "select";
        this.query.age = {exists: true, lte: user.age}
      }
      else {
        user.fage = "none"
        this.query.fage = "none";
      }
      // delete this.query['fage'];
      this.query.fstatus = user.fstatus;
      user.lastQuery = this.query;
      user.save(function (err) {
      //  console.log(err)
        new utilM.findRandom(user);
      })
      // this.query={
      //     chatid: {$ne: msg.from.id},
      //     fstatus: user.fstatus,
      //     age:{$exists: true,$lte: 25},
      //     $or: [{sex: user.fsex}, {fsex: user.fsex}]
      // };

    })
    })

    // markup = JSON.parse(JSON.stringify(varM.markups.sexForSearch));
    // //console.dir(markup);
    // for(mi=0;mi<markup['inline_keyboard'].length;mi++){
    //     markup['inline_keyboard'][mi][0].callback_data+="-"+params[1];
    // }
    // new utilM.updateMessage(
    //     msg.from.id,
    //     msg.message.message_id,
    //     varM.msg.search,
    //     markup
    // )
    // return bot.sendMessage(msg.from.id, , {markup});
  },
  changeBlackList: function (msg, user, params) {
    user.blackList.splice(user.blackList.indexOf(params[1]), 1)
    user.save(function (err) {
      bot.answerCallbackQuery(msg.id,{text: varM.msg.done, showAlert: true})
      new utilM.findBlUsers(msg,user,false);
    })
  },
}
