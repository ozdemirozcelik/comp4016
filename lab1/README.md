### Assignment
Create an application with any language and framework of your choice
Create an image of the application using DockerFile and push it up to DockerHub (or a registry of your choice)
Submit a file with relevant information so I can test and verify your image

### Test:

1. A simple GET request
Request:
```
curl localhost:8080/foo
```

Response:
```
bar
```

2. A POST request where the JSON body directly changes the response. The name in the response will be whatever was set in the JSON body.
Request:
```
curl for windows:
curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d "{\"name\": \"Prabh\"}" http://localhost:8080/hello
```

Request:
```
curl for linux:
curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST --data '{"name": "Prabh"}' localhost:8080/hello
```

Response:
```
Hello Prabh!
```

3. A GET request to exit the running container
Request:
```
curl localhost:8080/kill
```

Response:
(I won't check the response, it can be anything. I'll check if the container is still running)

### Docker:

1. Build the docker image
```
docker build -t ozdemirozcelik/comp4016_1 .
```

2. Login to docker hub
```
docker login
```

3. Push the image to docker hub
```
docker push ozdemirozcelik/comp4016_1
```

4. pull the docker image
```
docker pull ozdemirozcelik/comp4016_1
```

5. run a container from image
```
docker run -p 8080:8080 -d ozdemirozcelik/comp4016_1
```

6. check running container
```
docker ps
```
