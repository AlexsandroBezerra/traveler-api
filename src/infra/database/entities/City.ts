import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import uploadConfigs from '@configs/upload'

@Entity('cities')
class City {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  @Exclude()
  image: string

  @Expose({ name: 'imageUrl' })
  getImageUrl(): string | null {
    return `${uploadConfigs.urlUploadPrefix}/${this.image}`
  }

  @Column()
  description: string

  @Column({ name: 'famous_for' })
  famousFor: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string
}

export default City
