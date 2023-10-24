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

> [!IMPORTANT]
> In order to run this app you will need access to both a Slack Workspace and a Miro account. Both of these can be created for free.
>

> [!NOTE]  
> Socket mode
> 
> The app, as a prototype, is using Slacks "[Socket mode](https://app.slack.com/app-settings/T059208QTEW/A061HBUUGQ0/socket-mode)" rather than public request URL endpoints. It is advisable to use Request URLs if you want to put this into production. 
> 
> Socket mode affects aspects of Interactivity, the Slash Command used to trigger the app, and how the app responds to Event Subscriptions.
>

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

Finding the credentials to fill your `.env` file is really simple.

## The Slack part

Slack makes it easy to set up apps from an `app manifest` a JSON or YAML schema of your app. I have included a JSON schema in the code bundle under `./app_manifest`. 

You can use that manifest by visiting the Slack API docs. 

Click "[Create your app](https://api.slack.com/apps?new_app=1)" and select the option "From an app manifest".  

**Step 1.** You will be asked to select the Workspace you want to develop in.

**Step 2** Copy and paste the JSON app manifest I have provided into the panel provided. You will likely want to amend the following JSON values: 

* display_information > name
* display_information > description
* features > bot_user > display_name  
* features > slash_commands > command

It's worth noting that these don't have to be changed here, you will have opportunities to change their values via the Slack UI.

**Step 3** The interface will present you with an overview of the app features and settings for you to review before you create the app.

Having created the app, you will then be directed to your apps "Basic information" where you can start the process of gathering your App, User, and Bot tokens to fulfil the `.env` variables.

## The Miro part

While you aren't building an app in Miro itself, to obtain your Client ID, Client Secret, and Authorization token you will need to follow the config creation process for "Building an app" in Miro.


