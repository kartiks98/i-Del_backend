import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { UpdateProfile } from "./profile.dto";

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async getProfileInfo(username: string) {
    return await this.profileRepository.fetchProfileInfo(username);
  }

  async updateProfile(body: UpdateProfile, username: string) {
    return await this.profileRepository.updateProfile(body, username);
  }
}
