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
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { FindSessionDto } from "./dto/find-session.dto";

@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  // Create Session
  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
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
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionService.update(sessionId, updateSessionDto);
  }

  // Delete a Session
  @Delete(":sessionId")
  remove(@Param("sessionId") sessionId: string) {
    return this.sessionService.remove(sessionId);
  }

  // For status update
  @Get('dashboard/stats')
  async getDashboardStats() {
    // Implement logic to aggregate attendance data
    return this.sessionService.getDashboardStats();
  }
}
