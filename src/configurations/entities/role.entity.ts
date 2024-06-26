import { Expose, Type } from "class-transformer";
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
    @Type(() => AccountEntity)
    @OneToMany(() => AccountEntity, account => account.role, { cascade: true })
    accounts!: AccountEntity[];
}

export default RoleEntity;
