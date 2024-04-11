import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import RoleEtity from "./role-entity";
import AddressEntity from "./address-entity";
import TelephoneEntity from "./telephone-entity";
import CredentialEntity from "./credentials_entity";
import AccessEntity from "./access-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'users' })
class UserEntity {

    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Expose()
    @Column()
    name!: string;

    @Expose()
    @Column()
    birthDate!: Date;

    @Expose()
    @Column()
    sex!: string;

    @Expose()
    @Column({default: false})
    active!: boolean;
    
    @Expose()
    @Column()
    @CreateDateColumn()
    created!: Date;

    @Expose()
    @Column()
    @UpdateDateColumn()
    updated!: Date;

    @Expose()
    @ManyToOne(() => RoleEtity, role => role.users, { eager: true, cascade: true })
    @JoinColumn({ name: 'role_id' })
    role!: RoleEtity;

    @Expose()
    @ManyToOne(() => CredentialEntity, credential => credential.users, { eager: true, cascade: true })
    @JoinColumn({ name: 'credential_id' })
    credential!: CredentialEntity;

    @Expose()
    @OneToMany(() => AddressEntity, address => address.user, { eager: true, cascade: true })
    addresses!: AddressEntity[];

    @Expose()
    @OneToMany(() => TelephoneEntity, address => address.user, { eager: true, cascade: true })
    telephones!: TelephoneEntity[];

    @Expose()
    @OneToMany(() => AccessEntity, access => access.user, { eager: true, cascade: true })
    accesses!: AccessEntity[];
}

export default UserEntity;
