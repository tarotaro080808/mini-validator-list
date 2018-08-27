if [[ ! -f .env ]] ; then
    echo 'File ".env" does not exist. Please create the file by copying ".env.example" to ".env"'
    exit
fi

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
