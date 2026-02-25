'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import RestaurantCard from '@/components/RestaurantCard';
import HeroSlider from '@/components/HeroSlider';
import { Category, MichelinStar } from '@/lib/types';
import { mockRestaurants } from '@/lib/mockData';
import {
  Search,
  List,
  Navigation,
  Loader2
} from 'lucide-react';
import MapView from '@/components/MapView';

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | '전체' | 'MichelinStars'>('전체');
  const [selectedStars, setSelectedStars] = useState<MichelinStar | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingGps, setLoadingGps] = useState(false);

  const handleNearbyClick = () => {
    if (viewMode === 'map' && userLocation) {
      // 이미 위치순 지도 모드 → 리스트로 전환
      setViewMode('list');
      return;
    }
    if (userLocation) {
      // 위치는 이미 있음 → 바로 지도로
      setViewMode('map');
      return;
    }
    if (!navigator.geolocation) {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return;
    }
    setLoadingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setViewMode('map');
        setLoadingGps(false);
      },
      () => {
        alert('위치 정보를 가져올 수 없습니다. 브라우저 위치 권한을 확인해주세요.');
        setLoadingGps(false);
      }
    );
  };

  const activeRestaurants = mockRestaurants.filter(r => r.isActive !== false);

  const filteredRestaurants = activeRestaurants
    .filter((res) => {
      const matchesCategory = selectedCategory === '전체' || res.category === selectedCategory;
      const matchesStars = selectedStars === 'all' || res.starRating === selectedStars;
      const matchesSearch =
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStars && matchesSearch;
    })
    .sort((a, b) => {
      if (!userLocation || a.lat == null || b.lat == null) return 0;
      const da = haversineKm(userLocation.lat, userLocation.lng, a.lat!, a.lng!);
      const db = haversineKm(userLocation.lat, userLocation.lng, b.lat!, b.lng!);
      return da - db;
    });

  const isNearbyActive = viewMode === 'map' && !!userLocation;

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Hero Slider */}
      <HeroSlider />

      <div id="results-section">
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedStars={selectedStars}
          onSelectStars={setSelectedStars}
        />
      </div>

      <main className="px-4 md:px-12 py-8 md:py-16">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-orange">
                Curated for you
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter">
              {isNearbyActive
                ? '내 주변 맛집'
                : selectedCategory === '전체'
                  ? '지금 가장 인기 있는 맛집'
                  : `${selectedCategory} 추천 맛집`}
            </h2>
          </div>

          <div className="flex bg-neutral-100 p-1.5 rounded-2xl shadow-inner border border-neutral-200/50">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-[#FF3D00] shadow-md'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <List size={16} />
              리스트
            </button>
            <button
              onClick={handleNearbyClick}
              disabled={loadingGps}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isNearbyActive
                  ? 'bg-white text-[#FF3D00] shadow-md'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {loadingGps
                ? <Loader2 size={16} className="animate-spin" />
                : <Navigation size={16} className={isNearbyActive ? 'fill-[#FF3D00]' : ''} />
              }
              위치순
            </button>
          </div>
        </div>

        {viewMode === 'map' ? (
          <div className="animate-in fade-in zoom-in-95 duration-700">
            {userLocation && (
              <div className="mb-4 flex items-center gap-2 text-sm text-neutral-500 font-medium">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow shadow-blue-300 animate-pulse" />
                <span>
                  내 위치 기준 — 가까운 순으로 정렬됩니다
                </span>
              </div>
            )}
            <MapView
              restaurants={filteredRestaurants}
              center={userLocation ? [userLocation.lat, userLocation.lng] : undefined}
              userLocation={userLocation ? [userLocation.lat, userLocation.lng] : undefined}
              onSelect={(id) => {
                const restaurant = filteredRestaurants.find(r => r.id === id);
                if (restaurant) window.location.href = `/restaurant/${id}`;
              }}
            />
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center rounded-[3rem] bg-neutral-50 border-2 border-dashed border-neutral-100">
            <div className="text-neutral-200 mb-6 flex justify-center">
              <Search size={64} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-neutral-500 font-light">다른 필터나 검색어를 입력해 보세요.</p>
          </div>
        )}
      </main>

      <footer className="bg-neutral-900 border-t border-white/5 pt-24 pb-12 px-4 text-center">
        <div className="px-4 md:px-12 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-brand-orange rounded-2xl flex items-center justify-center">
              <span className="text-white font-black text-lg">P</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">Pairon</span>
          </div>

          <div className="flex gap-8 mb-12 flex-wrap justify-center">
            {['Service', 'About', 'Privacy', 'Contact'].map(link => (
              <a key={link} href="#" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">{link}</a>
            ))}
          </div>

          <p className="text-[10px] text-white/20 font-bold tracking-[0.4em] uppercase text-center leading-relaxed">
            &copy; {new Date().getFullYear()} Pairon. <br />
            Michelin Official Partner & AI Sommelier Engine v5.0
          </p>
        </div>
      </footer>
    </div>
  );
}
