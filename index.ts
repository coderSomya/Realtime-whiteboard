import { randomUUID } from "crypto";
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});

type Room = {
  roomName: string;
  users: string[];
  room_id: string;
};

const rooms: Room[] = [
    {
        roomName: 'room1',
        room_id: 'test',
        users: [],
    },
];

//@ts-ignore

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.emit("rooms", rooms);

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });

  socket.on("create_room", (roomName: string) => {
    rooms.push({
      roomName: roomName,
      users: [],
      room_id: randomUUID(),
    });
    io.emit("rooms", rooms);
  });

  socket.on("join_room", (room_id: string) => {
    const room = rooms.find((room) => room.room_id === room_id);
 
    if (room) {
      room.users.push(socket.id);
      socket.join(room_id);
    }
  });

  socket.on("state_change", ({ state, room_id }) => {

    socket.broadcast.to(room_id).emit("state_change", state);
  });
});

io.listen(3000);
console.log("server started at port 3000");
