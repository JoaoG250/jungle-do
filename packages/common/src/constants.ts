export const RABBITMQ_CLIENTS = {
  AUTH_SERVICE: "AUTH_SERVICE",
  TASKS_SERVICE: "TASKS_SERVICE",
} as const;

export const RABBITMQ_QUEUES = {
  AUTH_QUEUE: "auth_queue",
  TASKS_QUEUE: "tasks_queue",
} as const;

export const RPC_AUTH_PATTERNS = {
  VALIDATE_USER: "auth.validate_user",
  CREATE_USER: "auth.create_user",
} as const;

export const RPC_TASK_PATTERNS = {
  CREATE_TASK: "tasks.create_task",
  LIST_TASKS: "tasks.list_tasks",
  UPDATE_TASK: "tasks.update_task",
  CREATE_COMMENT: "tasks.create_comment",
  LIST_COMMENTS: "tasks.list_comments",
  DELETE_TASK: "tasks.delete_task",
} as const;

export const PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];

export const STATUS = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  REVIEW: "REVIEW",
  DONE: "DONE",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const REFRESH_TOKEN_COOKIE_NAME = "jungle-do.refresh-token";
