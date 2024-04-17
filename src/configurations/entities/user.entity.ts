import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AddressEntity from "./address.entity";
import TelephoneEntity from "./telephone.entity";
import AccountEntity from "./account.entity";

@Entity({ name: 'users' })
class UserEntity {

    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Expose()
    @Column({ type: 'varchar' })
    name!: string;

    @Expose()
    @Column({ type: "date", name: 'birth_date' })
    birthDate!: Date;

    @Expose()
    @Column({ type: 'varchar' })
    sex!: string;

    @Expose()
    @Column({ type: 'varchar' })
    picture!: string;

    @Expose()
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @UpdateDateColumn()
    updated!: Date;

    @Expose()
    @OneToOne(() => AccountEntity, account => account.user)
    account!: AccountEntity;

    @Expose()
    @OneToMany(() => AddressEntity, address => address.user, { eager: true, cascade: true })
    @JoinColumn({ name: 'addresses' })
    addresses!: Array<AddressEntity>;

    @Expose()
    @OneToMany(() => TelephoneEntity, telephones => telephones.user, { eager: true, cascade: true })
    @JoinColumn({ name: 'telephones' })
    telephones!: Array<TelephoneEntity>;
}

export default UserEntity;
