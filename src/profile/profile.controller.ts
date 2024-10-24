import { Controller, Body, Patch, UseGuards, Get } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateProfile } from "./profile.dto";
import { AnyAuthGuard } from "src/common/anyAuth.guard";
import { Username } from "src/common/decorators";

@Controller("profile")
@UseGuards(AnyAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfileInfo(@Username() username: string) {
    return this.profileService.getProfileInfo(username);
  }

  @Patch()
  updateProfile(@Body() body: UpdateProfile, @Username() username: string) {
    return this.profileService.updateProfile(body, username);
  }
}
