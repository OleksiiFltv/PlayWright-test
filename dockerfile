FROM mcr.microsoft.com/playwright:v1.46.0-jammy

RUN mkdir playwright-tests-docker

WORKDIR playwright-tests-docker

COPY . .

RUN npm ci

CMD ["npm", "run", "test"]