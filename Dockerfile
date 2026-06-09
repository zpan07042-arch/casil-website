# 构建阶段（必须在最前面）
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./
COPY next.config.ts ./

# 安装依赖
RUN npm install

# 复制源码并构建
COPY . .
RUN npm run build


# 生产阶段
FROM node:20-alpine

WORKDIR /app

# 复制构建产物（从 builder 阶段复制）
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000

CMD ["npm", "start"]