def handler(event, context):
  return {
    'statusCode': 200,
    'body': {
      'isAuthenticated': True,
    }
  }
