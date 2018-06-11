var cluster = require('cluster');
if (cluster.isMaster) {
    cluster.fork();

    cluster.on('exit', function (worker, code, signal) {
        if(code==0)
         cluster.fork();
    });
}

if (cluster.isWorker) {
    initM = require('./modules/init');
    initM.initial();
    managerM.start();

    process.on('uncaughtException', function (exception) {
        console.log(exception,new Date())
      process.exit(0);
})
    process.on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
}
// url="https://dz2cdn1.dzone.com/storage/rc-covers/3339976-refcard-cover141.png";

// xml=imgM.pixelation(url);
// hash=crypto.createHmac('sha1', key).update(xml).digest('hex');

// requestM.getRequestId(hash,xml,function(argument) {
// console.log(argument);
// })

// xml2=imgM.skinHealing(url);

// msg.document['file_id']).then(function (info) {
// 		console.log(info);
// 		var body=''
// http.get({
//   hostname: 'api.telegram.org',
//   port: 443,
//   path: '/file/bot238732216:AAHIbyv544BgKaf761h451wzA_2qndVmyD0/'+info['file_path']
