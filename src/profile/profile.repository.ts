import { DataSource, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProfile } from "./profile.dto";
import { ProfileEntity } from "./profile.entity";

@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfileEntity, dataSource.createEntityManager());
  }

  async fetchProfileInfo(username: string) {
    const foundProfileInfo = await this.findOneBy({ userId: username });
    if (!foundProfileInfo) {
      throw new NotFoundException("Profile Not Found");
    }
    return foundProfileInfo;
  }

  async updateProfile(body: UpdateProfile, username: string) {
    const updatedProfileInfo = await this.upsert(
      { ...body, userId: username },
      ["userId"],
    );
    return updatedProfileInfo.raw;
  }
}
