import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import RoleEtity from "./role-entity";
import AddressEntity from "./address-entity";
import TelephoneEntity from "./telephone-entity";
import CredentialEntity from "./credentials_entity";
import AccessEntity from "./access-entity";

@Entity({ name: 'users' })
class UserEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    birthDate!: Date;

    @Column()
    sex!: string;

    @Column()
    active!: boolean;

    @Column()
    created!: Date;

    @Column()
    updated!: Date;

    @ManyToOne(() => RoleEtity, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role!: RoleEtity;

    @ManyToOne(() => CredentialEntity, credential => credential.users)
    @JoinColumn({ name: 'credential_id' })
    credential!: CredentialEntity;

    @OneToMany(() => AddressEntity, address => address.user)
    addresses!: AddressEntity[];

    @OneToMany(() => TelephoneEntity, address => address.user)
    telephones!: TelephoneEntity[];

    @OneToMany(() => AccessEntity, access => access.user)
    accesses!: AccessEntity[];
}

export default UserEntity;
