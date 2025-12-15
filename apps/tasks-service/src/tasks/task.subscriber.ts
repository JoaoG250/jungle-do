import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  DataSource,
} from "typeorm";
import { Task } from "@repo/db";
import { AuditService } from "../audit/audit.service";
import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { CLS_KEYS, AUDIT_ACTION, RESOURCE_TYPE } from "@repo/common/constants";

@Injectable()
@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  constructor(
    dataSource: DataSource,
    private readonly auditService: AuditService,
    private readonly cls: ClsService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  async afterInsert(event: InsertEvent<Task>) {
    const userId = this.cls.get<string>(CLS_KEYS.USER_ID);
    const { id } = event.entity;

    await this.auditService.log(
      AUDIT_ACTION.CREATE,
      RESOURCE_TYPE.TASK,
      id,
      userId || null,
      event.entity,
    );
  }

  async afterUpdate(event: UpdateEvent<Task>) {
    const userId = this.cls.get<string>(CLS_KEYS.USER_ID);
    const { id } = event.entity as Task;
    const details = {
      from: event.databaseEntity,
      to: event.entity,
    };

    await this.auditService.log(
      AUDIT_ACTION.UPDATE,
      RESOURCE_TYPE.TASK,
      id,
      userId || null,
      details,
    );
  }
}
