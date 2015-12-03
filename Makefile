run:
	docker-compose build
	docker-compose up -d
	docker inspect --format 'http://{{ .NetworkSettings.IPAddress }}:8000' filemanager_web_1