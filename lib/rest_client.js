var url = require('url'),
  http = require('http'),
  https = require('https');

(function() {
  var RestClient = {
    // Make a generic request to Hall
    fetch : function (endpoint, apiToken, callback) {
      var uri = url.parse(process.env.NODE_HALL_API_URL || 'https://hall.com/api/1'),
        protocol = uri.protocol,
        hostname = uri.hostname,
        port = uri.port,
        client = (protocol === 'https') ? https : http;
        req;

      req = client.request(
        {
          hostname: hostname,
          port: port,
          path: endpoint + '?user_api_token=' + apiToken,
          method: 'GET'
        },
        function (res) {
          var chunks = [];

          if (res.statusCode >= 400 && res.statusCode < 600) {
            callback(new Error('Got a status code of ' + res.statusCode));
            return;
          }

          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            chunks.push(chunk);
          });

          res.on('end', function () {
            callback(null, JSON.parse(chunks.join('')));
          });
        });

      req.on('error', function (err) {
        callback(err);
      });

      req.end();
    },

    // Fetch a list of group rooms
    fetchRooms : function (apiToken, callback) {
      RestClient.fetch('/rooms/groups', apiToken, callback);
    },

    // Fetch a list of pair rooms
    fetchChats : function (apiToken, callback) {
      RestClient.fetch('/rooms/chats', apiToken, callback);
    },

    // Fetch a list of room members for a group room
    fetchRoomMembers : function (roomId, apiToken, callback) {
      RestClient.fetch('/rooms/groups/' + roomId + '/room_members', apiToken, callback);
    }
  };

  module.exports = RestClient;
}).call(this);

