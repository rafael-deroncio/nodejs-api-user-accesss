import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AccountEntity from "./account.entity";

@Entity({ name: 'roles' })
class RoleEntity {
    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Expose()
    @Column({ type: 'varchar' })
    role!: string;

    @Expose()
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @UpdateDateColumn()
    updated!: Date;

    @Expose()
    @OneToMany(() => AccountEntity, account => account.role, { eager: true, cascade: true })
    accounts!: Array<AccountEntity>;
}

export default RoleEntity;
