const AWS = require(`aws-sdk`);
// AWS.config.update({region: `eu-west-2`});
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log(event)
    var TableName = '';
    var Item = {};
    if ('accelerometer' in event){
        TableName = 'Accelerometer'
        // st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        Item['timestamp'] = (Date.now()).toString();
        Item['x'] = event['accelerometer']['x'];
        Item['y'] = event['accelerometer']['y'];
        Item['z'] = event['accelerometer']['z'];
    }
    if ('HRS' in event){
        TableName = 'HeartRate'
        // st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        Item['timestamp'] = (Date.now()).toString();
        Item['bpm'] = event['HRS']['bpm'];
    }
    if ('BP' in event){
        TableName = 'BloodPressure'
        // st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        Item['timestamp'] = (Date.now()).toString();
        Item['systolic'] = event['BP']['systolic'];
        Item['diastolic'] = event['BP']['diastolic'];
    }
    
    
        dynamo.put({TableName, Item}, function (err, data) {
            if (err) {
                console.log(`error`, err);
                callback(err, null);
            } else {
                var response = {
                    statusCode: 200,
                    headers: {
                        'Content-Type': `application/json`,
                        'Access-Control-Allow-Methods': `GET,POST,OPTIONS`,
                        'Access-Control-Allow-Origin': `https://my-domain.com`,
                        'Access-Control-Allow-Credentials': `true`
                    },
                    isBase64Encoded: false
                };
                console.log(`success: returned ${data.Item}`);
                callback(null, response);
            }
        });
    
    
};