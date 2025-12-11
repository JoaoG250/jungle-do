import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column("text")
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "author_id" })
  author: User;

  @Column({ name: "author_id" })
  authorId: string;

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "task_id" })
  task: Task;

  @Column({ name: "task_id" })
  taskId: string;
}
