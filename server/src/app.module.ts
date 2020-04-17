import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ManagersModule } from './managers/managers.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
@Module({
  imports: [TypeOrmModule.forRoot(), ManagersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
