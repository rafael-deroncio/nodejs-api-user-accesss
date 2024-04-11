
import { DataSource, DataSourceOptions } from "typeorm";
import config from "../../config";
import RoleEtity from "./entities/role-entity";
import RoleType from "./enums/role-type-enum";
import UserEntity from "./entities/user-entity";
import SexTypeEnum from "./enums/sex-type-enum";
import CredentialEntity from "./entities/credentials_entity";
import DatabaseException from "../exceptions/database-exception";

export const options = { ...config.database.options } as DataSourceOptions
export const typeorm = new DataSource(options);
export const initialize = async () => {
    typeorm.initialize().then(async (dataSource) => {

        if ((await dataSource.getRepository(RoleEtity).find()).length == 0) {
            const roles: RoleEtity[] = [
                { id: RoleType.Manager, role: RoleType[RoleType.Manager], active: true } as RoleEtity,
                { id: RoleType.Admin, role: RoleType[RoleType.Admin], active: true } as RoleEtity,
                { id: RoleType.User, role: RoleType[RoleType.User], active: true } as RoleEtity,
            ];
            await dataSource.getRepository(RoleEtity).save(roles);
            console.log('Roles created successfully!');
        }

        if ((await dataSource.getRepository(UserEntity).find()).length == 0) {
            const manager: UserEntity = new UserEntity();
            manager.name = RoleType[RoleType.Manager];
            manager.birthDate = new Date('1990-01-01');
            manager.sex = SexTypeEnum[SexTypeEnum.Other];
            manager.active = true;
            manager.role = await dataSource.getRepository(RoleEtity).findOne({ where: { id: RoleType.Manager } }) ?? new RoleEtity();
            manager.credential = await dataSource.getRepository(CredentialEntity).save({
                username: config.access.manager.username,
                email: config.access.manager.email,
                password: config.access.manager.password,
                active: true
            });

            const admin: UserEntity = new UserEntity();
            admin.name = RoleType[RoleType.Admin];
            admin.birthDate = new Date('1990-01-01');
            admin.sex = SexTypeEnum[SexTypeEnum.Other];
            admin.active = true;
            admin.role = await dataSource.getRepository(RoleEtity).findOne({ where: { id: RoleType.Admin } }) ?? new RoleEtity();
            admin.credential = await dataSource.getRepository(CredentialEntity).save({
                username: config.access.admin.username,
                email: config.access.admin.email,
                password: config.access.admin.password,
                active: true
            });

            await dataSource.getRepository(UserEntity).save([manager, admin]);

            console.log('Access Manager and Access Admin created successfully!');
        }


        console.log('Database initialized successfully!');
    }).catch((error) => {
        console.error(`Error starting the Database. ${error}`)
    }).catch((error) => {
        console.error(error);
        throw new DatabaseException();
    });
}