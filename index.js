const Discord = require("discord.js");
const express = require("express");
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const client = new Discord.Client();

const config = require("./config.json");

app.get(config.http_prefix+"/serverdata.json",function(req,res) {
	var data = {};
	const guild = client.guilds.get("502604049825398805");
	data["name"] = guild.name;
	data["count"] = guild.members.size;
	res.send(JSON.stringify(data));
});

client.on("ready", () => {
	console.log(`*hacker voice* I'm in!`);
});

client.on("message", async message => {
	if(message.author.bot) return;

	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command=="src") {
		message.channel.send("GitHub: https://github.com/MineRobber9000/sanes");
	}

});

app.listen(config.http_port,function() { console.log("On port "+config.http_port); });

client.login(config.token);
