node-hall-client
================

A Hall realtime client build for node.js. The client allows you to listen to
your global stream of events on Hall and post messages to any of your rooms.

### Installation

    npm install hall-client

or

    # in package.json
    "dependencies": {
      "hall-client": "latest"
    }

### Usage

You can use environment variables or an options hash when instantiating a Hall
client.

```javascript
var bot = new Hall({
  email: 'REPLACE ME', // Also can be set using process.env.HALL_EMAIL
  password: 'REPLACE ME', // Also can be set using process.env.HALL_PASSWORD
  ua: {
    meta: 'Hall-Client-Adapter-Test'
  }
});
```

Clients can listen for the following events:

```javascript
bot.on('error', function (err) {
  console.log('Bot error occurred', err);
});

bot.io.on('connected', function () {
  console.log('Bot connected', err);
});
```

If the connection closes, it will attempt to reconnect.

```javascript
You can also listen to a number of Hall-specific events:

// Some event types you can listen to:
//
// * NETWORK_MEMBER_ADD
// * NETWORK_MEMBER_REMOVE
// * ROOM_NEW
// * ROOM_UPDATE
// * ROOM_DELETE
// * ROOM_ITEM_NEW
// * ROOM_ITEM_UPDATE
// * ROOM_ITEM_DELETE
// * ROOM_MEMBER_ADD
// * ROOM_MEMBER_REMOVE
// * USER_CONNECTED
// * USER_DISCONNECTED
// * USER_STATUS_UPDATE
// * USER_TYPING_START
// * USER_TYPING_STOP
// * USER_UPDATE
// * USER_IDLE
// * USER_ACTIVE
// * ATTACHMENT_CREATE
//
bot.io.on('ROOM_ITEM_NEW', function (data) {
  console.log('Received message', data)
})
```

Your bot can send messages to a room.

```javascript
// roomId is the id of the room
// roomType is the type of the room. Either "rooms" or "chats"
// message is some text
bot.sendMessage(roomId, roomType, message);
```

Your bot can make REST requests to certain endpoints on Hall.

```javascript
bot.fetchRooms(function (err, data) {
  console.log('Fetched rooms', data);
});

bot.fetchChats(function (err, data) {
  console.log('Fetched chats', data);
});

bot.fetchRoomMembers(roomId, function (err, data) {
  console.log('Fetched chats', data);
});
```

