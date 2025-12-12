import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { NotificationsService } from "./notifications.service";
import { WEBSOCKET_NOTIFICATION_PATTERNS } from "@repo/common/constants";
import { Task, Comment } from "@repo/db";

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(WEBSOCKET_NOTIFICATION_PATTERNS.TASK_CREATED)
  handleTaskCreated(@Payload() task: Task) {
    return this.notificationsService.handleTaskCreated(task);
  }

  @EventPattern(WEBSOCKET_NOTIFICATION_PATTERNS.TASK_UPDATED)
  handleTaskUpdated(@Payload() task: Task) {
    return this.notificationsService.handleTaskUpdated(task);
  }

  @EventPattern(WEBSOCKET_NOTIFICATION_PATTERNS.COMMENT_CREATED)
  handleCommentCreated(@Payload() comment: Comment) {
    return this.notificationsService.handleCommentCreated(comment);
  }
}
