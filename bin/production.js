'use strict';

global.Promise = require('bluebird')

const http = require('http');
const fs = require('fs');
const path = require('path');
const config = global.config = require('../config');

let app = require('../app');
let server = require('http').createServer(app.callback());

server.listen(config.site.port);