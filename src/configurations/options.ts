import { config } from "dotenv";
import IOptions from "./interfaces/ioptions";

class Options implements IOptions {
    private static _instance: IOptions;
    private _environment: NodeJS.ProcessEnv;

    public static instance = () => !this._instance ? this._instance = new Options() : this._instance

    private constructor() {
        config();
        this._environment = process.env;
        if (Object.keys(this._environment).length === 0)
            console.warn('process.env is empty!');
    }

    public environment = (): NodeJS.ProcessEnv => this._environment;
    public get = (key: string): string | undefined => this._environment[key];
}

export default Options;