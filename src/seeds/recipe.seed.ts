import { DataSource } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Category } from '../entities/category.entity';

export async function seedRecipes(dataSource: DataSource) {
  const categoryRepository = dataSource.getRepository(Category);
  const recipeRepository = dataSource.getRepository(Recipe);

  // Создаем категории
  const categories: Partial<Category>[] = [
    { slug: 'main-dishes', title: 'Основные блюда', type: 'dish' as const },
    { slug: 'snacks', title: 'Закуски', type: 'dish' as const },
    { slug: 'dumplings', title: 'Пельмени', type: 'subcategory' as const },
    { slug: 'street-food', title: 'Уличная еда', type: 'subcategory' as const },
    { slug: 'russian', title: 'Русская кухня', type: 'cuisine' as const },
    { slug: 'fusion', title: 'Фьюжн', type: 'cuisine' as const },
    { slug: 'traditional', title: 'Традиционная кухня', type: 'diet' as const },
    { slug: 'meat', title: 'Мясные блюда', type: 'diet' as const },
  ];

  await categoryRepository.save(categories);

  // Создаем рецепты
  const recipes = [
    {
      name: 'pelmeni-po-sibirski',
      title: 'Пельмени по-сибирски (старый рецепт)',
      description: 'Традиционные сибирские пельмени по старинному рецепту. Сочная мясная начинка в тонком тесте - классика русской кухни, которая никогда не выходит из моды.',
      cookTime: '150 минут',
      difficulty: '4/5',
      nutrition: {
        calories: { value: 282.5, unit: 'g' },
        protein: { value: 15.8, unit: 'g' },
        fat: { value: 12.3, unit: 'g' },
        carbs: { value: 29.4, unit: 'g' },
      },
      cuisine: 'Русская',
      servings: 8,
      ingredients: [
        { name: 'Мука пшеничная', amount: 1500, unit: 'g' },
        { name: 'Яйцо куриное', amount: 3, unit: 'pcs' },
        { name: 'Вода', amount: 500, unit: 'ml' },
        { name: 'Соль', amount: 1, unit: 'tsp' },
        { name: 'Фарш говяжий', amount: 1000, unit: 'g' },
        { name: 'Фарш свиной', amount: 500, unit: 'g' },
        { name: 'Лук репчатый', amount: 1000, unit: 'g' },
        { name: 'Перец черный молотый', amount: 1, unit: 'tsp' },
        { name: 'Чеснок', amount: 2, unit: 'pcs' },
      ],
      steps: [
        {
          image: '/hvorost/hvorost-na-kefire-1.webp',
          title: 'Шаг 1: Подготовка фарша',
          text: 'Пропустите через мясорубку говядину, свинину и репчатый лук. Добавьте измельченный чеснок, соль и перец. Тщательно перемешайте начинку до однородного состояния.'
        },
        {
          image: '/hvorost/hvorost-na-kefire-2.webp',
          title: 'Шаг 2: Замешиваем тесто',
          text: 'В глубокой миске смешайте муку с солью. Взбейте яйца с водой и постепенно вливайте в муку, замешивая крутое тесто. Вымешивайте не менее 10-12 минут до эластичного состояния.'
        },
        {
          image: '/hvorost/hvorost-na-kefire-5.webp',
          title: 'Шаг 3: Раскатаем и лепим',
          text: 'Разделите тесто на части. Раскатайте каждую часть в тонкий пласт. Вырежьте кружочки, выложите начинку и защипните края, формируя пельмени. Важно хорошо залепить края, чтобы начинка не вытекала при варке.'
        },
        {
          image: '/hvorost/hvorost-na-kefire-6.webp',
          title: 'Шаг 4: Варка',
          text: 'Опустите пельмени в кипящую подсоленную воду. После всплытия варите 8 минут на среднем огне. Подавайте горячими со сметаной, маслом или бульоном.'
        },
      ],
      imageMain: '/hvorost/hvorost-na-kefire-main-image-final.webp',
      categories: ['пельмени', 'русская кухня', 'сибирская кухня', 'второе блюдо', 'домашняя кухня', 'мясные блюда', 'традиционное блюдо', 'обед', 'ужин'],
      rating: 4.9,
      reviews: 272,
    },
    {
      name: 'shaurma-shashlychnaya',
      title: 'Шаурма «Шашлычная»',
      description: 'Аппетитная домашняя шаурма с сочным шашлыком из свинины и свежими овощами. Идеальное сочетание традиционного шашлыка в современной подаче - отличный вариант для пикника или домашнего обеда.',
      cookTime: '60 минут',
      difficulty: '2/5',
      nutrition: {
        calories: { value: 139.57, unit: 'g' },
        protein: { value: 5.97, unit: 'g' },
        fat: { value: 9.07, unit: 'g' },
        carbs: { value: 8.22, unit: 'g' },
      },
      cuisine: 'Русская',
      servings: 2,
      ingredients: [
        { name: 'Огурец', amount: 120, unit: 'g' },
        { name: 'Помидор', amount: 90, unit: 'g' },
        { name: 'Салат айсберг', amount: 20, unit: 'g' },
        { name: 'Майонез постный', amount: 16, unit: 'g' },
        { name: 'Сыр твердый', amount: 20, unit: 'g' },
        { name: 'Свинина для шашлыка', amount: 80, unit: 'g' },
        { name: 'Сок лимонный', amount: 20, unit: 'ml' },
        { name: 'Лепешка пшеничная', amount: 40, unit: 'g' }
      ],
      steps: [
        {
          image: '/hvorost/hvorost-na-kefire-1.webp',
          title: 'Шаг 1: Подготовка овощей',
          text: 'Тщательно вымойте все овощи. Нарежьте половину огурца, измельчите салат айсберг, нарежьте половину помидора. Сложите овощи в салатник.'
        },
        {
          image: '/hvorost/hvorost-na-kefire-2.webp',
          title: 'Шаг 2: Приготовление начинки',
          text: 'Заправьте овощи постным майонезом. Натрите сыр на мелкой терке и добавьте к овощам. Сбрызните все лимонным соком и перемешайте.'
        },
        {
          image: '/hvorost/hvorost-na-kefire-5.webp',
          title: 'Шаг 3: Добавление мяса',
          text: 'Готовый шашлык из свинины нарежьте небольшими кусочками и добавьте к овощной смеси. Шашлык должен быть предварительно приготовлен на мангале (30-40 минут).'
        },
        {
          image: '/hvorost/hvorost-na-kefire-6.webp',
          title: 'Шаг 4: Сборка шаурмы',
          text: 'В центр пшеничной лепешки выложите 1-2 ложки начинки. Сверните шаурму удобным способом, постепенно добавляя оставшуюся начинку.'
        }
      ],
      imageMain: '/hvorost/hvorost-na-kefire-main-image-final.webp',
      categories: ['закуски', 'уличная еда', 'фастфуд', 'шаурма', 'мясные блюда', 'для пикника', 'обед', 'перекус'],
      rating: 4.7,
      reviews: 19,
    }
  ];

  await recipeRepository.save(recipes);
} 