import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from 'typeorm';
import bcrypt from 'bcrypt';
import { BudgetEntry } from './BudgetEntry';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", nullable: false , select: false})
    password: string;

    @Column({ type: "float", nullable: false })
    budgetLimit: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => BudgetEntry, budgetEntry => budgetEntry.user)
    budgetEntries: BudgetEntry[];

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(Number(process.env.SALT || 10));  // Default to 10 if SALT is not defined
        this.password = await bcrypt.hash(this.password, salt);
    }
}
