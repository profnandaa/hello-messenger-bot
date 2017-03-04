const app = require('./app');

let port = process.env.PORT || '7070';

app.listen(port, function() {
    console.log('App running on port ' + port);
});