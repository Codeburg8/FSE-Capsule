const routes = require ('./routes');

const express = require('express');
const http    = require('http');
const path = require('path');

// set the default port for the server
const PORT = process.env.port | 8080;

// create our express app
const app = express();

// *************** DEBUG only
if(true) {
  const morgan   = require('morgan');
  app.use(morgan('tiny'));
}

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add the routes
app.use(routes);

// next include any static files
app.use(
  express.static(path.join(__dirname, '../client/build'))
);

// now create a router to forward to the client
const clientRouter = express.Router()

// forward any unmaped get requests to the client
clientRouter.get('*', (request, response) => {
  const pathToIndex = path.join(__dirname, '../client/build', 'index.html');
  response.sendFile(pathToIndex);
});

app.use('/', clientRouter);

// for path not found generate a 404 error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// main error handler
app.use((err, req, res, next) => {
    console.log('Main Error handler', {err});

    // render a generic error to the user
    res.status(500).send({message: "Server error"});
});

// create and start the express webserver
http.createServer(app).listen(PORT, () => {
    console.log(`Server sucessefully start on url: http://locahost:${PORT}`);
});