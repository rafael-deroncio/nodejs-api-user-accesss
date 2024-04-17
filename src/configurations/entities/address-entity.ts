import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({ name: 'addresses' })
class AddressEntity {

    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Expose()
    @Column({ type: 'varchar' })
    street!: string;

    @Expose()
    @Column({ type: 'varchar' })
    number!: string;

    @Expose()
    @Column({ type: 'varchar' })
    district!: string;

    @Expose()
    @Column({ type: 'varchar' })
    city!: string;

    @Expose()
    @Column({ type: 'varchar' })
    state!: string;

    @Expose()
    @Column({ type: 'varchar' })
    country!: string;

    @Expose()
    @Column({ type: 'varchar' })
    zipcode!: string;

    @Expose()
    @Column({ type: 'varchar' })
    type!: string;

    @Expose()
    @Column({ type: 'boolean', default: false })
    principal!: boolean;

    @Expose()
    @Column({ type: 'boolean', default: false })
    active!: boolean;

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
