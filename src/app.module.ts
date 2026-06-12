import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { RolesGuard } from "./auth/roles.guard";
import { AttendancesModule } from "./attendances/attendances.module";
import { BotModule } from './bot/bot.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      // type: process.env.DATABASE_TYPE as "postgres",
      type: "postgres",
      url: process.env.DATABASE_URL,
      // will be uncommented for local db
      // host: process.env.DATABASE_HOST,
      // port: Number(process.env.DATABASE_PORT),
      // username: process.env.DATABASE_USERNAME,
      // password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE,
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ['dist/migrations/*.js'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    AuthModule,
    UsersModule,
    AttendancesModule,
    BotModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
