const express = require('express')
const bodyParser = require('body-parser')
const ctrl = require('./controllers/messages_controller')

let app = express();
app.use(bodyParser.json());
app.use(ctrl.allowCrossDomain);
// app.use( express.static( __dirname + '/../public/build' ) );


app.get('/api/messages/', ctrl.read)
app.post('/api/messages/', ctrl.create)
app.put('/api/messages/:id', ctrl.update)
app.delete('/api/messages/:id', ctrl.delete)

let port = 3001;
app.listen(port, ()=>console.log(`The Khala speaks to you on ${port}, friend.`))