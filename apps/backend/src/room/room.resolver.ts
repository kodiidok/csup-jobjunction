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
import { StallService } from 'src/stall/stall.service';
import { Company } from 'src/company/company.entity';
import { CompanyService } from 'src/company/company.service';
import { InterviewService } from 'src/interview/interview.service';
import { Interview } from 'src/interview/interview.entity';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly stallService: StallService,
    private readonly companyService: CompanyService,
    private readonly interviewService: InterviewService,
  ) {}

  @ResolveField(() => Stall, { nullable: true })
  async stall(@Parent() room: Room): Promise<Stall | null> {
    return room.stall || null;
  }

  // @ResolveField(() => Company, { nullable: true })
  // async company(@Parent() stall: Stall): Promise<Company | null> {
  //   return stall.company || null;
  // }

  @Query(() => [Room], { name: 'rooms' })
  async findAllRooms(): Promise<Room[]> {
    try {
      const rooms = await this.roomService.findAllRooms();
      const roomsWithStalls: Room[] = [];
      await Promise.all(
        rooms.map(async (room) => {
          if (room.stallId) {
            room.stall = await this.stallService.findStallById(room.stallId);
            room.stall.company = await this.companyService.findCompanyById(
              room.stall.companyId,
            );
          }
          if (room.interviewIds) {
            room.interviewIds = room.interviewIds.map((interviewId) =>
              interviewId.replace(/[{}]/g, ''),
            );
            // Use Promise.all to wait for all interviews to be fetched
            const interviewPromises = room.interviewIds.map(
              async (interviewId) => {
                const interview = await this.interviewService.findInterviewById(
                  interviewId,
                );
                return interview;
              },
            );
            // Wait for all interviews to be fetched before assigning to room.interviews
            room.interviews = await Promise.all(interviewPromises);
            console.log(room);
          }
          roomsWithStalls.push(room);
        }),
      );
      return roomsWithStalls;
      // return rooms;
    } catch (error) {
      throw new Error(`Error fetching rooms: ${error.message}`);
    }
  }

  @Query(() => Room, { name: 'room' })
  async findRoomById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Room> {
    try {
      const room = await this.roomService.findRoomById(id);
      room.stall = await this.stallService.findStallById(room.stallId);
      room.stall.company = await this.companyService.findCompanyById(
        room.stall.companyId,
      );
      return room;
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
