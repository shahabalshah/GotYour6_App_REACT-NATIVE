export const formatLocationResponse=(response)=> {
  const formattedResponse = response.slice(1, -1);

// Split the response by comma
const responseParts = formattedResponse.split(',');

// Extract the values
const messageType = responseParts[0].substring(0, 2);
const identifier = responseParts[0].substring(3);
const success = responseParts[3] === 'A';

let formattedData = {};

if (success) {
  const networkType = responseParts[1];
  const timestamp = responseParts[2];
  const latitude = responseParts[4];
  const longitude = responseParts[6];
  const direction = responseParts[7];
  const hdop = responseParts[8];
  const speed = responseParts[9];
  const course = responseParts[10];
  const satellites = responseParts[11];
  const imei = responseParts[13];
  const operator = responseParts[14];
  const mcc = responseParts[15];
  const mnc = responseParts[16];
  const lac = responseParts[17];
  const cid = responseParts[18];
  const rssi = responseParts[19];

  formattedData = {
    messageType,
    identifier,
    success,
    networkType,
    timestamp,
    latitude,
    longitude,
    direction,
    hdop,
    speed,
    course,
    satellites,
    imei,
    operator,
    mcc,
    mnc,
    lac,
    cid,
    rssi,
  };
  return {coordinates:[longitude,latitude],status:'success',direction:direction}
} else {
  const networkType = responseParts[1];
  const timestamp = responseParts[2];
  const gpsStatus = responseParts[4];
  const gsmStatus = responseParts[5];
  const hdop = responseParts[6];
  const latitude = responseParts[7];
  const longitude = responseParts[8];
  const altitude = responseParts[9];
  const speed = responseParts[10];
  const course = responseParts[11];
  const satellites = responseParts[12];
  const imei = responseParts[14];
  const operator = responseParts[15];
  const mcc = responseParts[16];
  const mnc = responseParts[17];
  const lac = responseParts[18];
  const cid = responseParts[19];
  const rssi = responseParts[20];

  formattedData = {
    messageType,
    identifier,
    success,
    networkType,
    timestamp,
    gpsStatus,
    gsmStatus,
    hdop,
    latitude,
    longitude,
    altitude,
    speed,
    course,
    satellites,
    imei,
    operator,
    mcc,
    mnc,
    lac,
    cid,
    rssi,
  };
  return {coordinates:[0,0],status:'fail'}
}

}

  export const formatConnectionResponse=(response)=> {
    // Remove square brackets from the response
    const formattedResponse = response.slice(1, -1);
  
    // Split the response by comma
    const responseParts = formattedResponse.split(',');
  
    // Extract the values
    const messageType = responseParts[0].substring(0, 2);
    const identifier = responseParts[0].substring(3);
    const code = responseParts[1];
    const status = responseParts[2];
    const batteryLevel = responseParts.slice(3).map(Number)[0];
  
    // Create the formatted object
    const formattedData = {
      messageType,
      identifier,
      code,
      status,
      batteryLevel
    };
  
    // Convert the object to JSON string
    
    return batteryLevel;
  }