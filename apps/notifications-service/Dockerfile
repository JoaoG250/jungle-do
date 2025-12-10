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
COPY --chown=${USER}:users ./apps/notifications-service ./apps/notifications-service
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS development

COPY --chown=${USER}:users --from=dependencies /home/${USER}/app /home/${USER}/app

EXPOSE 3004
CMD ["pnpm", "--filter", "notifications-service", "run", "dev"]
