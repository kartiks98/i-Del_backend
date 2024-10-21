import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.dto";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { getUserDetails } from "src/common/methods";
import { IPaginationParams } from "src/common/interface";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) return null;
    return user;
  }

  async signUp(body: User): Promise<string> {
    const { username, password } = body;
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    await this.userRepository.createUser(username, hashedPassword);
    return "Password Set Successfully";
  }

  async signIn(body: User): Promise<{ accessToken: string }> {
    const { username, password } = body;
    const foundUser = await this.userRepository.getUserByUsername(username);
    if (foundUser && (await compare(password, foundUser.password))) {
      console.log("INN", this.jwtService.sign(body));
      const accessToken = this.jwtService.sign(body);
      return { accessToken };
    } else throw new UnauthorizedException("Wrong Credentials Entered.");
  }

  async signInWithGoogle(req: IGoogleAuthResponse, res: IResponse) {
    if (!req.user) {
      return "No user from google";
    }
    const username = await getUserDetails(req.user.accessToken);
    const redirect = () => {
      return res.redirect(
        `http://localhost:3000/success?accessToken=${req.user.accessToken}`,
      );
    };
    return await this.userRepository.createUser(username, null, redirect);
  }

  async getUsers(
    paginationParams: IPaginationParams,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.fetchUsers(paginationParams);
  }
}
