# Pingu backend

In order for the application to work it needs a pingu-config.json file in the src folder of the following format
```json
{
  "slackBearerToken": "xoxb-SUPER-SECRET-TOKEN",
  "slackChannelId": "COOL_CHANNEL_ID",
  "awsRegion": "eu-west-3"
}
```

## Development build
> npm install
> 
> npm run watch


## Production build
> npm run build