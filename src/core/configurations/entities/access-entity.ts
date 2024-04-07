import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({name: 'user_accesses'})
class AccessEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    active!: boolean;

    @Column()
    created!: Date;

    @Column()
    updated!: Date;

    @OneToMany(() => UserEntity, user => user.accesses)
    user!: UserEntity;
}

export default AccessEntity;
