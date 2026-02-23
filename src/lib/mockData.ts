import { Food, Wine, Restaurant, Category } from './types';

export const mockRestaurants: Restaurant[] = [
    // 미슐랭
    {
        id: 'mingles',
        name: '밍글스 (Mingles)',
        category: '미슐랭',
        starRating: 3,
        region: '서울 강남구 청담동',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
        description: '강민구 셰프의 \'장(Jang)\' 중심 한식 퀴진의 정점. 전통과 현대의 조화로운 융합.',
        signatureDishes: ['장 트리오', '멸치 국수', '한우 채끝 구이'],
        isActive: true,
        promotionYear: 2024
    },
    {
        id: 'jungsik',
        name: '정식당 (Jungsik)',
        category: '미슐랭',
        starRating: 2,
        region: '서울 강남구 청담동',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1550966842-28c2e2760882?auto=format&fit=crop&q=80&w=1200',
        description: '임정식 셰프의 뉴 코리안 퀴진. 창의적인 발상과 완벽한 기술.',
        signatureDishes: ['맛있는 김밥', '돌하르방 디저트'],
        isActive: true
    },

    // 기념일
    {
        id: 'evett',
        name: '에빗 (EVETT)',
        category: '기념일',
        starRating: 2,
        region: '서울 강남구 신사동',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200',
        description: '특별한 날을 빛내줄 조셉 리저우드 셰프의 창의적인 퀴진.',
        signatureDishes: ['우렁이 이끼', '개미 디저트'],
        isActive: true
    },
    {
        id: 'layeon',
        name: '라연 (La Yeon)',
        category: '기념일',
        starRating: 2,
        region: '서울 중구 장충동 (신라호텔)',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=1200',
        description: '호텔의 격조와 함께하는 완벽한 기념일 다이닝.',
        signatureDishes: ['신선로', '갈비찜'],
        isActive: true
    },

    // 스시
    {
        id: 'kojima',
        name: '코지마 (Kojima)',
        category: '스시',
        starRating: 2,
        region: '서울 강남구 청담동',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=1200',
        description: '최고급 식재료로 빚어내는 스시의 예술.',
        signatureDishes: ['오도로 스시', '전복 술찜'],
        isActive: true
    },
    {
        id: 'mori',
        name: '모리 (Mori)',
        category: '스시',
        starRating: 1,
        region: '부산 해운대구',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1200',
        description: '부산 바다의 신선함을 담은 하이엔드 스시.',
        signatureDishes: ['제철 사시미', '해산물 구이'],
        isActive: true
    },

    // 우마카세
    {
        id: 'bornandbred',
        name: '본앤브레드 (Born & Bred)',
        category: '우마카세',
        region: '서울 성동구 마장동',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
        description: '한우 오마카세의 정점. 고기에 대한 깊은 철학.',
        signatureDishes: ['한우 구이', '카츠 샌드'],
        isActive: true
    },
    {
        id: 'sodo',
        name: '소도 (Sodo)',
        category: '우마카세',
        region: '서울 강남구',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
        description: '섬세한 마블링과 불의 조화가 일품인 프리미엄 우마카세.',
        isActive: true
    },

    // 부모님
    {
        id: 'onjium',
        name: '온지음 (Onjium)',
        category: '부모님',
        starRating: 1,
        region: '서울 종로구 창성동',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1589113331515-efdbebfbf531?auto=format&fit=crop&q=80&w=1200',
        description: '부모님을 모시고 가기 좋은 정갈하고 깊은 맛의 고전 한식.',
        signatureDishes: ['수선판', '전복 육회'],
        isActive: true
    },
    {
        id: 'bicena',
        name: '비채나 (Bicena)',
        category: '부모님',
        starRating: 1,
        region: '서울 송파구 신천동 (롯데월드타워)',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1533777857419-122c4d5fc7fd?auto=format&fit=crop&q=80&w=1200',
        description: '전국 조망과 함께하는 부모님께 드리는 최고의 한 끼.',
        signatureDishes: ['금태 구이', '갈비찜'],
        isActive: true
    },

    // 상견례
    {
        id: 'kwon',
        name: '권숙수 (Kwon Sook Soo)',
        category: '상견례',
        starRating: 2,
        region: '서울 강남구 압구정동',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
        description: '격조 있는 분위기와 정교한 음식으로 상견례에 최적화된 곳.',
        signatureDishes: ['섬진강 참게 죽', '한우 구이'],
        isActive: true
    },
    {
        id: 'soseoul',
        name: '소설한남 (So Seoul Hannam)',
        category: '상견례',
        starRating: 1,
        region: '서울 용산구 한남동',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1533777857419-122c4d5fc7fd?auto=format&fit=crop&q=80&w=1200',
        description: '차분하고 모던한 매력으로 가족 간의 깊은 대화가 가능한 공간.',
        isActive: true
    },

    // AI 소믈리에 추천 (Vinho is a great fit)
    {
        id: 'vinho',
        name: '빈호 (Vinho)',
        category: 'AI소믈리에',
        starRating: 1,
        region: '서울 강남구 논현동',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=1200',
        description: 'AI 소믈리에가 가장 정교하게 페어링을 리드하는 와인 다이닝.',
        signatureDishes: ['계절 생선 요리', '양갈비 구이'],
        isActive: true
    }
];

export const mockFoods: Food[] = [
    {
        id: 'm1',
        restaurantId: 'mingles',
        name: '장 트리오 (Soy Trio Dessert)',
        main_ingredient: '된장 크렘브륄레, 간장 피칸, 고추장 튀밥',
        flavor_profile: { rich: 5, acid: 1, spicy: 2, smoky: 1 },
        sauce_base: '전통 장 기반',
    },
    {
        id: 'm2',
        restaurantId: 'mingles',
        name: '한우 채끝 구이와 트러플 장아찌',
        main_ingredient: '한우 채끝',
        flavor_profile: { rich: 5, acid: 2, spicy: 1, smoky: 4 },
        sauce_base: '트러플 간장 소스',
    }
];

export const mockWines: Wine[] = [
    {
        id: 'ws1',
        name: 'Louis Jadot Meursault 2020',
        type: 'White',
        grape: 'Chardonnay',
        region: 'Burgundy, France',
        body: 4,
        acidity: 4,
        tannin: 1,
        sweetness: 1,
        oak: true,
        price_range: '180,000',
        price: 180000,
        tier: 'Standard',
    },
    {
        id: 'wp1',
        name: 'Château Margaux 2015',
        type: 'Red',
        grape: 'Cabernet Sauvignon Blend',
        region: 'Bordeaux, France',
        body: 5,
        acidity: 3,
        tannin: 5,
        sweetness: 1,
        oak: true,
        price_range: '1,200,000',
        price: 1200000,
        tier: 'Premium',
    }
];
