import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor (
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto);

    try {
      return await this.studentRepository.save(newStudent);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to save student');
    } 
  }

  async findAll() {
    return await this.studentRepository.find();
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOneBy({ id })

    if (!student) {
      return `No student found with id #${id}`;
    }

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.studentRepository.update(id, updateStudentDto);
  }

  async remove(id: string) {
    const student = await this.findOne(id)

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return await this.studentRepository.delete(student);
  }
}
