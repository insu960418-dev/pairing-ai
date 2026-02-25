'use client';

import dynamic from 'next/dynamic';
import { Restaurant } from '@/lib/types';

// Dynamically import MapInner to avoid SSR issues with Leaflet
const MapInner = dynamic(() => import('./MapInner'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-neutral-50 flex flex-col items-center justify-center gap-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Loading Premium Map...</p>
        </div>
    )
});

interface MapViewProps {
    restaurants: Restaurant[];
    center?: [number, number];
    userLocation?: [number, number];
    onSelect: (id: string) => void;
}

export default function MapView({
    restaurants,
    center = [37.5246, 127.0428],
    userLocation,
    onSelect
}: MapViewProps) {
    return (
        <div className="w-full h-[600px] rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-2xl relative">
            <MapInner
                restaurants={restaurants}
                center={center}
                userLocation={userLocation}
                onSelect={onSelect}
            />
        </div>
    );
}
