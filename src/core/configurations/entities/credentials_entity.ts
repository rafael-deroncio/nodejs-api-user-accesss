import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'user_credentials' })
class CredentialEntity {
    
    @Expose()
    @PrimaryColumn()
    id!: number;

    @Expose()
    @Column()
    username!: string;

    @Expose()
    @Column()
    email!: string;

    @Expose()
    @Column()
    password!: string;

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
    @OneToMany(() => UserEntity, user => user.credential)
    users!: UserEntity[];
}

export default CredentialEntity;
