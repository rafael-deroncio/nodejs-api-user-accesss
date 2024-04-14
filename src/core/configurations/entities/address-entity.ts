import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({ name: 'addresses' })
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
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @UpdateDateColumn()
    updated!: Date;

    @ManyToOne(() => UserEntity, user => user.addresses)
    @JoinColumn({ name: 'user' })
    user!: UserEntity;
}

export default AddressEntity;
