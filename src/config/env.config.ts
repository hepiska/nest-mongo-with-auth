import { ConfigModule } from '@nestjs/config';

const envModule = ConfigModule.forRoot({ isGlobal: true });

export const config = {
  databaseUrl: process.env.DATABASE_URL,
  saltRounds: Number(process.env.SALTROUND),
  jwtsecret: process.env.JWT_SECRET,
};

export default envModule;
