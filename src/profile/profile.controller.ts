import {
  Controller,
  Body,
  Patch,
  Headers,
  UseGuards,
  Get,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { IHeaders } from "src/common/interface";
import { UpdateProfile } from "./profile.dto";
import { AnyAuthGuard } from "src/common/anyAuth.guard";

@Controller("profile")
@UseGuards(AnyAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfileInfo(@Headers() headers: IHeaders) {
    return this.profileService.getProfileInfo(headers.authorization);
  }

  @Patch()
  updateProfile(@Body() body: UpdateProfile, @Headers() headers: IHeaders) {
    return this.profileService.updateProfile(body, headers.authorization);
  }
}
