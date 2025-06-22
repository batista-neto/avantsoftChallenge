import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import base64 from 'react-native-base64';

const mock = new MockAdapter(axios);

mock.onPost('http://187.20.102.113:8080/auth/login').reply((config: any): any => {
  const { headers } = config;
  if (headers){
    const authorizationHeader = headers.Authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Basic')) {
    const credentials = base64.decode(authorizationHeader.split(' ')[1]);
    const [username, password] = credentials.split(':');

    if (username === 'joao@email.com' && password === 'joao123') {
        return [200, { token: 'AccessTokenJoao', userId: 1 }];
    } else {
        return [401];
    }
  }
  }
});

export default axios;