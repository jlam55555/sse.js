var util = require('util')
  , events = require('events')
  , SSEClient = require('./sseclient');

function SSE() {}
util.inherits(SSE, events.EventEmitter);

SSE.prototype.handleRequest = function(req, res, data) {
  var client = new SSEClient(req, res);
  client.initialize();
  client.data = data;
  this.emit('connection', client);
}

module.exports = SSE;
module.exports.Client = SSEClient;
