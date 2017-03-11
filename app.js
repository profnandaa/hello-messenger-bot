const http = require('http')
const Bot = require('messenger-bot')

// load the ENV variables
require('dotenv').config();

let bot = new Bot({
    token: process.env.PAGE_TOKEN,
    verify: process.env.VERIFY_TOKEN,
});

bot.on('error', (err) => {
    console.log(err.message)
})

bot.on('message', (payload, reply) => {
    let text = 'you said: ' + payload.message.text

    bot.getProfile(payload.sender.id, (err, profile) => {
        if (err) throw err

        reply({ text }, (err) => {
            if (err) {
                console.log('err:', err);
                throw err;
            }

            console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
        })
    })
})

let port = process.env.PORT || 7070;

http.createServer(bot.middleware()).listen(port);