const http = require('http');
const Bot = require('messenger-bot');

// load the ENV variables
require('dotenv').config();

let bot = new Bot({
    token: process.env.PAGE_TOKEN,
    verify: process.env.VERIFY_TOKEN,
});

console.log('here');

bot.on('error', (err) => {
    console.log('err:', err.message)
})

bot.on('message', (payload, reply) => {
    let text = 'you said: ' + payload.message.text;

    bot.getProfile(payload.sender.id, (err, profile) => {
        if (err) {
            console.log('err: ', err);
            throw err;
        }

        reply({ text }, (err) => {
            if (err) {
                console.log('err: ', err);
                throw err;
            }

            console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
        })
    })
})

module.exports = bot;