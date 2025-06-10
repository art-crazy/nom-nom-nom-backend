import { DataSource } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Category } from '../entities/category.entity';

export async function seedRecipes(dataSource: DataSource) {
  const categoryRepository = dataSource.getRepository(Category);
  const recipeRepository = dataSource.getRepository(Recipe);

  // Создаем категории, если они еще не существуют
  const categories = [
    { slug: 'main-dishes', title: 'Основные блюда', type: 'dish' as const },
    { slug: 'snacks', title: 'Закуски', type: 'dish' as const },
    { slug: 'dumplings', title: 'Пельмени', type: 'subcategory' as const },
    { slug: 'street-food', title: 'Уличная еда', type: 'subcategory' as const },
    { slug: 'russian', title: 'Русская кухня', type: 'cuisine' as const },
    { slug: 'fusion', title: 'Фьюжн', type: 'cuisine' as const },
    { slug: 'traditional', title: 'Традиционная кухня', type: 'diet' as const },
    { slug: 'meat', title: 'Мясные блюда', type: 'diet' as const }
  ];

  const savedCategories = new Map<string, Category>();

  for (const categoryData of categories) {
    let category = await categoryRepository.findOne({ where: { slug: categoryData.slug } });
    if (!category) {
      category = categoryRepository.create(categoryData);
      category = await categoryRepository.save(category);
    }
    savedCategories.set(categoryData.slug, category);
  }

  // Создаем рецепты
  const recipes = [
    {
      name: 'pelme11',
      title: '2Пельмени по-сибирски',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'shaurma',
      title: '1Шаурма по-домашнему',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'pelme11',
      title: '2Пельмени по-сибирски',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'shaurma',
      title: '1Шаурма по-домашнему',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'perec',
      title: 'Перец',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'sol',
      title: 'Соль',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'pelme11',
      title: '2Пельмени по-сибирски',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'shaurma',
      title: '1Шаурма по-домашнему',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'pelme11',
      title: '2Пельмени по-сибирски',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'shaurma',
      title: '1Шаурма по-домашнему',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'perec8',
      title: 'Перец8',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'sol7',
      title: 'Соль7',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'pelme116',
      title: '2Пельмени по-сибирски6',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'shaurma5',
      title: '1Шаурма по-домашнему5',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'pelme114',
      title: '2Пельмени по-сибирски4',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'shaurma3',
      title: '1Шаурма по-домашнему3',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    },
    {
      name: 'perec2',
      title: 'Перец2',
      description: 'Классические сибирские пельмени с сочной начинкой из трех видов мяса',
      cookTime: '60 минут',
      difficulty: 'medium',
      cuisine: 'Русская',
      servings: 4,
      nutrition: {
        calories: { value: 350, unit: 'ккал' },
        protein: { value: 20, unit: 'г' },
        carbs: { value: 40, unit: 'г' },
        fat: { value: 15, unit: 'г' }
      },
      ingredients: [
        { name: 'Мука пшеничная', amount: 500, unit: 'г' },
        { name: 'Яйцо', amount: 1, unit: 'шт' },
        { name: 'Вода', amount: 200, unit: 'мл' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Говядина', amount: 300, unit: 'г' },
        { name: 'Свинина', amount: 200, unit: 'г' },
        { name: 'Баранина', amount: 100, unit: 'г' },
        { name: 'Лук репчатый', amount: 2, unit: 'шт' },
        { name: 'Черный перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/pelmeni/step1.jpg',
          title: 'Приготовление теста',
          text: 'Приготовить тесто из муки, яйца, воды и соли'
        },
        {
          image: '/pelmeni/step2.jpg',
          title: 'Подготовка фарша',
          text: 'Пропустить мясо через мясорубку'
        },
        {
          image: '/pelmeni/step3.jpg',
          title: 'Добавление специй',
          text: 'Добавить мелко нарезанный лук и специи'
        },
        {
          image: '/pelmeni/step4.jpg',
          title: 'Раскатка теста',
          text: 'Раскатать тесто и вырезать кружки'
        },
        {
          image: '/pelmeni/step5.jpg',
          title: 'Лепка пельменей',
          text: 'Слепить пельмени'
        },
        {
          image: '/pelmeni/step6.jpg',
          title: 'Варка',
          text: 'Варить в подсоленной воде 5-7 минут'
        }
      ],
      imageMain: '/pelmeni.jpg',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.8,
      reviews: 2,
      dishCategories: [savedCategories.get('main-dishes')],
      subcategories: [savedCategories.get('dumplings')],
      cuisineCategories: [savedCategories.get('russian')],
      dietCategories: [savedCategories.get('traditional'), savedCategories.get('meat')]
    },
    {
      name: 'sol1',
      title: 'Соль1',
      description: 'С1очная шаурма с курицей, свежими овощами и ароматным соусом',
      cookTime: '30 минут',
      difficulty: 'easy',
      cuisine: 'Фьюжн',
      servings: 2,
      nutrition: {
        calories: { value: 450, unit: 'ккал' },
        protein: { value: 25, unit: 'г' },
        carbs: { value: 35, unit: 'г' },
        fat: { value: 20, unit: 'г' }
      },
      ingredients: [
        { name: 'Лаваш', amount: 4, unit: 'шт' },
        { name: 'Куриное филе', amount: 500, unit: 'г' },
        { name: 'Огурцы', amount: 2, unit: 'шт' },
        { name: 'Помидоры', amount: 2, unit: 'шт' },
        { name: 'Капуста', amount: 200, unit: 'г' },
        { name: 'Майонез', amount: 100, unit: 'г' },
        { name: 'Кетчуп', amount: 50, unit: 'г' },
        { name: 'Чеснок', amount: 2, unit: 'зуб' },
        { name: 'Соль', amount: 1, unit: 'ч.л' },
        { name: 'Перец', amount: 1, unit: 'ч.л' }
      ],
      steps: [
        {
          image: '/shaurma/step1.jpg',
          title: 'Подготовка курицы',
          text: 'Нарезать курицу тонкими полосками и обжарить'
        },
        {
          image: '/shaurma/step2.jpg',
          title: 'Нарезка овощей',
          text: 'Нарезать овощи соломкой'
        },
        {
          image: '/shaurma/step3.jpg',
          title: 'Приготовление соуса',
          text: 'Приготовить соус из майонеза, кетчупа и чеснока'
        },
        {
          image: '/shaurma/step4.jpg',
          title: 'Подготовка лаваша',
          text: 'Разогреть лаваш'
        },
        {
          image: '/shaurma/step5.jpg',
          title: 'Сборка шаурмы',
          text: 'Выложить начинку и соус'
        },
        {
          image: '/shaurma/step6.jpg',
          title: 'Завертывание',
          text: 'Завернуть шаурму'
        }
      ],
      imageMain: '/shaurma.jpg',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.5,
      reviews: 2,
      dishCategories: [savedCategories.get('snacks')],
      subcategories: [savedCategories.get('street-food')],
      cuisineCategories: [savedCategories.get('fusion')],
      dietCategories: []
    }
  ];

  // Сохраняем рецепты
  for (const recipeData of recipes) {
    const existingRecipe = await recipeRepository.findOne({ where: { name: recipeData.name } });
    if (!existingRecipe) {
      const recipe = recipeRepository.create(recipeData as unknown as Partial<Recipe>);
      await recipeRepository.save(recipe);
    }
  }
}
