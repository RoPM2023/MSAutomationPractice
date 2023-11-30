import { test} from '@playwright/test';
import { expect } from 'chai';
const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

test('GET User List', async({request}) => {
  const response = await request.get('https://reqres.in/api/users?page=2');
  expect(response.status()).to.equal(200);
  //JSON Data
  const jsonData = await response.json();
  //JSON Schema
  const userListSchema = require('../data/schemas/userListSchema.json');
  //Validate JSON Data with JSON Schema
  await expect(jsonData).to.be.jsonSchema(userListSchema);
  console.log('Response Status:', response.status());
  console.log('JSON Data:', jsonData);
  console.log('JSON Schema:',userListSchema);
})

test('GET Single User', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2');
  expect(response.status()).to.equal(200);
  console.log('Response Status:', response.status());
  const jsonData = await response.json();
  const singleUserSchema = require('../data/schemas/singleUserSchema.json');

  await expect(jsonData).to.be.jsonSchema(singleUserSchema);
});

test('GET User Not Found', async({request}) => {
  const response = await request.get('https://reqres.in/api/users/23');
  expect(response.status()).to.equal(404);
});

test('POST Create User', async ({request}) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      "name": "morpheus",
      "job": "leader"
    }}
  );

  expect(response.status()).to.equal(201);
  const jsonData = await response.json();
  const createNewUserSchema = require('../data/schemas/createNewUserSchema.json');
  await expect(jsonData).to.be.jsonSchema(createNewUserSchema);
});

test('PUT Update User', async ({request}) => {
  const response = await request.put('https://reqres.in/api/users/2', {
    data: {
      "name": "morpheus",
      "job": "zion resident",
    }}
  );
  expect(response.status()).to.equal(200);
  const jsonData = await response.json();
  const updateUserSchema = require('../data/schemas/updateUserSchema.json');
  await expect(jsonData).to.be.jsonSchema(updateUserSchema);
});

test('PATCH Update User', async ({request}) => {
  const response = await request.patch('https://reqres.in/api/users/2', {
    data: {
      "name": "morpheus",
      "job": "zion resident",
    }}
  );
  expect(response.status()).to.equal(200);
  const jsonData = await response.json();
  const updateUserSchema = require('../data/schemas/updateUserSchema.json');
  await expect(jsonData).to.be.jsonSchema(updateUserSchema);
});

test('DELETE User', async ({request}) => {
  const response = await request.delete('https://reqres.in/api/users/2');
  expect(response.status()).to.equal(204);
});

test('POST Register Succesful', async ({request}) => {
  const response = await request.post('https://reqres.in/api/register', {
    data : {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
    }
  });
  expect(response.status()).to.equal(200);
  const jsonData = await response.json();
  const registerSuccessful = require('../data/schemas/registerSuccessful.json');
  await expect(jsonData).to.be.jsonSchema(registerSuccessful);
});

test('POST Register Unsuccesful', async ({request}) => {
  const response = await request.post('https://reqres.in/api/register', {
    data : {
      "email": "sydney@fife"
    }
  });
  expect(response.status()).to.equal(400);
  const jsonData = await response.json();
  const registerUnsuccessful = require('../data/schemas/registerUnsuccessful.json');
  await expect(jsonData).to.be.jsonSchema(registerUnsuccessful);
});

test('POST Login Successful', async ({request}) => {
  const response = await request.post('https://reqres.in/api/login', {
    data : {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }
  });
  expect(response.status()).to.equal(200);
  const jsonData = await response.json();
  const LoginSuccesful = require('../data/schemas/LoginSuccesful.json');
  await expect(jsonData).to.be.jsonSchema(LoginSuccesful);

});

test('POST Login Unsuccessful', async ({request}) => {
  const response = await request.post('https://reqres.in/api/login', {
    data : {
      "email": "peter@klaven"
    }
  });
  expect(response.status()).to.equal(400);
  const jsonData = await response.json();
  const LoginUnsuccesful = require('../data/schemas/LoginUnsuccesful.json');
  await expect(jsonData).to.be.jsonSchema(LoginUnsuccesful);

});

test('GET Delayed Response', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?delay=3');
  expect(response.status()).to.equal(200);
  console.log('Response Status:', response.status());
  const jsonData = await response.json();
  const delayedResponseSchema = require('../data/schemas/delayedResponseSchema.json');

  await expect(jsonData).to.be.jsonSchema(delayedResponseSchema);
});