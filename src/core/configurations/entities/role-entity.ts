import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({ name: 'user_roles' })
class RoleEtity {
    @PrimaryColumn()
    id!: number;

    @Column()
    role!: string;

    @Column()
    active!: boolean;

    @Column()
    created!: Date;

    @Column()
    updated!: Date;

    @OneToMany(() => UserEntity, user => user.role)
    users!: UserEntity[];
}

export default RoleEtity;
