
import io from 'socket.io-client';
import { actions as messageSliceActions } from '../slices/messagesSlice';
import { actions as channelsSliceActions } from "../slices/channelsSlice"
import store from './../slices/index'

let socket = null

export const createNewSocketConnection = () => {
    if (socket === null) {
        socket = io()

        socket.on('connect', () => {
        });


        socket.on("newMessage", (data) => {
            store.dispatch(messageSliceActions.addMessage(data));
        })

        socket.on("newChannel", (data) => {
            store.dispatch(channelsSliceActions.addChannel(data));
        })

        socket.on("removeChannel", (data) => {
            store.dispatch(channelsSliceActions.removeChannel(String(data.id)));
        })

        socket.on("renameChannel", (data) => {
            store.dispatch(channelsSliceActions.updateChannel({ id: String(data.id), changes: { name: data.name } }));
        })

        // socket.on('disconnect', () => {
        //     // setIsConnected(false);
        // });

        // socket.on('pong', () => {
        //     // setLastPong(new Date().toISOString());
        // });
    }
    return socket
}
