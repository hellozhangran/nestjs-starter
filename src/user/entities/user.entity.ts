import { BeforeInsert, Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'tinyint', default: null })
  age: number;

  @Column({ type: 'varchar', length: 10, default: '' })
  sex: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  email: string;

  @Column({ type: 'date', nullable: true, default: null })
  birth_date: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_time: Date;

  @Column({ type: 'varchar', nullable: true, default: '' })
  avatar: string;

  @Column({ select: false }) // 查询操作不返回密码
  password: string;

  @Column({ type: 'simple-enum', enum: ['root', 'author', 'visitor'], default: 'visitor' })
  role: string;

  @BeforeInsert() 
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
