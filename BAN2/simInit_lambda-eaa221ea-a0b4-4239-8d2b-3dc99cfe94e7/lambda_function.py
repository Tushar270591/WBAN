import json
import boto3
import base64
client = boto3.client("lambda")

def lambda_handler(event, context):
    # TODO implement
    lambda_client = boto3.client('lambda')
    
    lambda_client.invoke(
        FunctionName = 'accelerometer_lambda',
        InvocationType='Event'
        )
    lambda_client.invoke(
        FunctionName = 'bloodPressure_lambda',
        InvocationType='Event'
        )
    lambda_client.invoke(
        FunctionName = 'heartRate_lambda',
        InvocationType='Event'
        )
    return {
        'statusCode': 200,
        'body': 'success'
    }
