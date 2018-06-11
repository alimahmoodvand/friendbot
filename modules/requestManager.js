module.exports={
	getRequestId:function (sign,data,myappid,mykey,cb) {
		this.post_data = querystring.stringify({
			app_id:myappid,
			sign_data:sign,
			data:data,
			key:mykey
		});
        // console.log({
        //     app_id:appid,
        //     sign_data:sign,
        //     data:data,
        //     key:key
        // })
//	console.log(data)
		//return ;
	  this.post_req = http.request(httpCredRequest, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
 //console.log(res.statusCode)
      	requestid=requestM.fetchRequestId(chunk);
            if(requestid&&requestid.indexOf('<?xml')!=0){

      	      		new requestM.getImgUrl(chunk,requestid,cb);
    }
    else{
      console.log(chunk);
      cb(chunk)
    }
          });

  });

  // post the data
  this.post_req.write(this.post_data);
  this.post_req.end();
	},
	fetchRequestId:function (xml) {

		return (xml.substring(xml.indexOf('<request_id>')+12,xml.indexOf('</request_id>')))
	},
	getImgUrl:function (cnk,requestid,cb) {
		console.log(requestid);
 if(requestid.indexOf('<?xml')!=0){
     setTimeout(function(){
		httpCredGetUrl.path="/getresult?request_id="+requestid.trim();
		//console.log("http://"+httpCredGetUrl.host+httpCredGetUrl.path)
	  this.post_req = http.request(httpCredGetUrl, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
              //  console.log(chunk)
      	imgurl=requestM.fetchImgUrl(chunk);
      	cb(imgurl);
      });
  });

  // post the data
  this.post_req.write("");
  this.post_req.end();
          },7500);
}
else{
  cb(cnk);
}
	},
	fetchImgUrl:function (xml) {
		//console.log(xml);
		url= xml.substring(xml.indexOf('<result_url>')+12,xml.indexOf('</result_url>'))
		if(url.indexOf("http")!=0){
	//		console.log(xml);
    return xml;

		}
		return url;
	},
}