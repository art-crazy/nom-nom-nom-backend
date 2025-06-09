import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../entities/recipe.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RecipeDto, RecipeResponseDto } from './dto/recipe.dto';

@ApiTags('Рецепты')
@Controller('api/recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все рецепты с возможностью фильтрации' })
  @ApiResponse({ 
    status: 200, 
    description: 'Возвращает список рецептов с пагинацией',
    type: RecipeResponseDto
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Номер страницы' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Количество элементов на странице' })
  @ApiQuery({ name: 'dish_categories', required: false, type: String, description: 'ID категорий блюд через запятую' })
  @ApiQuery({ name: 'subcategories', required: false, type: String, description: 'ID подкатегорий через запятую' })
  @ApiQuery({ name: 'cuisine_categories', required: false, type: String, description: 'ID категорий кухонь через запятую' })
  @ApiQuery({ name: 'diet_categories', required: false, type: String, description: 'ID категорий диет через запятую' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('dish_categories') dishCategories?: string,
    @Query('subcategories') subcategories?: string,
    @Query('cuisine_categories') cuisineCategories?: string,
    @Query('diet_categories') dietCategories?: string,
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
  @ApiOperation({ summary: 'Получить рецепты для главной страницы' })
  @ApiResponse({ 
    status: 200, 
    description: 'Возвращает список избранных рецептов',
    type: [RecipeDto]
  })
  async findForHomePage() {
    return this.recipeService.findForHomePage();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить рецепт по ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Возвращает рецепт по указанному ID',
    type: RecipeDto
  })
  @ApiResponse({ status: 404, description: 'Рецепт не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Recipe> {
    return this.recipeService.findOne(id);
  }
} 