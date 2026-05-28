import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['userId', 'friendId'])
@Index(['userId', 'createdAt'])
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid')
  friendId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'friendId' })
  friend: User;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ nullable: true })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;
}
