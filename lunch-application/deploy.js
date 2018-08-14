var FtpDeploy = require('ftp-deploy')
var ftpDeploy = new FtpDeploy()

var config = {
  user: 'LunchApplication__dev\\$LunchApplication__dev',                      // NOTE that this was username in 1.x
  password: 'x5o7GtEuR59WWgtT1NPgyWQfriyNrawwwjEAw5rAhnKTmFZ1r3Q57r0l7Ccu',   // optional, prompted if none given
  host: 'waws-prod-dm1-053.ftp.azurewebsites.windows.net',
  port: 21,
  localRoot: __dirname + '/dist',
  remoteRoot: '/site/wwwroot/',
  include: ['*', '**/*'],                                                     // this would upload everything except dot files
  exclude: []                                                                 // e.g. exclude sourcemaps
};

ftpDeploy.on('uploading', function (data) {
  console.log(data.transferredFileCount + '/' + data.totalFilesCount + '\t' + data.filename);
});

ftpDeploy.deploy(config)
  .then(res => console.log('finished'))
  .catch(err => console.log(err));
