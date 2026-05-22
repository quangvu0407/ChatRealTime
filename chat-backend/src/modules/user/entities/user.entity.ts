import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { Message } from 'src/modules/message/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: null })
  code: string;

  @Column({ default: null })
  codeExpired: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Conversation, (conv) => conv.participants)
  @JoinTable()
  conversations: Conversation[];
}
