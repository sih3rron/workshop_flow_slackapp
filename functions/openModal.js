app.command("/modal", async ({ ack, body, client, logger }) => {
    await ack();
  
    try {
      const result = await client.views.open({
        "trigger_id": body.trigger_id,
        "view": {
          "type": "modal",
          "callback_id": "form_modal",
          "title": {
              "type": "plain_text",
              "text": "Modal Title"
          },
          "submit": {
              "type": "plain_text",
              "text": "Submit"
          },
          "blocks": [
              {
                  "type": "input",
                  "block_id": "channel_id",
                  "element": {
                      "type": "plain_text_input",
                      "action_id": "sl_input",
                      "placeholder": {
                          "type": "plain_text",
                          "text": "Placeholder text for single-line input"
                      }
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Name your workshop channel"
                  },
                  "hint": {
                      "type": "plain_text",
                      "text": "Follow this pattern: (int | ext)_(title)_workshop_(yy-mm-dd)"
                  }
              },
              {
                  "type": "input",
                  "block_id": "members_invited",
                  "element": {
                      "type": "multi_users_select",
                      "placeholder": {
                          "type": "plain_text",
                          "text": "Select users",
                          "emoji": true
                      },
                      "action_id": "multi_users_select-action"
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Who will you invite to join the Workshop?",
                      "emoji": true
                  }
              }
          ]
      }
      });
      logger.info(result);
    } catch (error) {
      logger.error(error);
    }
  });