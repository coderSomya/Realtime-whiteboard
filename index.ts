import {createServer} from "http";

const server = createServer();
const wss = new WebSocket.Server({
    server: server
});

wss.on("connection", (ws)=>{
    
})

