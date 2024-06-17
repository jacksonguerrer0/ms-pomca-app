import { plainToClass } from "class-transformer";
import { IsEnum, IsString, validateSync } from "class-validator";
import { skip } from "node:test";
import { AppEnv } from "src/model/enums/env.enum";

class EnvVariables {
  @IsEnum(AppEnv)
  APP_ENV!: string;

  @IsString()
  DB_NAME!: string;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  DB_HOST!: string;

  @IsString()
  DB_PORT!: string;

  @IsString()
  DB_TYPE!: string;
}


export function validateEnvVariables(config: Record<string, unknown>) {
  const validateConfig = plainToClass(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Environment variable validation failed: ${JSON.stringify(errors)}`,
    );
  }

  return validateConfig;
}
