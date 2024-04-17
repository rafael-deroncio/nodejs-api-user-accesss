import { plainToClass } from "class-transformer";
import IMapper from "./interfaces/imapper";

class Mapper implements IMapper {

    private static _instance: IMapper;
    private constructor() { }

    static instance(): IMapper {
        if (!this._instance) this._instance = new Mapper();
        return this._instance
    }

    private _options: object = { excludeExtraneousValues: true, enableImplicitConversion: true }

    map<T>(source: object | null, target: new () => T): T {
        if (!source) null as T
        return plainToClass(target, source, this._options);
    }
    maps<T>(source: object[] | null, target: new () => T): T[] {
        if (!source) return [];
        return source.map(item => plainToClass(target, item, this._options));
    }
}

export default Mapper;
