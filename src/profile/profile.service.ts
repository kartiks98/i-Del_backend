import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { getUserDetails } from "src/common/methods";
import { UpdateProfile } from "./profile.dto";

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async getProfileInfo(accessToken: string) {
    const username = await getUserDetails(accessToken);
    return await this.profileRepository.fetchProfileInfo(username);
  }

  async updateProfile(body: UpdateProfile, accessToken: string) {
    const username = await getUserDetails(accessToken);
    return await this.profileRepository.updateProfile(body, username);
  }
}
