import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'user_telephones' })
class TelephoneEntity {
    
    @Expose()
    @PrimaryColumn({ name: 'address_id' })
    id!: number

    @Expose()
    @Column()
    number!: string;

    @Expose()
    @Column()
    type!: string;

    @Expose()
    @Column()
    principal!: boolean;

    @Expose()
    @Column()
    active!: boolean;

    @Expose()
    @Column()
    created!: Date;

    @Expose()
    @Column()
    updated!: Date;

    @Expose()
    @ManyToOne(() => UserEntity, user => user.telephones)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}

export default TelephoneEntity;
