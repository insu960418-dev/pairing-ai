'use client';

import { Category, MichelinStar } from '@/lib/types';
import {
    Star,
    ChefHat,
    Fish,
    UtensilsCrossed,
    Wine,
    Zap,
    Map,
    Compass,
    Heart,
    Home,
    Users,
    Sparkles
} from 'lucide-react';

interface CategoryBarProps {
    selectedCategory: Category | '전체' | 'MichelinStars';
    selectedStars: MichelinStar | 'all';
    onSelectCategory: (category: Category | '전체' | 'MichelinStars') => void;
    onSelectStars: (stars: MichelinStar | 'all') => void;
}

const categories: { name: Category | '전체'; icon: any; label: string }[] = [
    { name: '전체', icon: Zap, label: '추천' },
    { name: '미슐랭', icon: Star, label: '미슐랭' },
    { name: '기념일', icon: Heart, label: '기념일' },
    { name: '스시', icon: Fish, label: '스시' },
    { name: '우마카세', icon: ChefHat, label: '우마카세' },
    { name: '부모님', icon: Home, label: '부모님' },
    { name: '상견례', icon: Users, label: '상견례' },
    { name: 'AI소믈리에', icon: Sparkles, label: 'AI 소믈리에' },
];

export default function CategoryBar({
    selectedCategory,
    onSelectCategory,
    selectedStars,
    onSelectStars
}: CategoryBarProps) {
    return (
        <div className="bg-white border-b border-neutral-100 sticky top-[64px] z-30">
            <div className="px-4 md:px-12 py-6">


                {/* Circular Categories Icons - Catch Table Style */}
                <div className="flex items-center md:justify-center gap-10 overflow-x-auto scrollbar-hide py-2">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory === cat.name;

                        return (
                            <button
                                key={cat.name}
                                onClick={() => onSelectCategory(cat.name)}
                                className="flex flex-col items-center gap-3 min-w-[64px] group"
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                    ? 'bg-[#FF3D00] text-white shadow-lg shadow-orange-100 scale-110'
                                    : 'bg-neutral-50 text-neutral-400 group-hover:bg-neutral-100 group-hover:scale-105'
                                    }`}>
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                                </div>
                                <span className={`text-[11px] font-bold transition-colors ${isActive ? 'text-[#FF3D00]' : 'text-neutral-500'
                                    }`}>
                                    {cat.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
