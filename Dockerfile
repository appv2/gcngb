#This Dockerfile is used to build a containerized environment for running the Next.js PDF tools application. 
#The Dockerfile installs some additional packages, such as Ghostscript, LibreOffice, and QPDF, which are necessary for the application to function properly.

#This line specifies the base image for the container, which is Node.js version 19 running on Alpine Linux
FROM node:19-alpine

#This line sets the working directory for the container to /app.
WORKDIR /app 

#This line copies the package.json file from the host machine to the container's working directory.
COPY package.json .

#This line installs the Node.js dependencies listed in package.json.
RUN npm install

#This line copies the rest of the application files from the host machine to the container's working directory.
COPY . .

#This line runs the build command defined in the application's package.json file.
RUN npm run build

#This line exposes port 3000 from the container.
EXPOSE 3000

#This line specifies the command to run when the container is started, which is to run the start command defined in the application's package.json file using npm run.
CMD ["npm", "run", "start"]