import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/roles/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ name: 'roleId', nullable: true })
  roleId?: string;

  @ManyToOne(() => Role, (entity: Role) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  @Field(() => Role, { nullable: true })
  role?: Role;

  constructor() {
    this.id = uuidv4(); // Generate a new UUID for the 'id' field when a new User instance is created
  }
}
