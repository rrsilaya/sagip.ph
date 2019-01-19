import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ValidEntity } from '../../decorators';
import * as randomatic from 'randomatic';

import { User } from '../';

@Entity()
export class Confirmation extends ValidEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: () => true })
  isActive: boolean;

  @OneToOne(type => User, user => user.confirmation)
  user: Promise<User>;
}

export enum types {
  REGISTRATION = 'REGISTRATION'
}

export const generateCode = (): string => randomatic('0A', 6);
