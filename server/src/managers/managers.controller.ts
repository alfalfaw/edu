import { Controller, Body, Post, HttpCode, Res, HttpStatus, UseGuards, Request } from '@nestjs/common'
import { Manager } from './manager.entity'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { ManagersService } from './managers.service'

@Crud({
  model: {
    type: Manager
  }
  // dto: {
  //   create: GoodDTO,
  //   update: GoodDTO,
  // },
  //表示查询外键
  // query: {
  //   join: {
  //     application: { eager: true },
  //   },
  // },
})
@ApiTags('管理员')
@Controller('managers')
export class ManagersController implements CrudController<Manager> {
  constructor(public service: ManagersService) {}

  // @Post('login')
  // @ApiOperation({ summary: '登录' })
  // async login(@Res() res: Response, @Body() body) {
  //   // this.service.findManager('11321')
  //   const user = await this.service.findManager(body['username'])
  //   if (user && user.password === body['password'] && user.status == 2) {
  //     res.status(HttpStatus.OK).json([])
  //   } else {
  //     // res.status(HttpStatus.UNAUTHORIZED).json({ status: 'failed' })
  //     res.status(HttpStatus.UNAUTHORIZED).json([])
  //   }
  // }
}
