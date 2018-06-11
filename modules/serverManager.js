module.exports={
uploadimage:function(req,res) {
  if(req.body.devid &&req.body.devid.trim()){
 utilM.fetchUser(req.body.devid,function(user){
           // console.log(user)
            if(true || user.countofused<user.limitused || user.invited.length>=user.limitfriends)
            {

	  if (!req.files||!utilM.isImage(req.files.file.name)){
      console.log(utilM.isImage(req.files.file.name),req.files.file.name.split('.').pop())
          return res.status(400).send('فایلی سمت سرور فرستاده نشده است');
    }
   this.img = req.files.file;
   this.fileName="imgapp/"+(parseInt(new Date().getTime())).toString()+this.img.name;
  var that=this;
  new this.img.mv(this.fileName, function(err) {
    if (err){
      console.log(err)
      return res.status(500).send("مشکلی در سرور بوجود آمده است مجدا تلاش کنید");
    }
  this.response={
    fileurl:fileUrl+that.fileName,
    effectlist:new utilM.getEffectList()
  };
user.countofused++;
user.save()
console.log(user)
    res.send(JSON.stringify(this.response));
  });
}
else{
              return res.status(403).send("شما نمیتوانید از اپ استفاده کنید . لطفا ۳ نفر از دوستان خود را به اپ دعوت کنید");
}
})
        }else{
        return res.status(400).send('ردخواست نادرست');
        }
},
doeffect:function(req,res) {
	// console.log(fs.existsSync(req.body.url.replace(fileUrl,'')),
	// 	req.body.url,
	// 	req.body.url.replace(fileUrl,'')
	// 	)
 // console.log(req.body);
  utilM.fetchUser(req.body.devid,function(user){
    console.log(user)
      if(req.body.url&&fs.existsSync((req.body.url.replace(fileUrl,'')))){
       dateFormat = require('dateformat');
 now = new Date();
var today=dateFormat(now,'yyyymmdd');
today=parseInt(today);
        if((user.count<2&&user.date<today)||true)
        {
          user.count++;
          user.save();
        apimodel.findOne({ $or:[  {'count':{$lt:apilimit}}, {'date':{$lt:today}} ],status:'ok'}, function (err, app) {
          if(app){
            console.log(app)
            if(app.count>=apilimit){
              app.count=0;
            }else{
              app.count++;
              if(app.count>=apilimit){
                app.date=today;
              }
            }
            app.key=app.key.trim();
            app.appid=app.appid.trim();
            app.save();
            if(cloadbinMethods.indexOf(req.body.effectname)==-1){
        xml=imgM[req.body.effectname](req.body.url);
        hash=crypto.createHmac('sha1', app.key).update(xml).digest('hex');
          new  requestM.getRequestId(hash,xml,app.appid,app.key,function(url) {
           if(utilM.isImage(url)){
              return res.send(url)
           }
           else{
            if(url.toLowerCase().indexOf('key is not found')!=-1){
              // app.status=url;
              // app.save();
              // fs.appendFileSync('error/key.txt',JSON.stringify(app).toString('utf8')+"\r\n");
                        new serverM.doeffect(req,res);
           }
           else if(url.toLowerCase().indexOf('face')!=-1){
              return res.status(400).send("این افکت بروی صورت اعمال میشود لطفا افکتی دیگر انتخاب کنید یا عکس دیگری را ارسال کنید");
            }
           else{
           	      return res.status(500).send("مشکلی در سرور بوجود آمده است مجدا تلاش کنید");
           }
            }
        })
    }
            else{
           new cbM[req.body.effectname](req.body.url,function(url) {
                 return res.send(url)
           })
            }
    }
           })
}
else{
          user.count=0;
          user.date=today;
          user.save();
        return res.status(429).send('تعداد درخواست ها روزانه ی شما تمام شد لطفا فردا دوباره امتحان کنید');
}
      }
      else{
        return res.status(404).send('فایلی با مشخصات بالا یافت نشد');
      }
  })

},
invite:function(req,res) {
    if(req.body.devid &&req.body.devid.trim()){
     // req.body.devid=xor.decode(xorkey,req.body.devid);
   appusermodel.findOne({devid:req.body.devid},function(err,user){
            if(user){
            var number=req.body.friendid.trim()
            appusermodel.findOne({invitekey:number},function(err,target){
            appusermodel.findOne({invited:user.invitekey},function(err,invited){
            if(target && target.invited.indexOf(number)==-1&&user.invitekey!=number)
            {
                if(!invited){
                target.invited.push(user.invitekey);
                target.save();
                return res.status(201).send('عملیات با موفقیت انجام شد');
                }
                else{
                return res.status(409).send('کلید ارسالی قبلا استفاده شده است');
                }
            }
            else{
              if(!target)
                return res.status(409).send('کلید ارسالی وجود ندارد');
              else if(target.invited.indexOf(number)!=-1)
                return res.status(409).send('کلید ارسالی قبلا استفاده شده است');
              else
                return res.status(409).send('کلید ارسالی مطعلق به خود شماست است');
            }
            })
            })
            }
            else{
              return res.status(400).send('ردخواست نادرست');
            }
});
        }else{
      return res.status(400).send('ردخواست نادرست');
        }
},
  getid:function(req,res) {
    if(req.body.devid &&req.body.devid.trim()) {
      utilM.fetchUser(req.body.devid,function(user) {
        this.obj={
          invitekey:user.invitekey
        };
        res.send(JSON.stringify(this.obj));
      });
     // res.send(this.faid+"\r\n"+this.reid);//res.send(xor.decode(xorkey,req.body.devid));
    }
    else{
      return res.status(400).send('ردخواست نادرست');
    }
  }
};
