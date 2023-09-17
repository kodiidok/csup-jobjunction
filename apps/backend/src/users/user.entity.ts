import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/roles/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ name: 'role_id', nullable: true })
  roleId?: string;

  @ManyToOne(() => Role, (entity: Role) => entity.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  @Field(() => Role, { nullable: true })
  role?: Role;
}
