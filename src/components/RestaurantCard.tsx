'use client';

import { Restaurant } from '@/lib/types';
import { Star, MapPin, Wine, Heart } from 'lucide-react';
import Link from 'next/link';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <Link
            href={`/restaurant/${restaurant.id}`}
            className="group relative bg-white rounded-3xl overflow-hidden aspect-[3/4] transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
                {restaurant.starRating && (
                    <div className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl">
                        <Star size={12} fill="currentColor" />
                        <span>{restaurant.starRating}STAR</span>
                    </div>
                )}
                {restaurant.promotionYear === 2024 && (
                    <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-white/20">
                        2024 승격
                    </div>
                )}
            </div>

            <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/30 transition-all">
                <Heart size={18} />
            </button>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{restaurant.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-400">
                        <Star size={12} fill="currentColor" />
                        {restaurant.rating.toFixed(1)}
                    </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none mb-1">
                    {restaurant.name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-white/70 font-light">
                    <MapPin size={12} strokeWidth={1.5} />
                    {restaurant.region}
                </div>

                <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-brand-orange bg-brand-orange/10 backdrop-blur-md px-2 py-1 rounded-md border border-brand-orange/20">
                        <Wine size={12} />
                        <span>PAIRING MATCH</span>
                    </div>
                    <p className="text-[10px] text-white/40 font-light truncate flex-grow">
                        {restaurant.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
