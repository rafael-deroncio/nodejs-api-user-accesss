import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({ name: 'user_addresses' })
class AddressEntity {
    @PrimaryColumn()
    id!: number

    @Column()
    street!: string;

    @Column()
    number!: string;

    @Column()
    district!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    country!: string;

    @Column()
    zipcode!: string;

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

    @ManyToOne(() => UserEntity, user => user.addresses)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}

export default AddressEntity;
