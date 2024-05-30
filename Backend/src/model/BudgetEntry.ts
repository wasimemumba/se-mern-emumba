import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { User } from './User';  // Assuming you have a User entity defined elsewhere

@Entity()
export class BudgetEntry extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "float", nullable: false })
    price: number;

    @ManyToOne(() => User, user => user.budgetEntries, { nullable: false })
    user: User;

    @Column({ type: "varchar", nullable: false })
    date: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
