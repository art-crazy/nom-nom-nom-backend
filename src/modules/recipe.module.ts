import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Category } from '../entities/category.entity';
import { RecipeController } from '../controllers/recipe.controller';
import { RecipeService } from '../services/recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Category])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {} 