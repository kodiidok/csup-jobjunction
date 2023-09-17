import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create.room';
import { UpdateRoomInput } from './dto/update.room';
import { Stall } from 'src/stall/stall.entity';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => Stall, { nullable: true })
  async stall(@Parent() room: Room): Promise<Stall | null> {
    return room.stall || null;
  }

  @Query(() => [Room], { name: 'rooms' })
  async findAllRooms(): Promise<Room[]> {
    return this.roomService.findAllRooms();
  }

  @Query(() => Room, { name: 'room' })
  async findRoomById(@Args('id', { type: () => ID }) id: string): Promise<Room> {
    return this.roomService.findRoomById(id);
  }

  @Mutation(() => Room, { name: 'createRoom' })
  async createRoom(@Args('input') input: CreateRoomInput): Promise<Room> {
    return this.roomService.createRoom(input);
  }

  @Mutation(() => Room, { name: 'updateRoom' })
  async updateRoom(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRoomInput,
  ): Promise<Room> {
    return this.roomService.updateRoom(id, input);
  }

  @Mutation(() => Room, { name: 'deleteRoom' })
  async deleteRoom(@Args('id', { type: () => ID }) id: string): Promise<Room> {
    return this.roomService.deleteRoom(id);
  }
}
