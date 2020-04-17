import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

export abstract class BaseEntity {
  @ApiProperty({ example: 123, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: '2018-12-12', description: '创建时间' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  /**
   * DB last update time.
   */
  @ApiProperty({ example: '2018-12-12', description: '更新时间' })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date

  // @ApiProperty({ example: '2018-12-12', description: '更新时间' })
  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // updatedAt: string
}
