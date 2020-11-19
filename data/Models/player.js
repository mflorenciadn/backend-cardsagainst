class Player {
    constructor(id, name, roomId) {
      this.id = id;
      this.name = name;
      this.roomId = roomId;
      this.points = 0;
<<<<<<< HEAD
      this.role = 'player';
=======
      //this.socketId = socketId;
      this.isZar = false
>>>>>>> a9943843f1e71817cb04870a1f09e0ec252609a7
    }
  }

  module.exports = { Player };