import { Socket } from "socket.io";
const {Server} = require("socket.io");
import {randomUUID} from 'crypto'


type Room = {
   roomName: string,
   users : string[],
   roomid: string
}

const io = new Server(3000, {

});

const rooms: Room[] = [];


io.on('connection', (socket: Socket)=>{
    
    socket.on('create room', (roomName: string)=>{
        rooms.push({
            roomName: roomName,
            users : [],
            roomid: randomUUID()
        });
        socket.join(roomName);
    });

    socket.on('get rooms', ()=>{
        socket.emit('rooms',
        rooms.map((room: Room)=> ({name: room.roomName, id: room.roomid})
        ));
    });

    socket.on('join room', (roomid)=>{
       const room = rooms.find((room)=> room.roomid === roomid);
       if(room){
        room.users.push(socket.id)
        socket.join(roomid);
       }
    })
})