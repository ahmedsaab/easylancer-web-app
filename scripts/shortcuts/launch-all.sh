killall ngrok
minikube start
ngrok http -log=stdout -hostname=app.skillranks.ngrok.io "$(minikube service web-app --url)" > /dev/null &
ngrok http -log=stdout -hostname=api.skillranks.ngrok.io "$(minikube service client-api --url)" > /dev/null &
