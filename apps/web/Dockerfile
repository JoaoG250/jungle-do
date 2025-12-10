FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

FROM base AS dependencies
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS development
COPY --from=dependencies /app /app

EXPOSE 3000
CMD ["pnpm", "--filter", "web", "run", "dev", "--host", "0.0.0.0", "--port", "3000"]
