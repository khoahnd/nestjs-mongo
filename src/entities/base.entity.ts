// base.entity.ts
import { BaseEntity, BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export class BaseModel extends BaseEntity {
  @Column({
    type: 'number',
    nullable: false,
  })
  createdAt: number;

  @Column({
    type: 'number',
    nullable: false,
  })
  updatedAt: number;

  @BeforeInsert()
  beforeInsert() {
    const now = Date.now();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = Date.now();
  }
}
