const webSocket = require('ws');
const log = require('fancy-log');

const defaultConfig = {
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
  let wss = new webSocket.Server(config, _ => {});

  wss.on('connection', ws => {
    log('starting connection')
  });

  wss.on('error', err => {
    log.error(err);
  });

  wss.send = send.bind(wss, wss);

  return wss;
}

module.exports = exports = gws;
