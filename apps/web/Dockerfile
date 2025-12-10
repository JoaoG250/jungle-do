FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG USER=node
USER ${USER}

WORKDIR /home/${USER}/app

FROM base AS dependencies

COPY --chown=${USER}:users ./package.json ./
COPY --chown=${USER}:users ./pnpm-lock.yaml ./
COPY --chown=${USER}:users ./pnpm-workspace.yaml ./
COPY --chown=${USER}:users ./packages ./packages
COPY --chown=${USER}:users ./apps/web ./apps/web
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS development

COPY --chown=${USER}:users --from=dependencies /home/${USER}/app /home/${USER}/app

EXPOSE 3000
CMD ["pnpm", "--filter", "web", "run", "dev", "--host", "0.0.0.0", "--port", "3000"]
