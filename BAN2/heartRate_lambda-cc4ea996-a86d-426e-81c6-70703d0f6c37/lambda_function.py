import json
import boto3
import threading
import random
import base64
import time

next_node = ''
# BP = {}
lambda_client = boto3.client('lambda')
nextfunctionName = ''
    
def lambda_handler(event, context):
    # TODO implement
    nextfunctionResp = lambda_client.invoke(
        FunctionName = 'routing_lambda',
        InvocationType='RequestResponse',
        Payload = json.dumps({ 'fromNode': 'heartRate_lambda'})
        )
    nextfunction = json.loads(nextfunctionResp['Payload'].read().decode())
    nextfunctionName = nextfunction["body"]
    print(nextfunction["body"])
    if 'caller' in event :
        print(event['caller'])
    if 'caller' in event and event['caller'] != 'heartRate_lambda':
        call_next(event, context, nextfunctionName)
    else:
        for x in range(20):
            event['caller'] = 'heartRate_lambda'
            event['HRS'] = {}
            if x < 10:
                event['HRS']['bpm'] = random.randrange(60,80)
            elif x > 10 and x< 12:
                event['HRS']['bpm'] = random.randrange(80,90)
            else:
                event['HRS']['bpm'] = random.randrange(90,100)
            
            call_next(event, context,nextfunctionName)
            time.sleep(1)
    
def call_next(event, context,nextfunctionName):
    # TODO implement
    MESSAGE = json.dumps(event)
    
    response = lambda_client.invoke(
        FunctionName = nextfunctionName,
        InvocationType='Event',
        Payload = MESSAGE
        )
    
    print(MESSAGE)
    return {
        'statusCode': 200,
        'body': event
    }
