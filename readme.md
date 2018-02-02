
# Overwatch Compare

API that compares two players stats in fun and interesting ways.

## Prerequisite

* node
* mongodb
* nodemon for watching

## Setup

### Install Dependencies

```npm install```

### Running Server

Will watch and refresh with nodemon

```npm run watch```

### Running Debugger

Will watch and refresh with nodemon with debugger. See [this article](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27) for more info.

```npm run dev```

### Local Configuration

Copy .env-example to .env. Database username and password are not required if running locally. I recommend [mlab](https://mlab.com/home) for free mongo databases.

## API Routes

**Note: Region and platform are set to US and PC and will remain that way for the foreseeable future.**

### Get User Profile

**Note: the user requires the battle.net id. (ex YawgdirKram-1453). **

```api/user/:user```

### Get User Stats

**Note: stats are cached in mongo for 5 minutes.**

```api/user/:user/stats```