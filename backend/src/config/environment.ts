export class Environment {
    static getName(): string {
        return process.env.NODE_ENV || "development"
    }

    static isTest(): boolean {
        return this.getName() === "test"
    }

    static isDevelopment(): boolean {
        return this.getName() === "development"
    }

    static isProduction(): boolean {
        return this.getName() === "production"
    }

    static getRedisURL(): string {
        return process.env.REDIS_URL!
    }

    static getJwtSecret(): string {
        return process.env.JWT_SECRET || "secret"
    }

    static getAdServerURL(): string {
        return process.env.AD_SERVER_URL || ""
    }

    static getXApiKey(): string {
        return process.env.X_API_KEY || ""
    }
}
