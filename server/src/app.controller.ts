import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common'

import { AuthService } from './auth/auth.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
@ApiTags('通用')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '登陆' })
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
