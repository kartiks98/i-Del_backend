import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "./profile.entity";
import { ProfileRepository } from "./profile.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
