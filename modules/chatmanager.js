module.exports={
    connect:function(msg,user){
        // markup=varM.markups.cancelChat;
        markup=blockerbot.inlineKeyboard([]);
        // bot.sendMessage(user.matchid,msg.text,{markup});
        if (msg.photo) {
            this.fileid = (msg.photo ? (msg.photo[2]?msg.photo[2]['file_id']:msg.photo[1]['file_id']) : msg.document['file_id']);
            return bot.sendPhoto(user.matchid, this.fileid, {replyMarkup:markup, caption: msg.caption,notification:true});
        }
        else if (msg.audio) {
            return bot.sendAudio(user.matchid, msg.audio['file_id'], {replyMarkup: markup, caption: msg.caption,notification:true});
        }
        else if (msg.voice) {
            return bot.sendVoice(user.matchid, msg.voice['file_id'], {replyMarkup: markup, caption: msg.caption,notification:true});
        }
        else if (msg.video) {
            return bot.sendVideo(user.matchid, msg.video['file_id'], {replyMarkup:markup, caption: msg.caption,notification:true});
        }
        else if (msg.video_note) {
            return bot.sendVideoNote(user.matchid, msg.video_note['file_id'], {replyMarkup:markup, caption: msg.caption,notification:true});
        }
        else if (msg.document) {
            return bot.sendDocument(user.matchid, msg.document['file_id'], {replyMarkup:markup,caption: msg.caption,notification:true});
        }
        else if (msg.sticker) {
            return bot.sendSticker(user.matchid, msg.sticker['file_id'], {replyMarkup:markup,notification:true});
        }
        else if (msg.text) {
            bot.sendMessage(user.matchid,msg.text,{replyMarkup:markup});
        }
        else if (msg.venue) {
          bot.sendVenue(user.matchid,[msg.venue.location.latitude,msg.venue.location.longitude],
            msg.venue.title,  msg.venue.address,{replyMarkup:markup,notification:true});
        }
        else if (msg.location) {
            bot.sendLocation(user.matchid,[msg.location.latitude,msg.location.longitude],{replyMarkup:markup,notification:true});
        }
    },
    cancelSerching:function(msg,user){
        user.save(function (err) {

        usermodel.findOne({chatid:user.matchid},function (err,fuser) {
            user.fstatus = "ok";
            user.matchid=undefined;
            user.fsex=undefined;
            user.lastQuery=undefined;
            user.countofused = (parseInt(user.countofused) + 1);
            user.save(function (err) {
            if (fuser) {
                // fuser.countofused = (parseInt(fuser.countofused) + 1);
                fuser.fstatus = "search";
                fuser.matchid=undefined;
                fuser.save(function (err) {
                markup=varM.markups.cancelSearching
                bot.sendMessage(fuser.chatid, varM.msg.itCancel.replace('~name',user.name),{markup,notification:true}).then(function (reb) {
                    new utilM.findRandom(fuser);
                })
            });
            }

            markup = varM.markups.comment;
            bot.sendMessage(user.chatid, varM.msg.canceled,{markup,notification:true});
        })

        })
        // if (user) {
        //     user.fstatus="ok";
        //     user.save();
        //     markup=varM.markups.comment;
        //     bot.sendMessage(user.chatid,varM.msg.canceled,{markup});
        // }
        })
    },
    disconnect:function(msg,user) {
        usermodel.findOne({chatid: user.matchid}, function (err, fuser) {
            user.fstatus = "ok";
            user.matchid = undefined;
            user.lastQuery = undefined;
            user.fsex = undefined;
            user.countofused = (parseInt(user.countofused) + 1);
            user.save(function (err) {
                // fuser.countofused = (parseInt(fuser.countofused) + 1);
                fuser.fstatus = "search";
                fuser.matchid = undefined;
                fuser.save(function (err) {
                    markup = varM.markups.cancelSearching
                    bot.sendMessage(fuser.chatid, varM.msg.itDeny.replace('~name', user.name), {markup,notification:true}).then(function (reb) {
                        new utilM.findRandom(fuser);
                    })
                    markup = varM.markups.comment;
                    bot.sendMessage(user.chatid, varM.msg.canceled, {markup,notification:true});
                });
            });

        })
    },
  addToBlackList:function(msg,user) {
    usermodel.findOne({chatid: user.matchid}, function (err, fuser) {
      user.fstatus = "ok";
      user.matchid = undefined;
      user.lastQuery = undefined;
      user.fsex = undefined;
      user.blackList.push(fuser.chatid)
      user.countofused = (parseInt(user.countofused) + 1);
      user.save(function (err) {
        // fuser.countofused = (parseInt(fuser.countofused) + 1);
        fuser.fstatus = "search";
        fuser.matchid = undefined;
        // fuser.blackList.push(user.chatid)
        fuser.save(function (err) {
          markup = varM.markups.cancelSearching
          bot.sendMessage(fuser.chatid, varM.msg.itDeny.replace('~name', user.name), {markup,notification:true}).then(function (reb) {
            new utilM.findRandom(fuser);
          })
          markup = varM.markups.comment;
          bot.sendMessage(user.chatid, varM.msg.canceled, {markup,notification:true});
        });
      });

    })
  },
}
