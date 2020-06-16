export class ConfigurationError extends Error {

    readonly name = "Configuration Error";

    constructor(public message: string, public node?: any) {
        super(message);
    }

}