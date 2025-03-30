import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port : 8080 });

interface User {
    socket : WebSocket;
    room : string;
}

let allSockets : User[] = [];

wss.on("connection", (socket) => {
    socket.on("message",(message)=>{
       const parseMessage = JSON.parse(message as unknown as string);
       if(parseMessage.type == "join")
       {
        allSockets.push({
            socket,
            room :parseMessage.parse.roomId
        })
       }
       if(parseMessage.type == "chat"){
        //   const currentUserRoom = allSockets.find((x) => x.socket == socket)
             let currentUserRoom = null;
             for(let i = 0 ; i < allSockets.length ; i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].room
                }
             }
             for(let i = 0; i < allSockets.length; i++){
                if(allSockets[i].room == currentUserRoom){
                    allSockets[i].socket.send(parseMessage.payload.message)
                }
             }
       }
    })

    socket.on("disconnected", () => {
       
    })
})
