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
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.managersService.findManager(username)
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
