import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("misc.jwtSecret"),
    });
  }

  async validate(body: UserEntity): Promise<UserEntity> {
    const { username } = body;
    const user = await this.userService.validateUser(username);
    if (!user) {
      console.log("aaa");
      throw new UnauthorizedException();
    }
    return user;
  }
}
