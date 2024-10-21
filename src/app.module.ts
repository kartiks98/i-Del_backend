import { Module } from "@nestjs/common";
import { TasksModule } from "./orders/orders.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";
import { ProductModule } from "./product/product.module";
import dbConfig from "config/db.config";
import miscConfig from "config/misc.config";

const ENV = process.env.NODE_ENV;

const migrationEnvironments = ["prod", "uat"];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("db.host"),
        port: +configService.get("db.port"),
        username: configService.get("db.username"),
        password: configService.get("db.password"),
        database: configService.get("db.database"),
        autoLoadEntities: true,
        synchronize: !migrationEnvironments.includes(ENV),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, miscConfig],
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
    }),
    TasksModule,
    UserModule,
    ProfileModule,
    ProductModule,
  ],
})
export class AppModule {}
