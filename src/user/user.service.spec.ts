import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { createUserMock } from './mocks/create-user.mock';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(prisma.user, 'create').mockResolvedValue(createUserMock as any);

      const user = await service.create(createUserMock);
      expect(user).toEqual(createUserMock);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserMock });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users as any);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });


  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(prisma.user, 'count').mockResolvedValue(1);
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user as any);

      const result = await service.findOne(user.id);
      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(prisma.user, 'count').mockResolvedValue(0);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Jane Doe' };
      const updatedUser = { id: 1, name: 'Jane Doe', email: 'john@example.com' };
      jest.spyOn(prisma.user, 'count').mockResolvedValue(1);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser as any);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        data: updateUserDto,
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(prisma.user, 'count').mockResolvedValue(0);

      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const deletedUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(prisma.user, 'count').mockResolvedValue(1);
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(deletedUser as any);

      const result = await service.remove(1);
      expect(result).toEqual(deletedUser);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(prisma.user, 'count').mockResolvedValue(0);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});

