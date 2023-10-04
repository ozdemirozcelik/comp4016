
### Assignment
- Update your application with any language and framework of your choice.
- Create an image of the application using DockerFile and push it up to DockerHub (or a registry of your choice)
- Create Kubernetes configuration to run your application
- Submit a zipped up folder with your files so I can apply your Kubernetes config files
- Use a Workload to run your new image. I will accept any as long as it let's me hit the new endpoints defined below.

Use a Service with type NodePort. I will be calling your endpoints as localhost:8080/<ENDPOINT>. 

Your Kubernetes configuration should create and use the namespace of your username. For example my namespace would be plalli11. 

3 endpoints your application should support:

A GET request for the ConfigMap value
For example, the ConfigMap may look like
data:
  configValue: snake
Request:
curl localhost:8080/configValue
Response:
snake
The key configValue should be set to something in your ConfigMap. I will change it to a different value, rollout the pods and test to see if the new value is returned.

A GET request for the Secret value. Use an Opaque secret with the key secretValue.
Request:
curl localhost:8080/secretValue
Response:
secretSnake
The key secretValue should be set to something in your Secret. I will change it to a different value, rollout the pods and test to see if the new value is returned.

A GET request for an environment value. Add an env value to your workload file.
Request:
curl localhost:8080/envValue
Response:
environmentSnake
The key envValue should be set to something in your environment values. I will change it to a different value, rollout the pods and test to see if the new value is returned.