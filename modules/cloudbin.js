// cartoonify=function(path,cb) {
//     cloudinary.uploader.upload(path,{tags:'basic_sample'}).then(function(image){
// cb(cloudinary.url(image.public_id,{effect: "cartoonify:15:70"}))
// })
// .catch(function(err){
//   if (err){ console.warn(err);}
// });

// },
module.exports={
کارتونی:function(path,cb) {
    cloudinary.uploader.upload(path,{tags:'basic_sample'}).then(function(image){
cb(cloudinary.url(image.public_id,{effect: "cartoonify:15:bw"}))
})
.catch(function(err){
  if (err){ console.warn(err);}
});
}
}
// module.exports={
//     // cartoonify:cartoonify,
//     cartoon:bw,
// }
