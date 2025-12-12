import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { NOTIFICATION_TYPE } from "@repo/common/constants";
import type { NotificationType } from "@repo/common/constants";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  message: string;

  @Column({
    type: "enum",
    enum: Object.values(NOTIFICATION_TYPE),
  })
  type: NotificationType;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "is_read", default: false })
  isRead: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ type: "jsonb", nullable: true })
  metadata: any;
}
