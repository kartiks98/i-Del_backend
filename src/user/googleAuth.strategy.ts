import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get("misc.googleClientId"),
      clientSecret: configService.get("misc.googleSecretKey"),
      callbackURL: `${configService.get("misc.apiHost")}/user/signin-google-redirect`,
      scope: ["email", "profile"],
    });
  }
  async validate(
    accessToken: string,
    _refreshToken: string,
    _profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      accessToken,
    };
    done(null, user);
  }
}
