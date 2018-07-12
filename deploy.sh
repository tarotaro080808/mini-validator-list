if ! [ -x "$(command -v docker-compose)" ]; then
    echo "installing docker-compose..."
    curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

echo "getting the latest comopse file..."
rm -f docker-compose.yml
rm -f docker-compose.proxy.yml
curl https://raw.githubusercontent.com/cinnapple/mini-validator-list/master/docker-compose.prod.yml -o docker-compose.yml
curl https://raw.githubusercontent.com/cinnapple/mini-validator-list/master/docker-compose.prod.yml -o docker-compose.proxy.yml

echo "pulling the latest images..."
docker-compose pull -f docker-compose.yml

echo "running docker-compose up command..."
docker-compose up -d -f docker-compose.yml