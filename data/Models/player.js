class Player {
    constructor(name, roomId) {
      this.name = name;
      this.rooomId = roomId;
      this.points = 0;
      //this.socketId = socketId;
      this.isZar = false
    }
  }

  module.exports = { Player };