FROM node:22-alpine

WORKDIR /app

#Install dependcies first (cached if package.json doesn't change)
COPY package.json package-lock.json ./
RUN npm install

#Copy the rest of the application code
COPY . .

EXPOSE 4200

# --host 0.0.0.0 allows host to reach container, --poll enables file change detection
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]