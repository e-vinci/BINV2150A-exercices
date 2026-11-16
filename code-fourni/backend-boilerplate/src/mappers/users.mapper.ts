import { NewUser, NewUserDTO, User, UserDBO, UserDTO } from "../models/user.model";

export class UsersMapper {
  static fromDBO(dbo: UserDBO): User {
    return {
      id: dbo.id,
      email: dbo.email,
      password: dbo.password,
      firstName: dbo.first_name,
      lastName: dbo.last_name,
      role: dbo.role,
    };
  }

  static toDBO(user: User): UserDBO {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      role: user.role,
    };
  }

  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  static fromNewDTO(dto: NewUserDTO): NewUser {
    return {
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
    };
  }
}
