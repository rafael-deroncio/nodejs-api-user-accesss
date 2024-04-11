import { plainToClass } from "class-transformer";
import IMapper from "./interfaces/imapper";

class Mapper implements IMapper {

    private static _instance: IMapper;
    private constructor() { }

    static instance(): IMapper {
        if (!this._instance) this._instance = new Mapper();
        return this._instance
    }

    map<T>(source: object | null, target: new () => T): T {
        if (!source) null as T
        return plainToClass(target, source, { excludeExtraneousValues: true }) as T;
    }
}

export default Mapper;