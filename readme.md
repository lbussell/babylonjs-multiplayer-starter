# Full-stack babylon.js multiplayer game with TypeScript

A dead simple full-stack multiplayer game starter using babylon.js for the
client and Express and websockets for the server.

There is no server-side validation of anything - the backend simply records
player positions and sends them along to other clients. Of course, this could be
expanded, and I do intend to work on this more.

## Client

Based off of @RaananW's [babylonjs-webpack-es6](https://github.com/RaananW/babylonjs-webpack-es6) template.

To run:

```
$ cd client
$ npm run start
```

## Server

Just a simple Express server built with socket.io.

To run:

```
$ cd client
$ npm run start
```
