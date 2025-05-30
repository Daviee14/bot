require('dotenv').config();
const Discord = require("discord.js-selfbot-v13");
const keepAlive = require("./server.js"); // Import the keep-alive server

const client = new Discord.Client({
  checkUpdate: false,
});

// Always use environment variables for tokens
const token = process.env.TOKEN;
if (!token) {
  throw new Error("Discord TOKEN not found in environment variables");
}

// Start the keep-alive server
keepAlive();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Handle when users join a server
client.on("guildMemberAdd", (member) => {
  console.log(`${member.user.tag} joined ${member.guild.name}`);
  const channel = client.channels.cache.get("1370018863491842128");
  if (channel) {
    // Format with mention using <@userId> syntax
    channel.send(`User <@${member.user.id}> (${member.user.tag}) joined ${member.guild.name}`);
  }
});

// Handle direct messages - show username mentions
client.on("messageCreate", (message) => {
  // Only process DMs (not from self)
  if (message.channel.type === "DM" && message.author.id !== client.user.id) {
    console.log(`Received DM from ${message.author.tag}`);
    
    // Reference the user with proper mention format
    message.channel.send(`I received your message, <@${message.author.id}>! I can see your profile now.`);
  }
});

// Auto-reconnect logic
client.on("disconnect", () => {
  console.log("Disconnected! Reconnecting...");
  client.login(token).catch(console.error);
});

// Error handling
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

client.login(token).catch(console.error);