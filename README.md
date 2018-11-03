# sse.js

### Forked from [@einaros/sse.js](https://github.com/einaros/sse.js)

The base module set up its own http listeners. This is a simplified version that does not set up its own listeners. Express middleware can be written to invoke the `handleRequest` method.

---

### Example Usage

The purpose of creating this fork is that the base module creates its own middleware and cannot be used easily with express, especially in conjunction with other express middleware like `express-session`. Session data from `express-session` can now be accessed 

Here is an example usage of sse.js as middleware.

`server.js`

    // set up express and express-session
    const express = require('express');
    const app = express();
    const expressSession = require('express-session');
    app.use(require('express-session')({ /* express-session options */ }));
    app.listen(8080, _ => {});

    // sse
    const sse = require('sse')();

    // now you can write express middleware for sse.js!
    // this sends express data
    app.use((req, res, next) => {
      if(req.path === '/sse') {

        // note that handleRequest's third param is now for data that will be assigned to the `data` property of client
        sseServer.handleRequest(req, res, req.session);
      } else {
        next();
      }
    });

    // note that sseServer doesn't require any params now
    let sseServer = new sse();
    sseServer.on('connection', client => {

      // you can access client details now! woohoo!
      console.log('express session id: ' + client.data.id);
    });
