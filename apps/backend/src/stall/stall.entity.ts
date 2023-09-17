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

@Entity()
@ObjectType()
export class Stall {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  stallNumber: string;

  @OneToOne((type) => Room, (room: Room) => room.id)
  room: Room;

  @Column()
  @Field({ nullable: true })
  floorPlanLocation?: string;

  @ManyToOne((type) => Company, (company: Company) => company.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  @Field(() => Company, { nullable: true })
  company?: Company;
}
