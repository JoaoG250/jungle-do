import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";
import { PRIORITY, STATUS } from "@repo/common/constants";
import type { Priority, Status } from "@repo/common/constants";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: Object.values(PRIORITY),
    default: PRIORITY.MEDIUM,
  })
  priority: Priority;

  @Column({
    type: "enum",
    enum: Object.values(STATUS),
    default: STATUS.TODO,
  })
  status: Status;

  @Column({ name: "due_date", type: "timestamp", nullable: true })
  dueDate: Date;

  @ManyToMany(() => User, (user) => user.assignedTasks)
  @JoinTable({
    name: "tasks_assignees",
    joinColumn: {
      name: "task_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  assignees: User[];

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];
}
