import json
import os
import botocore.vendored.requests as requests
import boto3
lambda_client = boto3.client('lambda')

def lambda_handler(event, context):
    # TODO implement
    print(event)
    MESSAGE = json.dumps(event)
    
    response = lambda_client.invoke(
        FunctionName = 'edge_app_lambda',
        InvocationType='Event',
        Payload = MESSAGE
        )
    return {
        'statusCode': 200,
        'body': json.dumps(event)
    }
