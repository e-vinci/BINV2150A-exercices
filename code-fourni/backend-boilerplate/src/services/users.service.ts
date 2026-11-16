import bcrypt from "bcrypt";
import { UsersMapper } from "../mappers/users.mapper";
import { ERole, NewUser, User, UserDBO } from "../models/user.model";
import { AbstractService } from "./abstract.service";
import { LoggerService } from "./logger.service";

const SALT_ROUNDS = 10;

export class UsersService extends AbstractService {
  protected static dbPath: string = "data/users.json";

  private static readUsersDB(): User[] {
    return UsersService.readDB<UserDBO, User>(UsersMapper.fromDBO);
  }

  private static writeUsersDB(users: User[]): boolean {
    return UsersService.writeDB<User, UserDBO>(users, UsersMapper.toDBO);
  }

  /** Tous les utilisateurs */
  static getAll(): User[] {
    return this.readUsersDB();
  }

  /** Un utilisateur par son id, ou undefined s'il n'existe pas */
  static getById(id: number): User | undefined {
    const users = this.readUsersDB();
    for (const user of users) {
      if (user.id === id) {
        return user;
      }
    }
    return undefined;
  }

  /** Un utilisateur par son email (insensible à la casse), ou undefined s'il n'existe pas */
  static getByEmail(email: string): User | undefined {
    const users = this.readUsersDB();
    for (const user of users) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return user;
      }
    }
    return undefined;
  }

  /**
   * Crée un utilisateur (rôle "user") avec un mot de passe haché.
   * @returns l'utilisateur créé, ou undefined si l'email est déjà utilisé
   */
  static async create(newUser: NewUser): Promise<User | undefined> {
    const users = this.readUsersDB();

    if (this.getByEmail(newUser.email)) {
      LoggerService.error("Email already exists: " + newUser.email);
      return undefined;
    }

    const user: User = {
      id: UsersService.getNextId(users),
      email: newUser.email,
      password: await bcrypt.hash(newUser.password, SALT_ROUNDS),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: ERole.USER,
    };

    users.push(user);
    if (!this.writeUsersDB(users)) {
      return undefined;
    }
    return user;
  }
}
