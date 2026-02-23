'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const BANNERS = [
    {
        id: 1,
        tag: '#2월의 핫플',
        title: '지금 주목해야 할\n예약 핫플레이스',
        subtitle: '예약할 이유가 충분한 곳들만 모았어요',
        image: 'https://images.unsplash.com/photo-1550966842-28c2e2760882?auto=format&fit=crop&q=80&w=1200',
        location: '이태원'
    },
    {
        id: 2,
        tag: '#기념일 추천',
        title: '소중한 날을 위한\n프라이빗 다이닝',
        subtitle: '특별한 분위기와 맛의 하모니',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
        location: '청담'
    },
    {
        id: 3,
        tag: '#화이트데이',
        title: '사랑하는 연인과\n함께하는 달콤한 순간',
        subtitle: '화이트데이 예약 핫플레이스 총집합',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200',
        location: '한남'
    }
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-neutral-100 overflow-hidden">
            {/* Slides */}
            {BANNERS.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute inset-0 px-4 md:px-12 flex flex-col justify-center text-white">
                        <div className="mb-4 inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 w-fit">
                            <span className="w-1 h-1 bg-brand-orange rounded-full animate-pulse" />
                            {banner.tag}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-4 whitespace-pre-line leading-tight tracking-tighter">
                            {banner.title}
                        </h1>
                        <p className="text-white/80 text-sm md:text-lg lg:text-xl font-light">
                            {banner.subtitle}
                        </p>

                        <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border border-white/10 uppercase tracking-widest">
                            <span className="w-1 h-1 bg-white rounded-full" />
                            {banner.location}
                        </div>
                    </div>
                </div>
            ))}

            {/* Progress & Controls */}
            <div className="absolute bottom-6 right-4 md:right-8 z-20 flex items-center gap-2">
                <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[11px] font-bold flex items-center gap-3">
                    <span>{currentIndex + 1} / {BANNERS.length} 전체</span>
                    <div className="flex items-center gap-1 border-l border-white/20 pl-3">
                        <button onClick={handlePrev} className="hover:text-brand-orange transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={handleNext} className="hover:text-brand-orange transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
