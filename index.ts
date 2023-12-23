import {randomUUID} from 'crypto'
import {Server} from 'socket.io';

const io = new Server({
    cors: {
        origin: "*"
    }
});


type Room = {
   roomName: string,
   users : string[],
   roomid: string
}



const rooms: Room[] = [];

//@ts-ignore

io.on('connection', (socket)=>{

    console.log("new connection", socket.id)

    socket.on('disconnect', ()=>{
        console.log("disconnected", socket.id)
    })

    socket.emit('rooms', rooms);
    
    socket.on('create room', (roomName: string)=>{
        rooms.push({
            roomName: roomName,
            users : [],
            roomid: randomUUID()
        });
        io.emit("rooms", rooms)
    });


    socket.on('join room', (roomid: string)=>{
       const room = rooms.find((room)=> room.roomid === roomid);
       if(room){
        room.users.push(socket.id)
        socket.join(roomid);
       }
    });

    socket.on('leave room', (roomid)=>{

    });
})

io.listen(3000);
console.log("server started at port 3000");
