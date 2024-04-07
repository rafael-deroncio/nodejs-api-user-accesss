import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({ name: 'user_telephones' })
class TelephoneEntity {
    @PrimaryColumn({ name: 'address_id' })
    id!: number

    @Column()
    number!: string;

    @Column()
    type!: string;

    @Column()
    principal!: boolean;

    @Column()
    active!: boolean;

    @Column()
    created!: Date;

    @Column()
    updated!: Date;

    @ManyToOne(() => UserEntity, user => user.telephones)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}

export default TelephoneEntity;
