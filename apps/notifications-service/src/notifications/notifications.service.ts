import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification, Task, Comment } from "@repo/db";
import { NotificationsGateway } from "./notifications.gateway";
import { NOTIFICATION_TYPE, NotificationType } from "@repo/common/constants";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async handleTaskCreated(task: Task) {
    if (task.assignees && task.assignees.length > 0) {
      for (const assignee of task.assignees) {
        await this.createAndSendNotification(
          assignee.id,
          `You have been assigned to task: ${task.title}`,
          NOTIFICATION_TYPE.TASK_ASSIGNED,
          { taskId: task.id },
        );
      }
    }
  }

  async handleTaskUpdated(task: Task) {
    if (task.assignees && task.assignees.length > 0) {
      for (const assignee of task.assignees) {
        await this.createAndSendNotification(
          assignee.id,
          `Task updated: ${task.title}`,
          NOTIFICATION_TYPE.TASK_UPDATED,
          { taskId: task.id },
        );
      }
    }
  }

  async handleCommentCreated(comment: Comment) {
    const task = await this.taskRepository.findOne({
      where: { id: comment.taskId },
      relations: ["assignees"],
    });

    if (task && task.assignees && task.assignees.length > 0) {
      for (const assignee of task.assignees) {
        if (assignee.id !== comment.authorId) {
          await this.createAndSendNotification(
            assignee.id,
            `New comment on task: ${task.title}`,
            NOTIFICATION_TYPE.COMMENT_CREATED,
            { taskId: task.id, commentId: comment.id },
          );
        }
      }
    }
  }

  private async createAndSendNotification(
    userId: string,
    message: string,
    type: NotificationType,
    metadata: any,
  ) {
    const notification = this.notificationRepository.create({
      userId,
      message,
      type,
      metadata,
      isRead: false,
    });
    await this.notificationRepository.save(notification);
    this.notificationsGateway.notifyUser(userId, "notification", notification);
  }
}
