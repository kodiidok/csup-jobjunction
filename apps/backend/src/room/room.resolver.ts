import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
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
    try {
      return await this.roomService.findAllRooms();
    } catch (error) {
      throw new Error(`Error fetching rooms: ${error.message}`);
    }
  }

  @Query(() => Room, { name: 'room' })
  async findRoomById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Room> {
    try {
      return await this.roomService.findRoomById(id);
    } catch (error) {
      throw new Error(`Error fetching room by ID: ${error.message}`);
    }
  }

  @Mutation(() => Room, { name: 'createRoom' })
  async createRoom(@Args('input') input: CreateRoomInput): Promise<Room> {
    try {
      return await this.roomService.createRoom(input);
    } catch (error) {
      throw new Error(`Error creating room: ${error.message}`);
    }
  }

  @Mutation(() => Room, { name: 'updateRoom' })
  async updateRoom(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateRoomInput,
  ): Promise<Room> {
    try {
      return await this.roomService.updateRoom(id, input);
    } catch (error) {
      throw new Error(`Error updating room: ${error.message}`);
    }
  }

  @Mutation(() => Room, { name: 'deleteRoom' })
  async deleteRoom(@Args('id', { type: () => ID }) id: string): Promise<Room> {
    try {
      return await this.roomService.deleteRoom(id);
    } catch (error) {
      throw new Error(`Error deleting room: ${error.message}`);
    }
  }
}
