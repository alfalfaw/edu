import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'src/base.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum ManagerStatus {
  ENABLE = 2,
  DISABLE = 1
}
export enum ManagerGender {
  Male = 1,
  Female = 2,
  Unknown = 3
}

@Entity()
export class Manager extends BaseEntity {
  @ApiProperty({ example: '管理员1', description: '姓名' })
  @Column({ type: 'varchar', width: 20 })
  username: string

  @ApiProperty({ example: '12345', description: '密码' })
  @Column({ type: 'varchar', width: 255 })
  password: string

  @ApiProperty({ example: 1, description: '性别' })
  @Column({
    type: 'int',
    default: ManagerGender.Male
  })
  gender: number

  @ApiProperty({ example: '12345678901', description: '手机号' })
  @Column({ type: 'varchar', width: 11, nullable: true })
  mobile: string

  @ApiProperty({ example: '727338@qq.com', description: '邮箱' })
  @Column({ type: 'varchar', width: 40, nullable: true })
  email: string

  @ApiProperty({ example: 1, description: '角色id', nullable: true })
  @Column('int')
  role_id: number

  @ApiProperty({ example: 'vbxhebhannacdsteeq', description: '登录状态token' })
  @Column({ type: 'varchar', width: 255, nullable: true })
  remember_token: string

  @ApiProperty({ example: 2, description: '账号状态' })
  @Column({
    type: 'int',
    default: ManagerStatus.ENABLE
  })
  status: number
}
