import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({ name: 'telephones' })
class TelephoneEntity {
    
    @Expose()
    @PrimaryGeneratedColumn('increment')
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
    @JoinColumn({ name: 'user' })
    user!: UserEntity;
}

export default TelephoneEntity;
