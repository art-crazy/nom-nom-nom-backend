import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../entities/recipe.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all recipes with optional filters' })
  @ApiResponse({ status: 200, description: 'Returns a list of recipes with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'dishCategories', required: false, type: String, description: 'Comma-separated dish category IDs' })
  @ApiQuery({ name: 'subcategories', required: false, type: String, description: 'Comma-separated subcategory IDs' })
  @ApiQuery({ name: 'cuisineCategories', required: false, type: String, description: 'Comma-separated cuisine category IDs' })
  @ApiQuery({ name: 'dietCategories', required: false, type: String, description: 'Comma-separated diet category IDs' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('dishCategories') dishCategories?: string,
    @Query('subcategories') subcategories?: string,
    @Query('cuisineCategories') cuisineCategories?: string,
    @Query('dietCategories') dietCategories?: string,
  ) {
    const filters = {
      dishCategories: dishCategories?.split(','),
      subcategories: subcategories?.split(','),
      cuisineCategories: cuisineCategories?.split(','),
      dietCategories: dietCategories?.split(','),
    };

    return this.recipeService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 12,
      filters,
    );
  }

  @Get('home')
  @ApiOperation({ summary: 'Get recipes for home page' })
  @ApiResponse({ status: 200, description: 'Returns a list of featured recipes' })
  async findForHomePage() {
    return this.recipeService.findForHomePage();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recipe by ID' })
  @ApiResponse({ status: 200, description: 'Returns a recipe by ID' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Recipe> {
    return this.recipeService.findOne(id);
  }
} 