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
# 第1步: 清理构建阶段可能产生的脏 DB 文件
#        (next build 期间 getDb() 可能会创建一个空/不完整的 casil.db)
# 第2步: 运行 data/migrate.js 从 .sql 文件全新构建数据库
# 第3步: 验证数据完整性，确认 pages 表有数据
# 第4步: 启动 Next.js
CMD sh -c "\
    if [ ! -f data/db/.initialized ]; then \
      echo '[first run] Cleaning stale build-time database...' \
      && rm -f data/db/casil.db data/db/casil.db-shm data/db/casil.db-wal \
      && echo '[1/3] Running database migrations...' \
      && node data/migrate.js \
      && echo '[2/3] Verifying database integrity...' \
      && node data/verify.js \
      && touch data/db/.initialized \
      && echo '[3/3] First-time initialization complete.' ; \
    else \
      echo '[subsequent run] Running database migrations (only new ones)...' \
      && node data/migrate.js ; \
    fi \
    && mkdir -p public/uploads \
    && echo '[start] Starting Next.js...' \
    && exec npm start"
