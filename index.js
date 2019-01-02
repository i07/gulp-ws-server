const webSocket = require('ws');

const defaultConfig = {
  url: 'ws://localhost',
  port: '4000',
  path: '/ws'
};

function send(wss, message) {
  wss.clients.forEach(client => {
    if (client.readyState === webSocket.OPEN) {
      client.send(message)
    }
  })
}

function gws(config) {
  config = Object.assign(defaultConfig, config);
  let wss = new webSocket(config, _ => {

  });

  wss.on('connection', ws => {
    console.log('starting connection', ws)
  });

  wss.on('error', err => {
    console.log(err);
  });

  wss.send = send.bind(wss, wss);

  return wss;
}

module.exports = exports = gws;
