import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";

import { Task } from "./task.entity";
import { Comment } from "./comment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ name: "password_hash" })
  passwordHash: string;

  @ManyToMany(() => Task, (task) => task.assignees)
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.author)
  createdTasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
