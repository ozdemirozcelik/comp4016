### Assignment

Update your application with any language and framework of your choice
Create an image of the application using DockerFile and push it up to DockerHub (or a registry of your choice)
Create Kubernetes configuration to run your application
Submit a zipped up folder with your files so I can apply your Kubernetes config files
From the previous project: upgrade the Service with type NodePort to a Service with a LoadBalancer and use a namespace that is our username. 

Use a StatefulSet for the main part of this assignment. 

Include a Horizontal Pod Autoscaler. Make sure you start with minimum replicas being 1 and max replicas being 5. Average CPU utilization should be 30%.

The StatefulSet should include a readinessProbe that calls the service below at localhost:30010/isAlive (localhost here isn't mandatory, it can be any name but should call the service below). I will delete the deployment below and the readinessProbe should fail.

3 endpoints your application should support:

A POST request to save a String to the volume
Request:
curl localhost:30000/saveString 
The response won't be checked.

curl for windows:
curl -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d "{\"string\": \"Snake\"}" http://localhost:30000/saveString


A GET request to get the "saved" string from the volume from the endpoint above.
Request:
curl localhost:30000/getString
Response:
savedSnake
The value should be the same even after restarting the Pod. If this endpoint is called before anything is saved, it should return status code 404.

A GET request to make the CPU busy for 3 minutes. Try to get to 100% CPU usage but even if it doesn't, this should trigger the Horizontal Pod Autoscaler.
Request:
curl localhost:30000/busywait
The response won't be checked but the replicas should go up. I'll expect the CPU to come down after 3 minutes, causing replicas to go down. 

Create a new deployment (this can use the same image or a different image). Make this use the namespace probe. It should only have one endpoint. This deployment is used above for the readinessProbe.

A GET request for is alive.
Request:
curl localhost:30010/isAlive (this can be a different name, localhost isn't mandatory)
Response: (Status 200)
true