import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'user_credentials' })
class CredentialEntity {
    
    @Expose()
    @PrimaryGeneratedColumn('increment')
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
    @OneToMany(() => UserEntity, user => user.credential)
    users!: UserEntity[];
}

export default CredentialEntity;
