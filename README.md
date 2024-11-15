# RandomData Telegram Bot

RandomData is a Telegram bot that generates random but realistic user data, including first name, last name, username, bio, and profile picture. The bot ensures that the generated usernames are available for use on Telegram.

## Features

- Generates random user data:
  - First Name
  - Last Name
  - Username (ensures availability on Telegram)
  - Bio
  - Profile Picture
- Sends the generated data to users in a format that allows easy copying.
- Allows the bot owner to send notifications to all users.
- Notifies the bot owner when the bot starts.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Telegram bot token from [BotFather](https://core.telegram.org/bots#botfather)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mesamirh/RandomData.git
   cd RandomData
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a .env file in the root directory and add your Telegram bot token and owner chat ID:
   ```sh
   TELEGRAM_BOT=your_telegram_bot_token
   OWNER_ID=your_telegram_chat_id
   ```

### Usage
   ```sh
   node main.js
   ```

### Built With

 - Node.js
 - node-telegram-bot-api
 - unique-names-generator
 - @faker-js/faker
 - dotenv