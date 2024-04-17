import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";

@Entity({ name: 'telephones' })
class TelephoneEntity {

    @Expose()
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Expose()
    @Column({ type: 'varchar' })
    number!: string;

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
