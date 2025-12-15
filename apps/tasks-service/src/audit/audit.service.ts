import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuditLog } from "@repo/db";
import { AuditAction, ResourceType } from "@repo/common/constants";

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

  async log(
    action: AuditAction,
    resourceType: ResourceType,
    resourceId: string,
    userId: string | null,
    details?: any,
  ) {
    const audit = this.auditRepository.create({
      action,
      resourceType,
      resourceId,
      userId,
      details,
    });
    return this.auditRepository.save(audit);
  }
}
