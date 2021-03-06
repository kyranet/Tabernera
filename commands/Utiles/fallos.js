﻿const Comando = require('../../estructuras/Comando');
const Discord = require('discord.js');

module.exports = class extends Comando {

    constructor(...args) {
        super(...args, {
            name: 'reporte',
            runIn: ['text'],
            requiredSettings: ['reportes'],
	        permLevel: 3,
            description: 'Avisa a un moderador sobre un fallo o un usuario que incumple las normas.',
            usage: '<fecha:str> <hora:str> <usuario:user> <desc:str> [...]',
            usageDelim: ', ',
            extendedHelp: '+reporte 27/03/2018, 14/02, @Hero#2501, Pruebas',
            comando: '+reporte <dd/mm/yyyy>, <hh:mm>, <@Usuario> <Descripción>',
            opcional: ['```md',
                         `* Los reportes son anonimos, ni tu los vas a ver.`,
                         '```']
        });
    }


    async run(msg, [fecha, hora, usuario, ...descripcion]) {
        const canal = msg.guild.channels.get(msg.guild.configs.reportes);

	var horaSeparada = fecha.split("/");
	if(horaSeparada.length != 3) {
		return msg.send("Error de formato, dd/mm/yyyy");
	}
        if (!horaSeparada[0].length == 2 || !horaSeparada[1].length == 2 || !horaSeparada[2].length == 4 ) {
		return msg.send("Error de formato, dd/mm/yyyy");
	}
	var horaSeparada = hora.split(":");
	if(horaSeparada.length != 2) {
		return msg.send("Error de formato, hh:mm");
	}
        if (!horaSeparada[0].length == 2 || !horaSeparada[1].length == 2) {
		return msg.send("Error de formato, hh:mm");
	}

        descripcion = `${descripcion.join(' ')}`;

        if (!canal || canal.postable === false)
            return msg.send('Por favor, reestablezca un canal, ya que éste ha sido borrado o no puedo mandar mensajes en él.');
        console.log(msg.id);
            const embedReporte = new Discord.MessageEmbed()
            .setColor(0x3785df)
            .setAuthor(msg.author.username, msg.author.avatarURL)
	    .addField("**Usuario reportado:** " + usuario.tag, "**Descripción:** " + descripcion)
            .addField("**Fecha y hora:** " + hora +" a las " + hora3, "**ID del reporte:** " + msg.id);
            
            msg.send("Tu reporte se ha subido, ahora tiene que ser evaluado");
            canal.send('Nuevo reporte recibido:');
            msg.delete(2000);
            canal.send({embed : embedReporte});
            return canal.send("[<@&406051816950726656>]");
    }

};
