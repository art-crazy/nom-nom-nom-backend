import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import { seedRecipes } from './seeds/recipe.seed';

const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false
  },
  extra: {
    connectionTimeoutMillis: 5000,
    query_timeout: 10000,
    statement_timeout: 10000,
    connectTimeoutMS: 10000
  }
};

console.log('Database configuration:', {
  ...dbConfig,
  password: '***' // Скрываем пароль в логах
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      autoLoadEntities: true,
      logging: true,
      logger: 'advanced-console'
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      console.log('✅ Successfully connected to the database');
      
      // Проверяем, есть ли уже данные в базе
      const recipeCount = await this.dataSource.getRepository('recipes').count();
      if (recipeCount === 0) {
        console.log('🌱 Seeding database with initial data...');
        await seedRecipes(this.dataSource);
        console.log('✅ Database seeded successfully');
      }
    }
  }
}
