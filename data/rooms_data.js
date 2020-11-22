const room =require("./Models/room")
const {getPlayerById}=require("./players_data")
const rooms = [];


//Create
const createRoom = roomId => {
  const myRoom = new room.Room(roomId);
  rooms.push(myRoom);
  return myRoom;
}

const getTotalRooms = () => {
  return rooms;
}
const getRoomById = roomId => {
  return rooms.find(room => room.Id == roomId)
}

const getRoomByPlayerId = playerId => {
  return rooms.find(room => room.players.foreach(player => player.id == playerId))
}

const getPlayersByRoomId = roomId => {
  const myRoom = getRoomById(roomId);
  return myRoom.players;
}

const deletePlayerOfRoom = playerId => {
  const myRoom = getRoomByPlayerId(playerId);
  const myPlayer = getPlayerById (playerId);
  const playersOfMyRoom = getPlayersByRoomId(myRoom.id);
  const index =  playersOfMyRoom.indexOf(myPlayer);
  playersOfMyRoom.splice(index, 1);
}

const updateRoom = room => {
 //
}

module.exports = {
  createRoom,
  getTotalRooms,
  getRoomById,
  getRoomByPlayerId,
  getPlayersByRoomId,
  deletePlayerOfRoom,
}
