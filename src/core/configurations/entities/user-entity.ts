import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import RoleEtity from "./role-entity";
import AddressEntity from "./address-entity";
import TelephoneEntity from "./telephone-entity";
import CredentialEntity from "./credentials_entity";
import AccessEntity from "./access-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'users' })
class UserEntity {

    @Expose()
    @PrimaryColumn()
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
    @Column()
    active!: boolean;

    @Expose()
    @Column()
    created!: Date;

    @Expose()
    @Column()
    updated!: Date;

    @Expose()
    @ManyToOne(() => RoleEtity, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role!: RoleEtity;

    @Expose()
    @ManyToOne(() => CredentialEntity, credential => credential.users)
    @JoinColumn({ name: 'credential_id' })
    credential!: CredentialEntity;

    @Expose()
    @OneToMany(() => AddressEntity, address => address.user)
    addresses!: AddressEntity[];

    @Expose()
    @OneToMany(() => TelephoneEntity, address => address.user)
    telephones!: TelephoneEntity[];

    @Expose()
    @OneToMany(() => AccessEntity, access => access.user)
    accesses!: AccessEntity[];
}

export default UserEntity;
