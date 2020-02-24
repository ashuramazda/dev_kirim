import React, {Component} from 'react';
import cryptlib from 'cryptlib';
import globals from './Constants';

const shaKey = cryptlib.getHashSha256(globals.key, 32);
// const API_URL = 'http://206.189.152.201:1099/api/v1/';
const API_URL = 'http://localhost:1099/api/v1/';

export function decryption(data){
  return JSON.parse(cryptlib.decrypt(data, shaKey, 'czhVx38Su0WIXJsV'));
}

export function encryption(data){
  return cryptlib.encrypt(JSON.stringify(data), shaKey, globals.iv);
}

export function encrypt_string(data){
  return cryptlib.encrypt(data, shaKey, globals.iv);
}

export function curl(url, data){
  console.log('url',url)
  return fetch(API_URL+url, {
      method: 'POST',
      headers: {
        'accept-language' : 'en',
        'content-type' : 'text/plain',
        'api-key' : encrypt_string("KIRIM@|-||_!$"),
        // 'token' : encrypt_string("TOKEN CODE HERE"),
        // 'Authhorization' : encrypt_string("TOKEN CODE HERE")
      },
      body: encryption(data),
    })
    .then(response => response.json())
    .then(response => {

        return decryption(response);

    })
}