import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';

interface RecipeFilters {
  dishCategories?: string[];
  subcategories?: string[];
  cuisineCategories?: string[];
  dietCategories?: string[];
}

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 12,
    filters?: RecipeFilters,
  ): Promise<{ recipes: Recipe[]; total: number; totalPages: number }> {
    const queryBuilder = this.recipeRepository.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.dishCategories', 'dishCategories')
      .leftJoinAndSelect('recipe.subcategories', 'subcategories')
      .leftJoinAndSelect('recipe.cuisineCategories', 'cuisineCategories')
      .leftJoinAndSelect('recipe.dietCategories', 'dietCategories');

    if (filters) {
      if (filters.dishCategories?.length) {
        queryBuilder.andWhere('dishCategories.id IN (:...dishCategories)', {
          dishCategories: filters.dishCategories,
        });
      }

      if (filters.subcategories?.length) {
        queryBuilder.andWhere('subcategories.id IN (:...subcategories)', {
          subcategories: filters.subcategories,
        });
      }

      if (filters.cuisineCategories?.length) {
        queryBuilder.andWhere('cuisineCategories.id IN (:...cuisineCategories)', {
          cuisineCategories: filters.cuisineCategories,
        });
      }

      if (filters.dietCategories?.length) {
        queryBuilder.andWhere('dietCategories.id IN (:...dietCategories)', {
          dietCategories: filters.dietCategories,
        });
      }
    }

    const [recipes, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return { recipes, total, totalPages };
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['dishCategories', 'subcategories', 'cuisineCategories', 'dietCategories'],
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  async findForHomePage() {
    return this.recipeRepository.find({
      select: ['id', 'name', 'title', 'description', 'imageMain', 'rating', 'reviews'],
      order: { rating: 'DESC' },
      take: 12
    });
  }
}
