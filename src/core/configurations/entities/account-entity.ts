import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expose } from "class-transformer";
import UserEntity from "./user-entity";
import RoleEntity from "./role-entity";

@Entity({ name: 'accounts' })
class AccountEntity {
    
    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Expose()
    @Column()
    username!: string;

    @Expose()
    @Column()
    email!: string;

    @Expose()
    @Column()
    password!: string;

    @Expose()
    @Column({default: false})
    active!: boolean;

    @Expose()
    @Column()
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @Column()
    @UpdateDateColumn()
    updated!: Date;

    @Expose()
    @OneToOne(() => UserEntity, user => user.account, { eager: true, cascade: true })
    @JoinColumn({ name: 'user' })
    user!: UserEntity;

    @Expose()
    @ManyToOne(() => RoleEntity, role => role.accounts)
    @JoinColumn({ name: 'role' })
    role!: RoleEntity;
}

export default AccountEntity;
