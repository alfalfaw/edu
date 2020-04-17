import { Module } from '@nestjs/common'
import { ManagersController } from './managers.controller'
import { ManagersService } from './managers.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Manager } from './manager.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService],
  // 必须exports出去才能在Auth中使用
  exports: [ManagersService]
})
export class ManagersModule {}
