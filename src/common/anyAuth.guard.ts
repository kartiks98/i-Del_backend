// either-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtAuthGuard } from "../user/jwtAuth.guard";
import { GoogleValidatorGuard } from "../user/googleValidatorguard";

@Injectable()
export class AnyAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Create instance of JWT guard
      const jwtAuthGuard = new JwtAuthGuard();
      // Check JWT Auth
      const isJwtAuth = await jwtAuthGuard.canActivate(context);

      console.log("isAuth-jwt", isJwtAuth);
      // Return true if jwt Auth is successful
      if (isJwtAuth) return true;
    } catch {
      // Create instance of Google Validator Auth guard
      const googleAuthGuard = new GoogleValidatorGuard();
      // Check Google Validator Auth
      const isGoogleAuthGuard = await googleAuthGuard.canActivate(context);

      console.log("isAuth-google", isGoogleAuthGuard);
      // Return true if Google Validator Auth is successful
      if (isGoogleAuthGuard) return true;
    }
  }
}
