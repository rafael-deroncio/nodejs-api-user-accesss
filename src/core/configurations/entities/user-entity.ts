import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AddressEntity from "./address-entity";
import TelephoneEntity from "./telephone-entity";
import AccountEntity from "./account-entity";

@Entity({ name: 'users' })
class UserEntity {

    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Expose()
    @Column()
    name!: string;

    @Expose()
    @Column({name: 'birth_date'})
    birthDate!: Date;

    @Expose()
    @Column()
    sex!: string;

    @Expose()
    @Column()
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
    addresses!: AddressEntity[];

    @Expose()
    @OneToMany(() => TelephoneEntity, telephones => telephones.user, { eager: true, cascade: true })
    @JoinColumn({ name: 'telephones' })
    telephones!: AddressEntity[];
}

export default UserEntity;
