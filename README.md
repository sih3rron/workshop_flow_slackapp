# Miro Workshop planner - Slack app

The intention of this project is to _prototype_ a Slack app that will support an individual in constructing the foundations of a Workshop from Slack itself.

## Description 
There are 5 overall goals. 3 are completed, 2 are currently out of scope.

* Create a Slack channel and enable the user to add channel members.
* Create a Miro board with templates that can be used for a workshop.
* Share a Miro board in the Slack channel and add channel members to that board using their email address.


[Currently Out of Scope]  
* _Schedule a Google Meet or Zoom meeting via Google Calendar._
* _Send board updates back to the Slack channel._

The application is built in NodeJS and JavaScript. It uses Slacks' [Bolt JavaScript SDK](https://slack.dev/bolt-js/concepts), [Block Kit framework](https://api.slack.com/block-kit), and [REST APIs from Miro platform](https://developers.miro.com/reference/api-reference). 
  
## How to run the app

> [!NOTE]  
> Socket mode
> 
> The app, as a prototype, is using Slacks "[Socket mode](https://app.slack.com/app-settings/T059208QTEW/A061HBUUGQ0/socket-mode)" rather than public request URL endpoints. It is advisable to use Request URLs if you want to put this into production. 
> 
> Socket mode affects aspects of Interactivity, the Slash Command used to trigger the app, and how the app responds to Event Subscriptions.

### Instructions

1. Fork the default branch of the project repo.
2. Having forked the repo, you can then go ahead and clone the repo locally.
3. This project uses `.env` for environment variables the env-template is in the repo, but also outlined below.

```
#Slack Creds  
SLACK_SIGNING_SECRET=  
SLACK_BOT_TOKEN=  
SLACK_APP_TOKEN=  
SLACK_USER_TOKEN=  
 
#Miro Creds  
MIRO_CLIENT_ID=  
MIRO_CLIENT_SECRET=  
MIRO_APP_TOKEN=  
MIRO_REDIRECT_URL="http://localhost:3000/redirect"  
MIRO_API_URI="https://api.miro.com/v2/"  

```

Slack makes it really easy for you to construct apps


