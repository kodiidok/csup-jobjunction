import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Stall } from 'src/stall/stall.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Company extends User {
  @OneToMany(() => Stall, (stall: Stall) => stall.company, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  stalls?: Stall[];

  @Column('simple-array', { nullable: true })
  stallIds?: string[];
}
