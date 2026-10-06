import { NewUser, NewUserDTO, User, UserDBO, UserDTO, UserShortDTO } from "../models/user.model";

export class UsersMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      favorites: user.favorites,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  static toShortDTO(user: User): UserShortDTO {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  static fromNewDTO(dto: NewUserDTO): NewUser {
    return {
      email: dto.email.trim().toLowerCase(),
      password: dto.password,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
    };
  }

  static toDBO(user: User): UserDBO {
    return {
      id: user.id,
      email: user.email,
      hashed_password: user.hashedPassword,
      first_name: user.firstName,
      last_name: user.lastName,
      role: user.role,
      favorites: user.favorites,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  }

  static fromDBO(dbo: UserDBO): User {
    return {
      id: dbo.id,
      email: dbo.email,
      hashedPassword: dbo.hashed_password,
      firstName: dbo.first_name,
      lastName: dbo.last_name,
      role: dbo.role,
      favorites: dbo.favorites ? dbo.favorites : [],
      createdAt: new Date(dbo.created_at),
      updatedAt: new Date(dbo.updated_at),
    };
  }
}
