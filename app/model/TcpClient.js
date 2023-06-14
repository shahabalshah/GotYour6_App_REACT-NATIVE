import TcpSocket from 'react-native-tcp-socket';

class TcpClient {
  constructor() {
    this.client = null;
  }

  connect() {
    this.client = TcpSocket.createConnection(
      {
        host: 'gotyour693.com',
        port: 3000,
      },
      () => {
        console.log('Connected to server!');
        // You can handle additional logic here upon successful connection
      },
    );

    this.client.on('data', this.handleData);
    // You can listen to more events like 'error', 'close', etc., and handle them accordingly
  }

  sendCommand(command) {
    if (this.client) {
      this.client.write(command);
    }
  }

  handleData = (data) => {
    const receivedData = data.toString();
    // You can handle the received data and pass it to the appropriate screen/component using callbacks, events, or state management libraries like Redux
  }

  disconnect() {
    if (this.client) {
      this.client.destroy();
      this.client = null;
      console.log('Disconnected from server')
    }
  }
}

export default new TcpClient();
