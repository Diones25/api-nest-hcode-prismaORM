import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let usercontroller: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(), 
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: PrismaService,
          useValue: {}, // Mock PrismaService with an empty object or a mock implementation
        },
      ],
    }).compile();

    usercontroller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(usercontroller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'jDc2K@example.com',
        password: 'StrongPassword123!',
      }

      const createdUser = { ...createUserDto };
      mockUserService.create.mockResolvedValue(createdUser);

      const result = await usercontroller.create(createUserDto);

      expect(result).toEqual(createdUser);
      expect(mockUserService.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          password: 'StrongPassword123!',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];

      mockUserService.findAll.mockResolvedValue(users);

      const result = await usercontroller.findAll();
      expect(result).toEqual(users);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const userId = 1;

      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPassword123!',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockUserService.findOne.mockResolvedValue(user);

      const result = await usercontroller.findOne(userId);
      expect(result).toEqual(user);
      expect(mockUserService.findOne).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should create a user', async () => {
      const userId = 1;

      const updateUserDto: UpdateUserDto = {
        name: 'John Doe',
        email: 'jDc2K@example.com',
        password: 'StrongPassword123!',
      }

      const updatedUser = { userId, ...updateUserDto };
      mockUserService.update.mockResolvedValue(updatedUser);

      const result = await usercontroller.update(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(mockUserService.update).toHaveBeenCalledWith(userId, updateUserDto);
    });
  });

  describe('removeUser', () => {
    it('must remove a user', async () => {
      const userId = 1;

      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPassword123!',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockUserService.remove.mockResolvedValue(user);

      const result = await usercontroller.remove(userId);
      expect(result).toEqual(user);
      expect(mockUserService.remove).toHaveBeenCalled();
    });
  });

});
