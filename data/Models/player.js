class Player {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.roomId = '';
      this.points = 0;
      this.isZar = false
    }
  }

  module.exports = { Player };