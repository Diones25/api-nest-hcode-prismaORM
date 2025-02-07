import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}

  private readonly looger = new Logger(UserService.name);

  async create(createUserDto: CreateUserDto) {
    this.looger.log("Criando usuário");
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    this.looger.log("Listando vários usuários");
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    this.looger.log("Listando um usuário");
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
