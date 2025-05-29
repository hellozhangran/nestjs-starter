import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

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
}
