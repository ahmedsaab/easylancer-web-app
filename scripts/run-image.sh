# remove existing
docker rm -f web-app

# run live (-d for detatched)
docker run --name web-app -p 3003:3003 easylancer/web-app:latest
