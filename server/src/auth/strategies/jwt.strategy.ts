import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtConstants } from '../constants'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret
    })
  }
  // 在JWT策略中，根据要求，我们可以评估userId已解码令牌中的进位是否与用户数据库中的记录匹配，或者与已撤销令牌的列表匹配。因此，这种子分类和实施特定于策略的验证的模式是一致，优雅且可扩展的。
  // ignoreExpiration: false,表示不会忽略有效期，已到期令牌会直接报401
  async validate(payload: any) {
    //字典名必须是真实数据库字段，模型字段，这里进行数据库查询，看看用户是否到期

    // 根据id找到该用户
    const user = await this.authService.validateUserById(payload.sub)

    if (!user) {
      //用户不存在抛出异常
      throw new UnauthorizedException()
    }
    const current_time = new Date().getTime() / 1000

    // 在access_token时间内，无需更新access_token
    if (current_time < payload.exp) {
      await this.authService.refreshExpireTime(payload.id)
      return { id: payload.sub, username: payload.username }
    } else if (current_time < user.expire_time) {
      // 不在access_token时间内，更新access_token
      await this.authService.refreshExpireTime(payload.id)

      const token = await this.authService.generateToken(user)
      // 将 user对象返回给req.user
      return { id: payload.sub, username: payload.username, access_token: token }
    }
    // 登录状态过期抛出异常
    else throw new UnauthorizedException()
  }
}
