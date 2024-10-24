import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { getPaginationParams } from "src/common/methods";
import { IPaginationParams } from "src/common/interface";
import { ProfileEntity } from "src/profile/profile.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const foundUser = await this.findOne({ where: { username } });
    return foundUser;
  }
  async createUser(
    username: string,
    hashedPassword?: string,
    redirectFn?: () => void,
  ): Promise<void> {
    const profile = new ProfileEntity();
    profile.name = username;
    profile.isSubscribed = false;
    const user = this.create({
      username,
      password: hashedPassword,
      profile,
    });
    try {
      await this.save(user);
    } catch (er) {
      console.log("errrr", er);

      if (er.code === "23505") {
        // don't throw ConflictException if signInWithGoogle
        if (!redirectFn) throw new ConflictException("Username Already Exists");
      } else throw new InternalServerErrorException();
    } finally {
      redirectFn && redirectFn();
    }
  }

  async fetchUsers(
    paginationParams: IPaginationParams,
  ): Promise<[UserEntity[], number]> {
    return await this.findAndCount({
      select: { username: true },
      order: { updatedAt: "DESC" },
      ...getPaginationParams(paginationParams),
    });
  }
}
