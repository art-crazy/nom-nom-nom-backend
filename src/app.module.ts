import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { RecipeModule } from './modules/recipe.module';
import { CollectionModule } from './modules/collection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RecipeModule,
    CollectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 