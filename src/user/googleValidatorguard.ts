import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";

@Injectable()
export class GoogleValidatorGuard implements CanActivate {
  async validateGoogleUser(token: string): Promise<any> {
    console.log(
      "googleClientId",
      //   this.configService.get("misc.googleClientId"),
      process.env.GOOGLE_CLIENT_ID,
    );
    const user = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
    );
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers["authorization"]?.split(" ")[1];

      if (!token) {
        throw new UnauthorizedException("No token provided");
      }

      const payload = await this.validateGoogleUser(token);
      if (!payload) {
        throw new UnauthorizedException("Invalid token");
      }
      return true;
    } catch (er) {
      console.log("er-GoogleValidator", er);
    }
  }
}
