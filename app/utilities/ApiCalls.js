import {BASE_URL} from './AppUrls';

export const postData = async (endpoint, data) => {
  console.log('api hit ', endpoint);
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // console.log('response................', response);
    if (!response.ok) {
      console.log('Error');
    }

    const responseData = await response.json();
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getData = async (endpoint, data) => {
  console.log('api hit ', endpoint);

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    // console.log('response................', response);
    if (!response.ok) {
      console.log('Error');
    }

    const responseData = await response.json();
    // console.log('responseData', responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
