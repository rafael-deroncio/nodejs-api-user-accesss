import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'user_addresses' })
class AddressEntity {
    
    @Expose()
    @PrimaryColumn()
    id!: number

    @Expose()
    @Column()
    street!: string;

    @Expose()
    @Column()
    number!: string;

    @Expose()
    @Column()
    district!: string;

    @Expose()
    @Column()
    city!: string;

    @Expose()
    @Column()
    state!: string;

    @Expose()
    @Column()
    country!: string;

    @Expose()
    @Column()
    zipcode!: string;

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
    @ManyToOne(() => UserEntity, user => user.addresses)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}

export default AddressEntity;
