import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "./user-entity";
import { Expose } from "class-transformer";

@Entity({name: 'user_accesses'})
class AccessEntity {
    
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
    @ManyToOne(() => UserEntity, user => user.accesses)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}

export default AccessEntity;
