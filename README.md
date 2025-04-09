# Discord X Bot

## Initial setup

1. Register an account with [TweetShift](https://tweetshift.com/) and invite Discord bot to server.
2. The channel that this bot will read from should be hidden from all users, we don't want any duplicate messages being sent from this bot as it basically just relays TweetShift's messages and adds an AI's response.
3. Invite this bot to the server: <https://discord.com/oauth2/authorize?client_id=1359213922972074084>
4. Create a `.env` file (see `.env.example`)

## Tweaking the AI's sentiment

Go to `./src/lib/openai.ts` and modify the input from the system's instructions
