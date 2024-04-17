import { DataSource, DataSourceOptions } from "typeorm";
import config from "../config";
import RoleEtity from "./entities/role.entity";
import RoleType from "./enums/role.type.enum";
import UserEntity from "./entities/user.entity";
import AccountEntity from "./entities/account.entity";
import DatabaseException from "../exceptions/database.exception";
import { picture } from "../helpers/image.helper";

export const options = { ...config.database.options } as DataSourceOptions
export const typeorm = new DataSource(options);
export const initialize = async () => {
    typeorm.initialize()
        .then(async (dataSource) => {
            console.log('Initialize Database ...');

            let roles: Array<RoleEtity> = [];

            // Save Roles
            if ((await dataSource.getRepository(RoleEtity).find()).length == 0) {
                roles = [
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
                    role: roles.find(role => role.id === RoleType.Manager) ??
                        await dataSource.getRepository(RoleEtity).findOne({ where: { id: RoleType.Manager } }),
                    user: await dataSource.getRepository(UserEntity).save({
                        name: RoleType[RoleType.Manager],
                        birthDate: new Date('1990-01-01'),
                        sex: 'Other',
                        picture: picture.sex('Other')
                    }) as UserEntity
                } as AccountEntity;

                const admin: AccountEntity = {
                    username: config.accounts.admin.username,
                    email: config.accounts.admin.email,
                    password: config.accounts.admin.password,
                    active: true,
                    role: roles.find(role => role.id === RoleType.Admin) ??
                        await dataSource.getRepository(RoleEtity).findOne({ where: { id: RoleType.Admin } }),
                    user: await dataSource.getRepository(UserEntity).save({
                        name: RoleType[RoleType.Admin],
                        birthDate: new Date('1990-01-01'),
                        sex: 'Other',
                        picture: picture.sex('Other')
                    }) as UserEntity
                } as AccountEntity;

                await dataSource.getRepository(AccountEntity).save([manager, admin]);
                console.log('Access Manager and Access Admin created successfully!');
            }

            console.log('Initialize successfully ...');
        }).catch((error) => {
            console.error(`Error Initialize the Database. ${error}`)
        }).catch((error) => {
            console.error(error);
            throw new DatabaseException();
        });
}