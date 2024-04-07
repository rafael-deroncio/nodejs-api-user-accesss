interface IBaseConnection {

    connect(): Promise<void>;

    start(): Promise<void>;

    commit(): Promise<void>;

    rollback(): Promise<void>;
  }
  
  export default IBaseConnection;
  