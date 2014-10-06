(function() {

var Module = require('./module'),
  HallIO = require('./io'),
  HallSession = require('./session'),
  HallUserAgent = require('./user_agent'),
  HallUserAgent = require('./rest_client'),

  debug = require('debug')('hall:client'),

  Hall = Module.extend({

    io : null,
    ua : require('./user_agent'),

    initialize : function(options) {
      debug('initializing the hall client');
      var me = this;
      me.set(options);
      if (options && options.ua && options.ua.meta) {
        HallUserAgent.set({ meta : options.ua.meta });
      }
      me.session = new HallSession(options);
      me.io = new HallIO({
        session : me.session
      });
      Module.prototype.initialize.apply(me,this);
      return me;
    },

    // Send a message to a room
    sendMessage : function(room_id, room_type, string) {
      var me = this;
      me.io.sendMessage.apply(me,arguments);
      return me;
    },

    // Make a generic request to Hall
    fetch : function (endpoint, callback) {
      var me = this,
        token = me.session.attributes.api_token;
      RestClient.fetch(endpoint, token, callback);
      return me;
    },

    // Fetch a list of group rooms
    fetchRooms : function (callback) {
      var me = this,
        token = me.session.attributes.api_token;
      RestClient.fetch(token, callback);
      return me;
    },

    // Fetch a list of pair rooms
    fetchChats : function (callback) {
      var me = this,
        token = me.session.attributes.api_token;
      RestClient.fetch(token, callback);
      return me;
    },

    // Fetch a list of room members for a group room
    fetchRoomMembers : function (roomId, callback) {
      var me = this,
        token = me.session.attributes.api_token;
      RestClient.fetchRoomMembers(roomId, token, callback);
      return me;
    }

  });

  module.exports = Hall;

}).call(this);
