import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Patch,
  Delete,
  Query,
} from "@nestjs/common";
import { AttendanceService } from "./attendances.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { attendanceType } from "src/enums/attendance-type.enum";
import { FindAttendanceDto } from "./dto/find-attendance.dto";

@Controller("attendance")
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  // Create Attendace
  @Post(":sessionId")
  create(
    @Param("sessionId") sessionId: string,
    @Body() createAttendanceDto: CreateAttendanceDto,
  ) {
    return this.attendanceService.create(sessionId, createAttendanceDto);
  }

  // Get all Attendances
  @Get()
  findAll(@Query("attendanceType") attendanceType?: attendanceType) {
    return this.attendanceService.findAll(attendanceType);
  }

  // Get a Specific Attendance By Id
  @Get(":attendanceId")
  findOneById(@Param("attendanceId") attendanceId: string) {
    return this.attendanceService.findOneById(attendanceId);
  }

  // Get a Specific Attendance By date and attendance type
  @Get("search")
  findOne(@Query() findAttendanceDto: FindAttendanceDto) {
    return this.attendanceService.findOne(findAttendanceDto);
  }

  // Update an Attendance
  @Patch(":attendanceId")
  update(
    @Param("attendanceId") attendanceId: string,
    @Body() updateAttendaceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(attendanceId, updateAttendaceDto);
  }

  // Update Attendances in a session
  @Patch("bulkupdate/:sessionId")
  bulkUpdate(
    @Param("sessionId") sessionId: string,
    @Body() updateAttendaceDtos: UpdateAttendanceDto[],
  ) {
    return this.attendanceService.bulkUpdate(sessionId, updateAttendaceDtos);
  }

  // Delete an Attendance
  @Delete(":attendanceId")
  remove(@Param("attendanceId") attendanceId: string) {
    return this.attendanceService.remove(attendanceId);
  }

  // @Get("session/:sessionId/students")
  // getSessionAttendance(@Param("sessionId") sessionId: string) {
  //   return this.attendanceService.getSessionAttendance(sessionId);
  // }
}
