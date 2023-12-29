![screenShare1](https://github.com/coderSomya/Realtime-whiteboard/assets/98840655/f299ab9d-83b0-4cd5-9ef5-b0b5e80b9a19)

_Access the video walkthrough of the app here:_
https://drive.google.com/drive/folders/1WWkV8ZYDkeaI-zW_WAVjhYAxBcV35R7M

# Realtime-whiteboard

_Features :_
1. Writing on the whiteboard, using pencil or rectangle elements
2. Undo last stroke
3. Change font size
4. Change font color
5. Save the canvas as an image
6. Login/Signup, SSO and IAM using Keycloak
5. Create a room
6. Multiple people joining a room and writing on the keyboard using web sockets
7. Responsive design

_Get Started :_

```
git clone https://github.com/coderSomya/Realtime-whiteboard.git
cd realtime-whiteboard
```

## Environment variables setup
Add a .env file in /auth

```
VITE_KEYCLOAK_URL = "http://127.0.0.1:4000"
VITE_KEYCLOAK_REALM = <your_keycloack_realm>
VITE_KEYCLOAK_CLIENT_ID= <your_keycloak_client_id>
VITE_WHITEBOARD_URL= "http://localhost:5173"
```


### To start the server

```
npm i
npm run dev
```

### To start the client
```
cd frontend
npm i
npm run dev
```

### To spin up Keycloak on docker container
```
docker run -d -p 4000:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:20.0.3 start-dev
```
where, 
**-d** to run it in detached mode 
**-p** port mapping [local_port]:[docker_port] 
**-e** environment variables 


For Keycloak setup
- open _localhost:4000_
- create a new realm, and give it a name
- create a new client, and give it a name
- in the client settings, add web origin as _http://localhost:5174_
- add other settings, like user registration, max/min password lengths,etc.

### Finally
```
cd ..
cd auth
npm i
npm run dev
```

### Technologies used
- ReactJS
- Typescript
- Javascript
- NodeJS
- Web sockets
- Keycloak
- Docker
