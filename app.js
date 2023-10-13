const { App } = require("@slack/bolt");
require("dotenv").config();
const fetchBoards = require("./functions/fetchData");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

const data = async () => {
  const miroBoards = await fetchBoards.fetchData(
    "GET",
    `${process.env.MIRO_API_URI}/boards`,
  );

  let boardList = [];

  for (let i = 0; i < miroBoards.data.length; i++) {
    boardList.push({
      "text": {
        "type": "plain_text",
        "text": `${miroBoards.data[i].name}`,
        "emoji": true,
      },
      "value": `${miroBoards.data[i].id}`,
    });
  }

  app.command("/modal", async ({ ack, body, client, logger }) => {
    await ack();

    try {
      await client.views.open({
        "trigger_id": body.trigger_id,
        "view": {
          "type": "modal",
          "callback_id": "form_modal",
          "title": {
            "type": "plain_text",
            "text": "Workshop Flow",
          },
          "submit": {
            "type": "plain_text",
            "text": "Submit",
          },
          "blocks": [
            {
              "type": "input",
              "block_id": "name_your_channel",
              "element": {
                "type": "plain_text_input",
                "action_id": "plain_text_input-action",
              },
              "label": {
                "type": "plain_text",
                "text": "Name your dedicated Workshop Channel",
                "emoji": true,
              },
            },
            {
              "type": "context",
              "elements": [
                {
                  "type": "mrkdwn",
                  "text": "Channel names should follow the format *<https://www.google.com | outlined here>!*"
                }
              ]
            },
            {
              "type": "input",
              "block_id": "member_selection",
              "element": {
                "type": "multi_users_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select users",
                  "emoji": true,
                },
                "action_id": "multi_users_select-action",
              },
              "label": {
                "type": "plain_text",
                "text": "Invite users to your Workshop Channel",
                "emoji": true,
              },
            },
            {
              "type": "divider"
            },
            {
              "type": "section",
              "block_id": "board_selection",
              "text": {
                "type": "mrkdwn",
                "text": "*Pick a Miro board to duplicate from the dropdown list*",
              },
              "accessory": {
                "type": "static_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select an item",
                  "emoji": true,
                },
                "options": boardList,
                "action_id": "static_select-action",
              },
            },
            {
              "type": "input",
              "block_id": "name_your_board",
              "element": {
                "type": "plain_text_input",
                "action_id": "plain_text_input-action",
              },
              "label": {
                "type": "plain_text",
                "text": "Name your new Miro Board",
                "emoji": true,
              },
            },
            {
              "type": "input",
              "block_id": "describe_your_board",
              "element": {
                "type": "plain_text_input",
                "multiline": true,
                "action_id": "plain_text_input-action",
              },
              "label": {
                "type": "plain_text",
                "text": "Describe your Miro Board",
                "emoji": true,
              },
            }
          ],
        },
      });
      //logger.info(result);
    } catch (error) {
      logger.error(error);
    }
  });
};

data();

//Manage View Submission events + actions
app.view("form_modal", async ({ ack, body, view, client, logger }) => {
  await ack();

  //Slack app state variables.
  const user = body["user"]["id"];
  const channelName =
    view["state"]["values"]["name_your_channel"]["plain_text_input-action"];
  const membersToAdd =
    view["state"]["values"]["member_selection"]["multi_users_select-action"];
  let members = membersToAdd.selected_users;
  const boardName =
    view["state"]["values"]["name_your_board"]["plain_text_input-action"];
  const boardDesc =
    view["state"]["values"]["describe_your_board"]["plain_text_input-action"];
  const board_id =
    view["state"]["values"]["board_selection"]["static_select-action"];

  //Duplicate an existing Miro Board from a list
  try {
    const copyBoard = await fetchBoards.fetchData(
      "PUT",
      `${process.env.MIRO_API_URI}/boards?copy_from=${board_id.selected_option.value}`,
      {
        "name": boardName.value,
        "description": boardDesc.value,
      },
    );

    //Create a new Slack Channel from an input
    try {
      const channelInfo = await client.conversations.create({
        "name": `${channelName.value}`,
      });

      const newUsers = await client.conversations.invite({
        "channel": channelInfo.channel.id,
        "users": members.toString(),
      });
    } catch (error) {
      logger.error(error);
    }

    //Create a message to confirm the Miro Board has been duplicated
    let msgMiroConfirm =
      `Your Miro Board: *<${copyBoard.viewLink} | ${boardName.value}>* has been successfully created.`;

    //Post the message.
    await client.chat.postMessage({
      channel: user,
      text: msgMiroConfirm,
    });

    let msgMiroBoard =
      `Here is your Miro Board: *<${copyBoard.viewLink} | ${boardName.value}>* .`;

    //Post the Miro board to the new Slack Channel
    await client.chat.postMessage({
      channel: channelName.value,
      text: msgMiroBoard,
    });
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app: "Msg testing" is running!');
})();
