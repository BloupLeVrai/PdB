const Discord = require("discord.js");

const Client = new Discord.Client

const prefix = "le/les caractère(s) à indiquer avant la commande";

Client.on("ready", () => {
    console.log("Message à afficher en console au lancement du bot");
    Client.user.setActivity("Activité/statut du bot");
    
});

Client.on("guildMemberAdd", member => {
    console.log("Il y a un nouveau membre"); 
    member.guild.channels.cache.find(channel => channel.id === "id du salon qui annonce les arrivées").send(member.displayName + " Message de bienvenue")
    });



Client.on("guildMemberRemove", member => {
    console.log("Il y a un membre qui est parti");
    member.guild.channels.cache.find(channel => channel.id === "id du salon qui annonce les départ").send(member.displayName + " Message d'au revoir");
});

Client.on("message", message => {
    if(message.author.bot) return;
    
    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Il y a eu un problème lors de la mention du memebre, veuillez réessayer...");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send("Ce membre a été banni.");
                }
                else {
                    message.reply("Ce membre ne peut être banni, car son rôle est trop haut placé pour moi.")
                }
            }
        }

        if(message.content == prefix + "dwrite"){
            message.channel.send("@everyone\nPetit rappel: \nSi vous n'avez pas de micro ou que vous ne pouvez pas parler sous peine de vous faire daronner, vous pouvez écrire dans le salon <#841727954815287296> \nCeci était un message de <@840908312324603904>\nClint, terminé");
        }

        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Il y a un problème, j'arrive pas à trouver celui que tu as mentionné");

            }
            else {
                mention.roles.add("845357497236848650")
                message.reply("C'est bon, j'ai réussi! Bon je vais essayer de le raisonner (je dis bien essayer) \nFais gaffe dans le futur" + mention.displayName)
            }
        }      
    }
    
    var embedping = new Discord.MessageEmbed()
        .setTitle("Pong 🏓")

    var embed = new Discord.MessageEmbed()
        .setColor("#FF3399")
        .setTitle(prefix + "help")
        .setDescription("Voici les commandes qui sont disponibles: \n " + prefix + "nom de la commande"

    //commande help
    if(message.content == prefix + "help"){
        message.channel.send(embed);
        console.log("Commande help utilisée par " + message.author.username)
    }
    if(message.channel.type == "dm"){
        message.channel.send("Réponse aux commandes en mp")
    }

    //command user infos
    if(message.content == prefix + "userinfos"){
        message.channel.send("Nom d'utilisateur: " + message.author.username + "\n Identifiant: " + message.author.id )
        console.log("Commande infos utilisateur utilisée par " + message.author.username)
        message.react("841341534367645709");
        return;
    }

    //commande ping
    if(message.content == prefix + "ping"){
        message.channel.send(embedping)
        message.react("🏓")
        console.log("Commande ping utilisée par " + message.author.username)
        console.log("Réaction ajoutée au message de " + message.author.username)
    }
    
    

    if(message.content.startsWith("Salut")){
        let mention = message.mentions.members.first();
        message.react("👋")
        if(message.author.bot){
            return;
        }
        if(mention == undefined){
            message.reply("Salut")
        }
        else {
            message.channel.send(mention.displayName + ", " + message.author.username + " te dit bonjour!")
        }
    }

    if(message.content.startsWith(prefix + "userinfos")){
        let mention = message.mentions.members.first();
        if(mention == undefined){
            message.reply("Mauvaise mention, ou utilisateur indisponible")
        }
        else {
            message.channel.send("Nom d'utilisateur: " + mention.displayName + "\nIdentifiant: " + mention.id)
        }
    }
    
    

});



Client.login("Token du bot")
