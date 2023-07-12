FROM public.ecr.aws/lambda/nodejs:18


ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci

COPY app.js ./

CMD ["app.lambdaHandler"]
