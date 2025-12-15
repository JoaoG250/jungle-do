import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import {
  AUDIT_ACTION,
  RESOURCE_TYPE,
  type AuditAction,
  type ResourceType,
} from "@repo/common/constants";

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ enum: Object.values(AUDIT_ACTION) })
  action: AuditAction;

  @Column({ name: "resource_type", enum: Object.values(RESOURCE_TYPE) })
  resourceType: ResourceType;

  @Column({ name: "resource_id" })
  resourceId: string;

  @Column({ name: "user_id", nullable: true })
  userId: string;

  @Column({ type: "jsonb", nullable: true })
  details: Record<string, any>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
