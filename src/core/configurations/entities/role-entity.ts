import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AccountEntity from "./account_entity";

@Entity({ name: 'roles' })
class RoleEntity {
    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Expose()
    @Column()
    role!: string;

    @Expose()
    @Column()
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @Column()
    @UpdateDateColumn()
    updated!: Date;

    @Expose()
    @OneToMany(() => AccountEntity, account => account.role)
    accounts!: AccountEntity[];
}

export default RoleEntity;
