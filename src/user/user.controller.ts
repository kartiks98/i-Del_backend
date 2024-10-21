import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.dto";
import { GoogleAuthGuard } from "./googleAuth.guard";
import { UserEntity } from "./user.entity";
import { AnyAuthGuard } from "../common/anyAuth.guard";
import { PaginationParamsDecorator } from "src/common/decorators";
import { IPaginationParams } from "src/common/interface";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  signUp(@Body() body: User): Promise<string> {
    return this.userService.signUp(body);
  }

  @Post("signin")
  signIn(@Body() body: User) {
    return this.userService.signIn(body);
  }

  @Get("signin-google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get("signin-google-redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: IGoogleAuthResponse, @Res() res: IResponse) {
    this.userService.signInWithGoogle(req, res);
  }

  @Get("users/:limit/:pageNumber")
  @UseGuards(AnyAuthGuard)
  getUsers(
    @PaginationParamsDecorator() paginationParams: IPaginationParams,
  ): Promise<[UserEntity[], number]> {
    return this.userService.getUsers(paginationParams);
  }
}
