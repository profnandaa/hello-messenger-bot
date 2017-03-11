/**
 * Sample standalone bot that echoes back message sent to it
 * Tutorial -  https://sumwu.me/…/9/how-to-create-a-facebook-messenger-bot/
 */
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
        /*
        You might get a similar error (as below). Make sure you are an admin or developer 
        (see the Roles section of your Bot's dashboard):
        
        { message: '(#10) Cannot message users who are not admins, developers or testers of the app until pages_messaging permission is reviewed and the app is live.',
            type: 'OAuthException',
            code: 10,
            error_subcode: 2018028,
            fbtrace_id: '---' }
            */
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

http.createServer(bot.middleware()).listen(3000)