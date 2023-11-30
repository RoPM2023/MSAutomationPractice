import {test, expect} from '@playwright/test';

test("API GET Request: Single user", async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/2');

    expect(response.status()).toBe(200);
    const text = await response.text();    
    expect(text).toContain('Janet');
    console.log(await response.json());
    
});

test("API GET Request: Users list", async ({request}) => {
    const response = await request.get('https://reqres.in/api/users?page=2');

    expect(response.status()).toBe(200);
    const text = await response.text();    
    expect(text).toContain('Rachel'); 
});

test("API GET Request: Users Not Found", async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/23');
    expect(response.status()).toBe(404);
});

test("API GET Request: Delayed Response", async ({request}) => {
    const response = await request.get('https://reqres.in/api/users?delay=3');
    expect(response.status()).toBe(200);
    const text = await response.text();    
    expect(text).toContain('Janet'); 
});

test('API POST Request', async ({request}) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name" : "Rocio",
            "job" : "Tester"
        }
    });
    expect(response.status()).toBe(201);
    const text = await response.text();
    expect(text).toContain('Rocio');
});

test('API PUT Request', async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name" : "Karla",
            "job" : "Social Worker"
        }
    });
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('Karla');
});

test('API DELETE Request', async ({request}) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
});

test('API POST Request: Register Successful', async ({request}) => {
    const response = await request.post('https://reqres.in/api/register', {
        data : {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    });
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('token');
});

test('API POST Request: Register Unsuccessful', async ({request}) => {
    const response = await request.post('https://reqres.in/api/register', {
        data : {
            "email": "sydney@fife"
        }
    });
    expect(response.status()).toBe(400);
    const text = await response.text();
    expect(text).toContain('error');
});

test('API POST Request: Login Successful', async ({request}) => {
    const response = await request.post('https://reqres.in/api/login', {
        data : {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('token');
});

test('API POST Request: Login Unsuccessful', async ({request}) => {
    const response = await request.post('https://reqres.in/api/login', {
        data : {
            "email": "peter@klaven"
        }
    });
    expect(response.status()).toBe(400);
    const text = await response.text();
    expect(text).toContain('error');
});