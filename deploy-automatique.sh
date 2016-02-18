docker stop docker_nodejs_automatique
docker rm docker_nodejs_automatique
rm -rf automatique
unzip automatique.zip -d automatique
cd automatique
docker build -t docker-automatique .
docker run -d -p 3000:3000 --name docker_nodejs_automatique docker-automatique
docker logs -f docker_nodejs_automatique

