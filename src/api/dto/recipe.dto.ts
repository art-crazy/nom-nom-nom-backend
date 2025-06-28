import { ApiProperty } from '@nestjs/swagger';

export class RecipeDto {
  @ApiProperty({
    description: 'ID рецепта',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Название рецепта',
    example: 'Паста Карбонара'
  })
  name: string;

  @ApiProperty({
    description: 'Описание рецепта',
    example: 'Классическая итальянская паста с беконом и сливочным соусом'
  })
  description: string;

  @ApiProperty({
    description: 'ID категории блюда',
    example: 1
  })
  dishCategoryId: number;

  @ApiProperty({
    description: 'ID подкатегории',
    example: 2
  })
  subcategoryId: number;

  @ApiProperty({
    description: 'ID категории кухни',
    example: 3
  })
  cuisineCategoryId: number;

  @ApiProperty({
    description: 'ID категории диеты',
    example: 4
  })
  dietCategoryId: number;

  @ApiProperty({
    description: 'URL видео рецепта',
    example: 'https://rutube.ru/shorts/5678c14d9f9cccc98ce6dedb24e00319/',
    required: false
  })
  videoUrl?: string;
}

export class RecipeResponseDto {
  @ApiProperty({
    description: 'Список рецептов',
    type: [RecipeDto]
  })
  items: RecipeDto[];

  @ApiProperty({
    description: 'Общее количество рецептов',
    example: 100
  })
  total: number;

  @ApiProperty({
    description: 'Текущая страница',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'Количество элементов на странице',
    example: 12
  })
  limit: number;

  @ApiProperty({
    description: 'Флаг, указывающий что был использован fallback (возвращены все рецепты)',
    example: false
  })
  fallbackTriggered: boolean;
}

export class RecipeDetailDto {
  @ApiProperty({
    description: 'ID рецепта',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Название рецепта',
    example: 'Паста Карбонара'
  })
  name: string;

  @ApiProperty({
    description: 'Заголовок рецепта',
    example: 'Классическая паста Карбонара'
  })
  title: string;

  @ApiProperty({
    description: 'Описание рецепта',
    example: 'Классическая итальянская паста с беконом и сливочным соусом'
  })
  description: string;

  @ApiProperty({
    description: 'Время приготовления',
    example: '30 мин'
  })
  cookTime: string;

  @ApiProperty({
    description: 'Сложность приготовления',
    example: '3/5'
  })
  difficulty: string;

  @ApiProperty({
    description: 'Питательная ценность',
    example: {
      calories: { value: 450, unit: 'ккал' },
      protein: { value: 15, unit: 'г' },
      fat: { value: 30, unit: 'г' },
      carbs: { value: 25, unit: 'г' }
    }
  })
  nutrition: {
    calories: { value: number; unit: string };
    protein: { value: number; unit: string };
    fat: { value: number; unit: string };
    carbs: { value: number; unit: string };
  };

  @ApiProperty({
    description: 'Тип кухни',
    example: 'Итальянская'
  })
  cuisine: string;

  @ApiProperty({
    description: 'Количество порций',
    example: 4
  })
  servings: number;

  @ApiProperty({
    description: 'Список ингредиентов',
    example: [
      { name: 'Паста', amount: 400, unit: 'г' },
      { name: 'Бекон', amount: 200, unit: 'г' }
    ]
  })
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;

  @ApiProperty({
    description: 'Шаги приготовления',
    example: [
      {
        title: 'Шаг 1',
        text: 'Отварить пасту',
        image: '/path/to/image.jpg'
      }
    ]
  })
  steps: Array<{
    title: string;
    text: string;
    image: string;
  }>;

  @ApiProperty({
    description: 'Главное изображение рецепта',
    example: '/path/to/main-image.jpg'
  })
  imageMain: string;

  @ApiProperty({
    description: 'Категории рецепта',
    example: ['паста', 'итальянская кухня']
  })
  categories: string[];

  @ApiProperty({
    description: 'Рейтинг рецепта',
    example: 4.5
  })
  rating: number;

  @ApiProperty({
    description: 'Количество отзывов',
    example: 25
  })
  reviews: number;

  @ApiProperty({
    description: 'URL видео рецепта',
    example: 'https://rutube.ru/shorts/5678c14d9f9cccc98ce6dedb24e00319/',
    required: false
  })
  videoUrl?: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата последнего обновления',
    example: '2024-01-01T00:00:00.000Z'
  })
  updatedAt: Date;
} 