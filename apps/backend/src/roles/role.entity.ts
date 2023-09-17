import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  division?: string;

  @OneToMany(() => User, (entity: User) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  users?: User[];

  constructor() {
    this.id = uuidv4(); // Generate a new UUID for the 'id' field when a new Role instance is created
  }
}
