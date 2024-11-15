const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

// Load Telegram bot token and owner chat ID from .env
const token = process.env.TELEGRAM_BOT;
const notificationChatId = process.env.OWNER_ID;

// Initialize the Telegram bot
const bot = new TelegramBot(token, { polling: true });

// Store user data for sending notifications
const users = new Set();

// Notify the owner when the bot starts
bot.sendMessage(notificationChatId, "Sir, I'm wake up!").catch((error) => {
  console.error(`Failed to send startup message: ${error.message}`);
});

// Handle incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Add user to the set
  users.add(chatId);

  // Generate random user data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.username();

  // Generate a unique bio
  const bio = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 3,
    separator: ' ',
    style: 'capital',
  });

  // Generate a profile picture URL
  const profilePicture = faker.image.avatar();

  // Format the message with user data
  const message = `
First Name: \`${firstName}\`
Last Name: \`${lastName}\`
Username: \`${username}\`
Bio: \`${bio}\`
`;

  // Send the user data message and profile picture
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' }).then(() => {
    bot.sendPhoto(chatId, profilePicture);
  });
});

// /notify command
bot.onText(/\/notify (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const message = match[1];

  if (chatId.toString() === notificationChatId) {
    users.forEach((userId) => {
      bot.sendMessage(userId, message);
    });
  } else {
    bot.sendMessage(chatId, 'Owner can use this command only.');
  }
});

// /stats command
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;

  if (chatId.toString() === notificationChatId) {
    bot.sendMessage(chatId, `Total users: ${users.size}`);
  } else {
    bot.sendMessage(chatId, 'Owner can use this command only.');
  }
});