// import mongoose from "mongoose";

// const UserTokenSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     token: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         expires: 43200
//     },
// });


// const UserToken = mongoose.model('UserToken', UserTokenSchema);

// export default UserToken;

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class UserToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, user => user.id, { nullable: false })
    @JoinColumn()
    user: User;

    @Column({ type: "varchar", nullable: false })
    token: string;

    @CreateDateColumn()
    createdAt: Date;
}