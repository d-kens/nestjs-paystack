import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  paystack_ref: string;

  @Column('float', { nullable: true })
  amountDonated: number;

  @Column({ default: false })
  isSubscribed: boolean;

  @Column({ nullable: true })
  planName: string;

  @Column('datetime', { nullable: true })
  timeSubscribed: Date;
}
