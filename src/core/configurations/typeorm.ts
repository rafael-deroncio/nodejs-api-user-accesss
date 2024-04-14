import { DataSource, DataSourceOptions } from "typeorm";
import config from "../../config";
import RoleEtity from "./entities/role-entity";
import RoleType from "./enums/role-type-enum";
import UserEntity from "./entities/user-entity";
import SexTypeEnum from "./enums/sex-type-enum";
import AccountEntity from "./entities/account-entity";
import DatabaseException from "../exceptions/database-exception";

export const options = { ...config.database.options } as DataSourceOptions
export const typeorm = new DataSource(options);
export const initialize = async () => {
    typeorm.initialize().then(async (dataSource) => {

        // Save Roles
        if ((await dataSource.getRepository(RoleEtity).find()).length == 0) {
            const roles: RoleEtity[] = [
                { id: RoleType.Manager, role: RoleType[RoleType.Manager] } as RoleEtity,
                { id: RoleType.Admin, role: RoleType[RoleType.Admin] } as RoleEtity,
                { id: RoleType.User, role: RoleType[RoleType.User] } as RoleEtity,
            ];
            await dataSource.getRepository(RoleEtity).save(roles);
            console.log('Roles created successfully!');
        }

        // Save accounts
        if ((await dataSource.getRepository(UserEntity).find()).length == 0) {
            const manager: AccountEntity = {
                username: config.accounts.manager.username,
                email: config.accounts.manager.email,
                password: config.accounts.manager.password,
                active: true,
                role: await dataSource.getRepository(RoleEtity).findOne({ where: { id: RoleType.Manager } }) ?? new RoleEtity(),
                user: await dataSource.getRepository(UserEntity).save({
                    name: RoleType[RoleType.Manager],
                    birthDate: new Date('1990-01-01'),
                    sex: SexTypeEnum[SexTypeEnum.Other],
                    picture: config.accounts.manager.picture
                }) as UserEntity
            } as AccountEntity;

            const admin: AccountEntity = {
                username: config.accounts.admin.username,
                email: config.accounts.admin.email,
                password: config.accounts.admin.password,
                active: true,
                role: await dataSource.getRepository(RoleEtity).findOne({ where: { id: RoleType.Admin } }) ?? new RoleEtity(),
                user: await dataSource.getRepository(UserEntity).save({
                    name: RoleType[RoleType.Admin],
                    birthDate: new Date('1990-01-01'),
                    sex: SexTypeEnum[SexTypeEnum.Other],
                    picture: config.accounts.admin.picture
                }) as UserEntity
            } as AccountEntity;

            await dataSource.getRepository(AccountEntity).save([manager, admin]);

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