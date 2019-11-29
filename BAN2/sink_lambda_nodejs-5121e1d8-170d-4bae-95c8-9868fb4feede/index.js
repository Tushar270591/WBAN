const https = require('https')
let url = "https://662fgelr4c.execute-api.eu-west-1.amazonaws.com/dev/data"
// https://api.breezometer.com/air-quality/v2/current-conditions?lat=53.38906175871291&lon=-6.10118865966797&key=4c07080372a742dd979d00c100318006&features=breezometer_aqi
exports.handler = function(event) {
  var str = ''
  https.get('https://api.breezometer.com/air-quality/v2/current-conditions?lat=53.38906175871291&lon=-6.10118865966797&key=4c07080372a742dd979d00c100318006', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  // res.on('data', (d) => {
  //   console.log('data:', d);
  // });
  res.on('data', function (chunk) {
    str += chunk;
  });

  res.on('end', function () {
    console.log('data:', str);
    
    // your code here if you want to use the results !
  });

}).on('error', (e) => {
  console.error(e);
});
  return str
// var postData = JSON.stringify(event);

//     console.log(postData)
//     return new Promise((resolve, reject) => {
//         const options = {
//             host: 'api.breezometer.com',
//             path: '/air-quality/v2/current-conditions?lat=53.38906175871291&lon=-6.10118865966797&key=4c07080372a742dd979d00c100318006',
//             method: 'GET'
//         };

//         const req = https.request(options, (res) => {
          
//           resolve('Success');
//           return res;
//         });

//         req.on('error', (e) => {
//           reject(e.message);
//         });

//         // send the request
//         req.write('');
//         req.end();
//     });
}