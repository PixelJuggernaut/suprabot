const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const password = require('password-gen-v1');
if (context.params.event.content.startsWith(`!passgen`)) {
  const pass = password.newPassword(17, 'abcdefghijklmnopqrstuvwxyz', ':-_');
  await lib.discord.users['@0.1.3'].dms.create({
  recipient_id: `${context.params.event.author.id}`,
  content: `<@!${context.params.event.author.id}> Here Is Your Newly Generated Password | ${pass} `,
  });
}
