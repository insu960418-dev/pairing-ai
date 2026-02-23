'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Food, PairingResult, Wine as WineType } from '@/lib/types';
import { mockRestaurants, mockFoods, mockWines } from '@/lib/mockData';
import { recommendPairings } from '@/lib/matchingEngine';
import MenuCard from '@/components/MenuCard';
import RecommendationModal from '@/components/RecommendationModal';
import Header from '@/components/Header';
import { Wine, ChefHat, ArrowLeft, Star, MapPin, Filter, Search } from 'lucide-react';

export default function RestaurantPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const restaurant = useMemo(() => mockRestaurants.find(r => r.id === id), [id]);
    const restaurantFoods = useMemo(() => mockFoods.filter(f => f.restaurantId === id), [id]);
    const wines = useMemo(() => mockWines, []); // In real app, this would be restaurant-specific

    const [selectedFood, setSelectedFood] = useState<Food | null>(null);
    const [pairingResult, setPairingResult] = useState<PairingResult | null>(null);
    const [wineFilter, setWineFilter] = useState<'All' | 'Red' | 'White' | 'Sparkling'>('All');

    if (!restaurant) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
                <h1 className="text-2xl font-bold mb-4">식당을 찾을 수 없습니다.</h1>
                <button
                    onClick={() => router.push('/')}
                    className="text-brand-orange hover:underline"
                >
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    const handleMenuClick = (food: Food) => {
        setSelectedFood(food);
        const result = recommendPairings(food, wines, restaurant.name);
        setPairingResult(result);
    };

    const handleCloseModal = () => {
        setSelectedFood(null);
        setPairingResult(null);
    };

    const filteredWines = wines.filter(w => wineFilter === 'All' || w.type === wineFilter);

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[35vh] min-h-[250px] overflow-hidden">
                <img
                    src={restaurant.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={restaurant.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
                    <button
                        onClick={() => router.push('/')}
                        className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs font-medium bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={14} /> back to search
                    </button>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        {restaurant.starRating && (
                            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                                <Star size={10} fill="currentColor" /> {restaurant.starRating} STAR
                            </span>
                        )}
                        <div className="flex items-center gap-1 text-white text-sm font-bold">
                            <Star size={14} className="text-yellow-400" fill="currentColor" />
                            {restaurant.rating}
                        </div>
                        <div className="flex items-center gap-1 text-white/80 text-sm">
                            <MapPin size={14} />
                            {restaurant.region}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                        {restaurant.name}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg font-light max-w-2xl sm:block hidden">
                        {restaurant.description}
                    </p>
                </div>
            </div>

            {/* Split Panel Layout */}
            <main className="max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-screen">

                {/* Left Panel: Menu List (60%) */}
                <section className="flex-grow lg:w-[60%] p-6 md:p-12 border-r border-neutral-100">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-2">
                            <ChefHat size={18} className="text-brand-orange" />
                            <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.2em]">Signature Menu</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">테이스팅 메뉴</h2>
                        <p className="text-neutral-500 font-light leading-relaxed mb-8">
                            미쉐린 셰프의 정체성이 담긴 시그니처 메뉴입니다. 각 메뉴는 AI 소믈리에가 분석한 최적의 와인과 함께 즐기실 때 가장 완벽한 풍미를 냅니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {restaurantFoods.map((food) => (
                            <MenuCard key={food.id} food={food} onClick={handleMenuClick} />
                        ))}
                    </div>

                    {restaurantFoods.length === 0 && (
                        <div className="py-20 text-center border-2 border-dashed border-neutral-100 rounded-3xl">
                            <ChefHat className="mx-auto text-neutral-200 mb-4" size={48} />
                            <p className="text-neutral-400 font-light italic">메뉴 준비 중입니다.</p>
                        </div>
                    )}
                </section>

                {/* Right Panel: Wine List (40%) */}
                <aside className="lg:w-[40%] bg-white p-6 md:p-12">
                    <div className="mb-10 sticky top-[100px]">
                        <div className="flex items-center gap-2 mb-2">
                            <Wine size={18} className="text-neutral-800" />
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em]">Cellar List</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">와인 리스트</h2>

                        {/* Wine Filters */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {['All', 'Red', 'White', 'Sparkling'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setWineFilter(f as any)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${wineFilter === f
                                        ? 'bg-neutral-900 text-white'
                                        : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* Wine Items Small Cards */}
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
                            {filteredWines.map((wine) => (
                                <div key={wine.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100 group hover:border-brand-orange/20 transition-all">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${wine.tier === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-neutral-200 text-neutral-600'
                                                }`}>
                                                {wine.tier}
                                            </span>
                                            <span className="text-xs text-neutral-400 font-medium">{wine.type}</span>
                                        </div>
                                        <span className="text-sm font-bold text-neutral-800 group-hover:text-brand-orange transition-colors">
                                            {wine.name}
                                        </span>
                                        <span className="text-[10px] text-neutral-500">{wine.region} · {wine.grape}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-neutral-900">{wine.price_range}</span>
                                        <div className="flex items-center gap-0.5 mt-1 justify-end">
                                            {[...Array(wine.body)].map((_, i) => (
                                                <div key={i} className="w-1 h-1 bg-neutral-300 rounded-full" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/10">
                            <p className="text-[11px] text-brand-orange font-medium leading-relaxed">
                                ※ 위 리스트는 업장에서 실제 취급하는 스타일의 와인들을 기반으로 한 AI 가상 리스트입니다. <br />메뉴를 선택하시면 실시간 페어링 결과를 확인하실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </aside>
            </main>

            {selectedFood && pairingResult && (
                <RecommendationModal
                    food={selectedFood}
                    result={pairingResult}
                    onClose={handleCloseModal}
                />
            )}

            <footer className="bg-neutral-900 py-12 px-4 text-center">
                <p className="text-xs text-neutral-500 font-light tracking-[0.2em] uppercase">
                    &copy; {new Date().getFullYear()} Pairon - MICHELIN CORE DATA
                </p>
            </footer>
        </div>
    );
}
