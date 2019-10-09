kubectl apply -f kubernetes/web-app.kube.yaml
kubectl rollout restart deployment/web-app
