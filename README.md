# Setup

## Basic

Most examples work with a static server.

Install a basic HTTP server for the static examples:

    sudo npm install -g http-server

Run the static file server:

    cd your_project_folder # this folder
    http-server

You could also use any other simple HTTP server that will serve static files like puma or nginx.

## Advanced

The final example(s) require a working API, install the NPM modules to get the server.

Install the node modules to run the API server:

    cd your_project_folder # this folder
    npm install

Then run the api server:

    cd your_project_folder # this folder
    npm run server

