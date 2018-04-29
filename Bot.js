const Discord = require('discord.js');
const client = new Discord.Client();
const unirest = require("unirest");
const Rembed = new Discord.RichEmbed();
const newUsers = [];
const cheerio = require('cheerio')
const request = require('request')
var urls = Array()
function commandIs(str, msg)
{
return msg.content.startsWith('/'+ str);
}

var messagecount;

//Bot Status Indicator
client.on('ready', () => {
    console.log('The Bot is Online');
    client.user.setActivity('Milletin Hisleriyle')
    setInterval(function() {
		upSecs = upSecs + 1
		if (upSecs >= 60) {
			upSecs = 0
			upMins = upMins + 1
		}
		if (upMins >= 60) {
			upMins = 0
			upHours = upHours + 1
		}
		if (upHours >= 24) {
			upHours = 0
			upDays = upDays + 1
		}
	}, 1000)
});


//
var upSecs = 0;
var upMins = 0;
var upHours = 0;
var upDays = 0;


//Welcome to new users
client.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  member.guild.defaultChannel.send(`Hoş geldin koca yürekli, ${member}!`);

  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Hoş geldin koca yürekli, ${member}`);
});



//Command argument
client.on('message', message =>{

var args = message.content.split(/[ ]+/);

//Saying Hell to User
if(commandIs("hello",message)){
    message.channel.send('Merhaba yiğidim, ' + message.author.username);
}

//Server info command 
if(commandIs("serverinfo",message)){

    message.reply("Server Id: " + message.guild.id);
    message.reply("Server Region: " + message.guild.region);
    message.reply("Server Owner: " + message.guild.owner.displayName);
    message.reply("Server Created At: " + message.guild.createdAt);
    message.reply("Server Member Count: " + message.guild.memberCount);
}
//User info command
if(commandIs("userinfo",message)){

    message.reply("User Id: " + message.author.id);
    message.reply("User Discriminator: " + message.author.discriminator);
    message.reply("User Registered Time: " + message.author.createdAt);
    message.reply("Server Avatar: " + message.author.avatarURL);
}
// random cat photos
if(commandIs("cat",message))
{
  	unirest.get("http://aws.random.cat/meow").end(res => {
		let image = "http://i.imgur.com/Bai6JTL.jpg";
		if(res.status==200) {
			image = res.body.file;
		}
		message.channel.send(image);
	});
}

// check the avatar of the mentioned user
if(commandIs("avatar",message))
{
    let userToavatar = message.mentions.users.first();
    message.channel.send(userToavatar.avatarURL);
  
}

if(commandIs("gif", message))
{
    var keyword = message.content
    if(keyword.split(' ')[0] == "/gif"){
        sb = keyword.substring(5)
        var url = "https://api.giphy.com/v1/gifs/random?api_key=ratfY2dxAmlJ1UnrzL0kj9lWOButeKpY&tag=" + sb + "&rating=R"
    unirest.get(url).end(res => {
        let image = "http://i.imgur.com/Bai6JTL.jpg";
        if(res.status == 200){
            image = res.body.data.embed_url;
        }
        message.channel.send(image);
    })
}
}

if (commandIs("agif",message)){
    var keyword = message.content
    if(keyword.split(' ')[0] == "/agif"){
        sb = keyword.substring(5) 
    var url = "http://www.sex.com/search/gifs?query=" + sb
    request(url,function(err, response, html)
    {
      if(!err)
      {
          const $ = cheerio.load(html)
          const gifs = $('#masonry_container .masonry_box').not('.ad_box')

          gifs.slice(0, 15).map((i, gif) => {
            const data = $(gif).find('a.image_wrapper');
            const url = data.find('img').data('src');
            urls.push(url)
          })
          console.log(urls.length)
          let image = ""
          image = urls[Math.floor(Math.random() * urls.length)]
          message.channel.send(image)
        }
        
    })
}
    urls = []
}

var sozler = ["Vakit mezhep, meşrep, etnik kimlik siyasetiyle ayrışma değil; bir olma, beraber olma, birbirimize kardeş olma vaktidir.",
              "Maaşım yetmediği için ticaret yapıyorum.",
              "Sermaye ırkçılığı yapıyorlar.",
              "Kriz teğet geçti.",
              "Böyle bağırılmaz ki! Artistlik yapma!"
]

if(commandIs("referandum",message))
{
    message.channel.send("Yarragimi ye,Baskan olup hepinizi s*** o.ç-ları,Biz  evet diyoruz.");
    message.channel.send('Sende Evet de eyyyyyy ' + message.author.username +"!");
}

if(commandIs("anan",message))
{
    message.channel.send('Hadi anani al git burdan ' + message.author.username +"!");
}
if(commandIs("uptime",message))
{
    message.channel.send("```Current Uptime: " + upDays + " Days " + upHours + " Hours " + upMins + " Minutes " + upSecs + " Seconds ```");
}
if(commandIs("evet",message))
{
    message.channel.send({
        files:[{
            attachment: 'C:/Users/nicat/Desktop/desktop/Bot/evet.jpg',
            name: 'evet.jpg'
        }]
    })
}
if(commandIs("çomar",message))
{
    message.channel.send({
        files:[{
            attachment: 'C:/Users/nicat/Desktop/desktop/Bot/comar.jpg',
            name: 'comar.jpg'
        }]
    })
    
}

if(commandIs("hayır",message))
{
    message.channel.send('Bu kanalda hayır diye oy veremezsin! İkinci defa !hayir diye yazda kick-i gör amk laiki!');
    message.channel.send({
        files:[{
            attachment: 'C:/Users/nicat/Desktop/desktop/Bot/middle.png',
            name: 'middle.png'
        }]
    })
    
}

if(commandIs("reis",message))
{
    
    message.channel.send({
        files:[{
            attachment: 'C:/Users/nicat/Desktop/desktop/Bot/reis.jpg',
            name: 'reis.jpg'
        }]
    })

}

if(commandIs("nedemis",message))
{
    var rand = sozler[Math.floor(Math.random() * sozler.length)];
    message.channel.send("Reis: " + rand);

}

//clear messages by entered value
if(commandIs("clear",message))
{
    var keyword = message.content
    if(keyword.split(' ')[0] == "/clear")
    {
        sb = keyword.substring(7) 
        messagecount = parseInt(sb + 1)
    if(message.channel.type == 'text')
    {
        message.channel.fetchMessages({limit: messagecount})
        .then(messages => {
            message.channel.bulkDelete(messages)
        })
    }
    }
}

//help command 
if(commandIs("help",message))
{
    message.channel.send( {
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          fields: [{
            name: 'Commands',
            value: ' List: \n \
            `hello` --      He bir selam ver\n \
            \n \
            `serverinfo` -- Bizim atalarimiz serverlerimizi karadan yürütdü bee!\n \
            \n \
            `userinfo` --   Soy ağacı\n \
            \n \
            `cat` --        Şapşik kediler <3 \n \
            \n \
            `kick @user` -- Arkadaşı bi pisten alalım\n \
            \n \
            `referandum` -- Evet diye oy vermeyen teröristtir. \n \
            \n \
            `hayir` --      Denede Gör Amk Laiki Seni!\n \
            \n \
            `evet` --       Yüce Türk Halkı Seni Korusun Evlat! \n \
            \n \ '

            
          }
        ],
         }
})

message.channel.send( {
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      fields: [{
        name: 'Commands',
        value: 'List: \n \
        `avatar @user`-- Kötü amaçların için Kullanma ey evladı-osmanlı User@ \n \
        \n \
        `anan`    --    Anlarsin sen ;)  \n \
        \n \
        `clear`(rakam) -- Çoçukları yolluycam bi baksınlar oralara \n \
        \n \
        `nedemis` --   Benim ateşli sözlerim \n \
        \n \
        `reis`    --   Ayar veriyorken ben \n \
        \n \
        `uptime`  --   Biz kolay-kolay düşmeyiz \n \
        \n \
        `gif`     --   İşte benim hareketli resimlerimede burdan baka bilirsin \n \
        \n \
        `agif`    --   Ayıp şeyler var burda fazla elleme \n \ '
        
      }
    ],
     }
})
}

//kick the user
if(commandIs("kick",message))
{
    if(message.member.hasPermission('KICK_MEMBERS'))
    {
     let userToKick = message.mentions.users.first();
    message.guild.member(userToKick).kick();
    message.channel.send(userToKick+ " is Kicked");
    message.channel.sendFile('sorry.jpg');
    }else{
    message.channel.send("You Don't Have permission");

    }
  
}



//End of the client.on argument
});

//Token of Bot
client.login('Mjk2OTY2NjM5MDAwNDg1ODky.DccsEw.WkP300a-CCQmU2L29nm6nFlapgA');