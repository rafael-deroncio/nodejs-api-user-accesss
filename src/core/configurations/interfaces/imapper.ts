interface IMapper {
    map<T>(source: object, target: new () => T): T;
}

export default IMapper;
