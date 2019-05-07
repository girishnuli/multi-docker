# Deploying to AWS Elastic Beanstalk

## Building and publishing images
- Create a docker image
- Push docker image to dockerhub https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html
- Use $ docker login to ensure that your dockerhub credentials are setup
- ALTERNATE: Push image to AWS Container Service so that it remains private
- https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecs.html
- docker build -t girishnuli/multi-client ./client
- docker build -t girishnuli/multi-server ./server
- docker run -p 3000:3000 girishnuli/multi-client (to test)
- docker run -p 5000:5000 girishnuli/multi-server (to test)
- docker push girishnuli/multi-client
- docker push girishnuli/multi-server

## Configuring Dockerrun.aws.json
- EB uses ECS task definitions to deploy docker (https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions)
- We must first create Dockerrun.aws.json file
- In the json file:
- - At least one container must be marked as essential (usually the primary nginx server. If it crashes, all other containers are stopped)
- - Note: If a container is marked essential and it crashes, all containers are stopped
- Use "links" to allow different containers to talk to each other
- - Note: A link is unidirectional, so we need to specify it only once and not in each linked container

## Setup AWS EB
- Create new EB environment
- Create a new application with platform of type "multi-container docker" in the environment
- Test EB url to ensure it is working ok
- Setup any other resources (cache, db etc), security groups etc

## Test EB locally
- brew install awsebcli
- In project folder, eb init (setup credentials, region and the eb project)
- eb local run // Launches all containers, just like docker-compose

## Deploy to AWS
- https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html
- Option 1: Zip the folder and upload using GUI
- Option 2: eb deploy
