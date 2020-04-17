import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common'

import { AuthService } from './auth/auth.service'
import { ApiTags, ApiOperation, ApiProperty, ApiHeader, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

export class LoginDTO {
  @ApiProperty({ example: 'admin', description: '用户名' })
  username: string
  @ApiProperty({ example: '1234', description: '密码' })
  password: string
}

@ApiTags('通用')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // 用户的请求会被LocalAuthGuard拦截，通过validate进行验证，返回的user给req.user，这项工作由Passport实现
  // LocalAuthGuard 可以自定义验证方式，实现不同用户登录
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '登陆' })
  async login(@Request() req, @Body() loginDTO: LoginDTO) {
    // 用req.user中中用户名和id获得jwt
    return {
      access_token: await this.authService.generateToken(req.user)
    }
  }

  // @ApiHeader({
  //   name: 'Authorization',
  //   description: ' Bearer '
  // })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: '获取用户资料' })
  getProfile(@Request() req) {
    return req.user
  }
}
