import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Room } from 'src/room/room.entity';
import { Company } from 'src/company/company.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class Stall {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @OneToOne((type) => Room, (room: Room) => room.stall)
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  @Field(() => Room, { nullable: true })
  room: Room;

  @Column({ nullable: true })
  roomId?: string;

  @Column({ nullable: true })
  companyId?: string;

  @ManyToOne((type) => Company, (company: Company) => company.stalls, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  @Field(() => Company, { nullable: true })
  company?: Company;

  constructor() {
    this.id = uuidv4(); // Generate a new UUID for the 'id' field when a new Stall instance is created
  }
}
