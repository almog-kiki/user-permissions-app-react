##  Users permisions App

- React hooks, node.js, mongoDB.
- login with passport.js (LocalStrategy)

# How to run 
```
docker-compose -f docker-compose-<target>.yml  <Commands>
```
- development
```
docker-compose -p my_project_name -f docker-compose-dev.yml build
docker-compose -p my_project_name -f docker-compose-dev.yml up -d
```

- stop:
```
docker-compose -f docker-compose-<target>.yml down
```

# Using: 
- On your browser, go to http://localhost:3000/ 






