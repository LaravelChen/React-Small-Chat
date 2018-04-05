import Config from "./config";

const webSocket = new WebSocket(Config.statics.WEBSOCKET_ADDRESS);

export default webSocket;