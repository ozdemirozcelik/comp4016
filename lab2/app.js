const http = require('http');
const process = require('process');
const port = process.env.PORT || 8080;


const listener = async (req, res) => {

    try {

        const url = req.url;
        const method = req.method;
    
        if (url === '/foo' && method === 'GET') {
            
            // send back content
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`bar`);
            res.end();
     
        } else if (url === '/hello' && method === 'POST') {

            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const jsonData = JSON.parse(body);
    
                if (jsonData && jsonData.name) {
                    // send back content
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(`Hello ${jsonData.name}!`);
                    res.end();
                } else {
                    res.writeHead(400, {'Content-Type': 'text/html'});
                    res.write(`Bad Request`);
                    res.end();
                }

            });
               
        } else if (url === '/kill' && method === 'GET') {
            
            // Close the server using the shutdown function
            shutdownServer();
            // Send a response indicating that the server is shutting down
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Server is shutting down...');
            res.end();
     
        } 
        
    } catch (err) {
            console.log(err);
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write(`Server Error`);
            res.end();
        }
    

};

const server = http.createServer(listener);

server.listen(port,(() => {
    console.log("Server is running on port 8080");
}));


// Function to shut down the server
function shutdownServer() {
    server.close(() => {
      console.log('Server has been shut down!');
      process.exit(0);
    });
  }

