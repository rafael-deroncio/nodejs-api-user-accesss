interface IMapper {
    map<T>(source: object | null, target: new () => T): T;
}

export default IMapper;
