echo "getting the latest comopse file..."
rm -f docker-compose.yml
curl https://raw.githubusercontent.com/cinnapple/mini-validator-list/master/docker-compose.prod.yml -o docker-compose.yml

echo "pulling the latest images..."
docker-compose pull

echo "running..."
docker-compose up -d