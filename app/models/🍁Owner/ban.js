require("🌟/config/index.js");
const ppth = require("path");
const tpth = ppth.basename(__filename);
const currFile = tpth.slice(0, -3).toLowerCase();

module.exports = async (
  BloomBot,
  Sockey,
  gmeta,
  isAdmin,
  groupName,
  isbotAdmin,
  groupAdmins,
  participants
) => {
  await BloomBot.sendMessage(Sockey.chat, {
    react: {
      text: "🌻",
      key: Sockey.key,
    },
  });

  try {
    switch (true) {
      case !BloomBot.byMyself && !BloomBot.isSudo:
        await BloomBot.sendMessage(Sockey.chat, {
          react: {
            text: "❌",
            key: Sockey.key,
          },
        });
        return Sockey.reply(
          `*😥Apologies:* _${BloomBot.pushname || BloomBot.tagname}_
*❌Error:* 
• _Owner Only Command!_`
        );

      case BloomBot.mentionByReply:
        const repliedPerson =
          BloomBot.mtype == "extendedTextMessage" &&
          BloomBot.message.extendedTextMessage.contextInfo != null
            ? BloomBot.message.extendedTextMessage.contextInfo.participant || ""
            : "";
        const repliedPersonNum = repliedPerson.substring(
          0,
          repliedPerson.length - 15
        );
        BloomBot.userBanCheck.findOne(
          {
            Id: repliedPerson,
          },
          async (error, userBan) => {
            if (error) return BloomBot.handlerror(BloomBot, Sockey, error);
            if (!userBan) {
              new BloomBot.userBanCheck({
                Id: repliedPerson,
              }).save();
              return Sockey.reply(
                `*🔒Status:* @${repliedPersonNum} has been banned and won't respond to that Dumbo!`
              );
            } else {
              return Sockey.reply(
                `*🔒Status:* @${repliedPersonNum} is already banned!`
              );
            }
          }
        );
        break;

      case BloomBot.args[0] && BloomBot.args[0].startsWith("@"):
        const mention = BloomBot.mentionByTag;
        const 𝕻𝖊𝖗𝖘𝖔𝖓 =
          (await mention[0]) || BloomBot.msg.contextInfo.participant;
        BloomBot.userBanCheck.findOne(
          {
            Id: 𝕻𝖊𝖗𝖘𝖔𝖓,
          },
          async (error, userBan) => {
            if (error) return BloomBot.handlerror(BloomBot, Sockey, error);
            if (!userBan) {
              new BloomBot.userBanCheck({
                Id: 𝕻𝖊𝖗𝖘𝖔𝖓,
              }).save();
              return Sockey.reply(
                `*🔒Status:* @${mention} has been banned and won't respond to that Dumbo!`
              );
            } else {
              return Sockey.reply(
                `*🔒Status:* @${mention} is already banned!`
              );
            }
          }
        );
        break;

      case !BloomBot.mentionByReply &&
        !BloomBot.args[0] &&
        !BloomBot.args[0].startsWith("@"):
        BloomBot.userBanCheck.findOne(
          {
            Id: Sockey.chat,
          },
          async (error, userBan) => {
            if (error) return BloomBot.handlerror(BloomBot, Sockey, error);
            if (!userBan) {
              new BloomBot.userBanCheck({
                Id: Sockey.chat,
              }).save();
              return Sockey.reply(
                `*🔒Status:* ${groupName}\nGroup Has Been Banned!`
              );
            } else {
              return Sockey.reply(
                `*🔒Status:* ${groupName}\nGroup is already banned!`
              );
            }
          }
        );
        break;

      default:
        await BloomBot.sendMessage(Sockey.chat, {
          react: {
            text: "❌",
            key: Sockey.key,
          },
        });
        return Sockey.reply(
          `*😥Apologies:* _${BloomBot.pushname || BloomBot.tagname}_
*❌Error:* 
• _Could not find any context!_

*🌻Usage:* 
• _${BloomBot.prefix}${currFile} reply to person to ban_
• _${
            BloomBot.prefix
          }${currFile} don't reply to anyone and group will be banned_`
        );
    }
  } catch (error) {
    return BloomBot.handlerror(BloomBot, Sockey, error);
  }
};

module.exports.aliases = [];
