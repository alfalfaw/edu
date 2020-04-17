import { Injectable } from '@nestjs/common'
import { Manager } from './manager.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
@Injectable()
export class ManagersService extends TypeOrmCrudService<Manager> {
  constructor(@InjectRepository(Manager) repo) {
    super(repo)
  }

  async findManager(username: string): Promise<Manager | undefined> {
    const user = await this.repo.findOne({ username: username })
    return user
  }
}
