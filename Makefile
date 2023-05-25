docker-restart:
	docker-compose down
	docker-compose up -d --build

setup:
	docker-compose up -d --build