FROM public.ecr.aws/lambda/nodejs:18

RUN yum install libXcomposite libXdamage libXrandr libgbm libxkbcommon pango alsa-lib atk at-spi2-atk cups-libs libdrm -y

ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci

COPY src ./

CMD ["app.lambdaHandler"]
