class Player {
    constructor(id, name, roomId) {
      this.id = id;
      this.name = name;
      this.roomId = roomId;
      this.points = 0;
      this.isZar = false
    }
  }

  module.exports = { Player };