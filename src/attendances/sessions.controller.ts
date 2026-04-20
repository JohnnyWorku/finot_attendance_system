import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { SessionService } from "./sessions.service";
import { CreateAttendanceSessionDto } from "./dto/create-attendance-session.dto";
import { UpdateAttendanceSessionDto } from "./dto/update-attendance-session.dto";
import { FindSessionDto } from "./dto/find-session.dto";

@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  // Create Session
  @Post()
  create(@Body() createAttendanceSessionDto: CreateAttendanceSessionDto) {
    return this.sessionService.create(createAttendanceSessionDto);
  }

  // Find all Sessions
  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  // Find a session by id
  @Get(":sessionId")
  findOneById(@Param("sessionId") sessionId: string) {
    return this.sessionService.findOneById(sessionId);
  }

  // Find a Session using session title and date
  @Get("search")
  findOne(@Query() findSessionDto: FindSessionDto) {
    return this.sessionService.findOne(findSessionDto);
  }

  // Update a Session
  @Patch(":sessionId")
  update(
    @Param("sessionId") sessionId: string,
    @Body() updateAttendaceSessionDto: UpdateAttendanceSessionDto,
  ) {
    return this.sessionService.update(sessionId, updateAttendaceSessionDto);
  }

  // Delete a Session
  @Delete(":sessionId")
  remove(@Param("sessionId") sessionId: string) {
    return this.sessionService.remove(sessionId);
  }
}
