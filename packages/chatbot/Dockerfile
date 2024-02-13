FROM node:20

WORKDIR $home/app

# Copy only the package files to leverage Docker caching
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./ecosystem.config.js ./

# Install global packages
RUN npm i -g pnpm
RUN npm i pm2 -g


# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

EXPOSE 3010
CMD ["pm2-runtime", "start", "ecosystem.config.js"]