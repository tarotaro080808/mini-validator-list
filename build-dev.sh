# create .env file
echo "creating .env file if it does not exist..."
cp -R -u -p .env.example .env
echo

# build backend
echo "building backend..."
cd backend
yarn install
yarn run build
cd ..
echo

# build frontend
echo "building frontend..."
cd frontend
yarn install
yarn run build
cd ..
echo
