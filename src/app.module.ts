import { Module } from "@nestjs/common";
import { TasksModule } from "./orders/orders.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";
import { ProductModule } from "./product/product.module";
import { CartItemModule } from "./cart-item/cart-item.module";
import { CategoriesModule } from './categories/categories.module';
import dbConfig from "config/db.config";
import miscConfig from "config/misc.config";
import * as Joi from "joi";

const ENV = process.env.NODE_ENV;

const migrationEnvironments = ["prod", "uat"];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("db.host"),
        port: configService.get("db.port"),
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
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("local", "dev", "qa", "uat", "prod")
          .default("local"),
        // DB
        DB_PORT: Joi.number().port().default(5432),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        // MISC
        PORT: Joi.number().port().default(3001),
        API_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    TasksModule,
    UserModule,
    ProfileModule,
    ProductModule,
    CartItemModule,
    CategoriesModule,
  ],
})
export class AppModule {}
