# remove existing
docker rm -f web-app

# run live (-d for detatched)
docker run --name web-app -p 3000:3000 easylancer/web-app:latest
