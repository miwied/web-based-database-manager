# Step 1: Dependecies
FROM node:16-alpine as dependencies
RUN mkdir -p /dependencies
WORKDIR /dependencies
COPY package*.json ./
RUN ["npm", "install"]

# Step 2: Run
FROM dependencies as run
RUN mkdir -p /app
WORKDIR /app
COPY --from=dependencies /dependencies/package.json /dependencies/package-lock.json ./ 
COPY --from=dependencies /dependencies/node_modules ./node_modules 
COPY src ./src 
COPY *.json ./ 
EXPOSE 4200
ENTRYPOINT ["npm", "start"]