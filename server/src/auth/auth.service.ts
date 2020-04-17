import { Injectable } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { ManagersService } from 'src/managers/managers.service'

@Injectable()
export class AuthService {
  constructor(private readonly managersService: ManagersService, private readonly jwtService: JwtService) {}

  // async validateUser(username: string, password: string): Promise<any> {
  //     const user = await this.userModel.findOne({ username: username, password: password })
  //     return user
  // }

  // 登录验证用户
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.managersService.findManagerByName(username)
    // 后续改进：将数据库中加密后密码与用户提交密码的加密版本相比较确定用户是否合法  bcrypt
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
  // 访问受限Api验证用户
  async validateUserById(id: number): Promise<any> {
    // findOne找不到时返回undefined
    const user = await this.managersService.findOne(id)
    if (user) {
      const { password, ...result } = user
      return result
    }
    return null
  }
  // 让 managersService 刷新expire_time
  async refreshExpireTime(id: number) {
    await this.managersService.updateExpireTime(id)
  }

  async generateToken(user: any) {
    // exp为超时时间，默认设置为60*60*24 一天，sub作为用户id的名称是符合JWT标准的
    const payload = { username: user.username, sub: user.id }

    return this.jwtService.sign(payload)
  }
}
