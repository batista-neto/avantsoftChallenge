import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import base64 from 'react-native-base64';
import { mockResponse } from './mockResponse';

const mock = new MockAdapter(axios);
const url = process.env.EXPO_PUBLIC_BASE_URL

mock.onPost(`${url}/auth/login`).reply((config: any): any => {
  const { headers } = config;
  if (headers){
    const authorizationHeader = headers.Authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Basic')) {
    const credentials = base64.decode(authorizationHeader.split(' ')[1]);
    const [email, password] = credentials.split(':');

    const user = mockResponse.data.clientes.find(
        (u) => u.info.detalhes.email === email && u.info.detalhes.password === password
      );
      
    if (user) {
        return [200, { token: 'AccessToken' }];
    } else {
        return [401];
    }
  }
  }
});

mock.onPost(`${url}/user`).reply((config) => {
    const { data } = config;
  
    if (data) {
      const {
        name,
        email,
        password,
        dateOfBirth
      } = JSON.parse(data);
  
      if (name && email && password && dateOfBirth) {
        const exists = mockResponse.data.clientes.find(user => user.info.detalhes.email === email);
        if (exists) {
          return [409, { message: 'User already exists' }];
        }
        const payload = {
            "info": {
                "nomeCompleto": name,
                "detalhes": {
                    "email": email,
                    "password": password,
                    "nascimento": dateOfBirth
                }
            },
            "estatisticas": {
                "vendas": []
            }
        }

        mockResponse.data.clientes.push(payload);

        mockResponse.meta.registroTotal += 1;
  
        return [201, { message: 'Registration completed successfully!' }];
      } else {
        return [400, { message: 'Fill in all fields correctly' }];
      }
    }
  
    return [400, { message: 'Error processing request' }];
  });

export default axios;