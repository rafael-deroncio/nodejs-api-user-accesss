/**
 * Interface representing options for accessing environment variables.
 */
interface IOptions {
    /**
     * Retrieve the value of the specified environment variable.
     * @param key The name of the environment variable.
     * @returns The value of the environment variable, or undefined if not found.
     */
    get(key: string): string | undefined;

    /**
     * Get the entire environment object containing all environment variables.
     * @returns The environment object.
     */
    environment(): NodeJS.ProcessEnv;
}

export default IOptions;
