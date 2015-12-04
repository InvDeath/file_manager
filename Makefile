runserver:
	docker-compose build
	docker-compose up -d
	docker inspect --format 'http://{{ .NetworkSettings.IPAddress }}:8000' filemanager_web_1
	docker-compose logs web

gulp:
	docker run -it --rm --privileged=true -v $(shell pwd)/layout:/data miguelalvarezi/nodejs-bower-gulp sh -c 'npm install && bower i --allow-root && gulp'

cli:
	docker run -it --rm --privileged=true -v $(shell pwd)/layout:/data miguelalvarezi/nodejs-bower-gulp bash

clear_docker:
	docker stop $(shell docker ps -a -q)
	docker rm $(shell docker ps -a -q)
	docker rmi $(shell docker ps -a -q)