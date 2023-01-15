import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ManualsService } from './manuals/manuals.service';
import { ManualsModule } from './manuals/manuals.module';
import { CategoriesModule } from './categories/categories.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL ||
        'mongodb+srv://fenq2:90Llor1Ss@cluster0.wz3ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    AuthModule,
    UsersModule,
    ManualsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
