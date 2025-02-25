export interface DatabaseConfigOptions {
    user: string,
    password: string,
    name: string,
    host: string,
    driver: string,
}

export default class DatabaseConfig{
    public  user : string;
    public password: string;
    public host: string;
    public driver: string;
    public name: string

     _databaseConfigOptionsFromEnv(): DatabaseConfigOptions {
        return {
            user: process.env.DB_USER ?? "",
            password: process.env.DB_PASS ?? "",
            driver: process.env.DB_DRIVER ?? "",
            name: process.env.DB_NAME ?? "",
            host: process.env.DB_HOST ?? "",
        }
    }

    constructor(config?: DatabaseConfigOptions) {
        // Get data from config or if not available from env
        const {user, password, host, driver, name} = config ?? this._databaseConfigOptionsFromEnv();

        this.user = user; // root
        this.password = password; // f$a#21F5S
        this.host = host; // localhost
        this.driver = driver; // mariadb / sqlite etc.
        this.name = name; // database_name
    }

    public constructConnectionPath() : string {
        return `${this.driver}://${this.user}:${this.password}@${this.host}/${this.name}`
    } // mariadb://root:f$a#21F5S@localhost/database_name

}
