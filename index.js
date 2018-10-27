const Discord = require("discord.js");
const express = require("express");
const request = require("request");
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const randItem = function(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
};

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

	if (command=="saysomething") {
		var botdata = {responses:["hold up, something's fuccin broken","something's broken #blameminerobber"],usernames:["lemme get that data"],avatars:["https://cdn.discordapp.com/embed/avatars/0.png"]};
		request("https://khuxkm.tilde.team/sanes/data.json",{json: true},function(err,res,body) {
			if (err) {console.error(err);} else {
				botdata = body;
//				console.log(JSON.stringify(botdata));
			}
		});
		const channel = message.channel;
		channel.createWebhook("temp saysomething webhook","").then(function (wb) {
			t = new Discord.WebhookClient(wb.id,wb.token);
			t.send(randItem(botdata.responses),{username:randItem(botdata.usernames),avatar_url:randItem(botdata.avatars)})
			t.delete("no u");
		}).catch(console.error);
	}

});

app.listen(config.http_port,function() { console.log("On port "+config.http_port); });

client.login(config.token);
