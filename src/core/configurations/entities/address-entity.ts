import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'user_addresses' })
class AddressEntity {
    
    @Expose()
    @PrimaryGeneratedColumn('increment')
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
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @Column()
    @UpdateDateColumn()
    updated!: Date;

    @Expose()
    @ManyToOne(() => UserEntity, user => user.addresses)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}

export default AddressEntity;
