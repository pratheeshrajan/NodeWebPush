const express = require('express');
const webpush = require('web-push');
const serve   = require('express-static');
var path = require('path');



//const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
//const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Replace with your email
webpush.setVapidDetails('mailto:pratheeshrajan18@gmail.com', 'BFJFFn3gryJVwNO2qJYbdnYiJWdQdNx-iW42fT5aGG8m7GRcKNSRwIOxI_Xo_U39wvtk1p-KH8xGrzux4x1rmQs', '_NvUgJF8Mh0V4bxkR3NhJZdKrl0tIjAjk_vZGGNMwok');


const app = express();

app.use(require('body-parser').json());

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' });

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});


app.get('/subscribe', function (req, res) {
  res.send('hello subscribe')
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('public'))

var port = 5000;
app.listen(port);
console.log('listening in port:',port);
