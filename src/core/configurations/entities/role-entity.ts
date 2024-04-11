import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'user_roles' })
class RoleEtity {
    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Expose()
    @Column()
    role!: string;

    @Expose()
    @Column({default: true})
    active!: boolean;

    @Expose()
    @Column()
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @Column()
    @UpdateDateColumn()
    updated!: Date;

    @OneToMany(() => UserEntity, user => user.role)
    users!: UserEntity[];
}

export default RoleEtity;
