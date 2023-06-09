import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
    public socketClient: Socket;

    constructor() {
        this.socketClient = io("http://localhost:5433");
    }
    onModuleInit() {
       this.registetConsumerEvents();
    }

    private registetConsumerEvents() {
        this.socketClient.on('connect', () => {
            console.log("Connected to Gateway");
            this.socketClient.emit('newMessage', { msg: 'hey there!' });
        });
        this.socketClient.on('onMessage', (payload: any) => {
            console.log(payload)
        });
    }
}