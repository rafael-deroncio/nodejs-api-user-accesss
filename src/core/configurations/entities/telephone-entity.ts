import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({ name: 'user_telephones' })
class TelephoneEntity {
    
    @Expose()
    @PrimaryGeneratedColumn({ name: 'address_id' })
    id!: number

    @Expose()
    @Column()
    number!: string;

    @Expose()
    @Column()
    type!: string;

    @Expose()
    @Column()
    principal!: boolean;

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
    @ManyToOne(() => UserEntity, user => user.telephones)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}

export default TelephoneEntity;
