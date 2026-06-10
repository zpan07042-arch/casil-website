# 构建阶段（必须在最前面）
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./
COPY next.config.ts ./

# 设置为阿里源并安装依赖（显式安装 SWC alpine 版本）
RUN npm config set registry https://registry.npmmirror.com \
    && npm install \
    && npm install @next/swc-linux-x64-musl --save-optional

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

# 复制迁移文件（首次启动时自动执行）
# data/migrations/ → 随镜像发布，包含所有迁移 SQL
# data/db/        → 通过 docker-compose volume 挂载，持久化 casil.db
COPY --from=builder /app/data ./data

EXPOSE 3000

# ── 启动流程 ───────────────────────────────────────────
# 第1步: 运行 data/migrate.js
#   → 扫描 data/migrations/*.sql → 对比 _migrations 表
#   → 只执行新增的 .sql → 记录到 _migrations → 保存 casil.db 到磁盘
# 第2步: 启动 Next.js（此时数据库已是最新状态）
CMD sh -c "echo '[step 1/2] Running database migrations...' \
    && node data/migrate.js \
    && echo '[step 2/2] Starting Next.js...' \
    && exec npm start"
