'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Restaurant } from '@/lib/types';
import { Star, MapPin, Navigation, Search, X } from 'lucide-react';
import { renderToString } from 'react-dom/server';

/* ── 아이콘 ───────────────────────────────────────────────── */
const createCustomIcon = (isActive: boolean) =>
    L.divIcon({
        html: renderToString(
            <div className="relative flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${isActive ? 'bg-[#FF3D00] text-white' : 'bg-white text-neutral-400'}`}>
                    <MapPin size={16} fill={isActive ? 'white' : 'currentColor'} />
                </div>
                <div className={`absolute -bottom-1 w-2 h-2 rotate-45 border-r border-b border-white ${isActive ? 'bg-[#FF3D00]' : 'bg-white'}`} />
            </div>
        ),
        className: '',
        iconSize: [32, 36],
        iconAnchor: [16, 36],
    });

const createUserIcon = () =>
    L.divIcon({
        html: renderToString(
            <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', width: 40, height: 40, borderRadius: '50%', background: 'rgba(59,130,246,0.25)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3B82F6', border: '3px solid white', boxShadow: '0 0 0 2px rgba(59,130,246,0.5)' }} />
            </div>
        ),
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

/* ── 유틸 ─────────────────────────────────────────────────── */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(km: number) {
    return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

/* ── 지도 내부 헬퍼 컴포넌트 ─────────────────────────────── */
function MapRefCapture({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
    const map = useMap();
    useEffect(() => { mapRef.current = map; }, [map, mapRef]);
    return null;
}

function MapEventsHandler({
    onMoveEnd,
    isProgrammatic,
}: {
    onMoveEnd: () => void;
    isProgrammatic: React.MutableRefObject<boolean>;
}) {
    useMapEvents({
        moveend: () => {
            if (isProgrammatic.current) { isProgrammatic.current = false; return; }
            onMoveEnd();
        },
        zoomend: () => {
            if (isProgrammatic.current) { isProgrammatic.current = false; return; }
            onMoveEnd();
        },
    });
    return null;
}

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => { map.setView(center, 13); }, [center, map]);
    return null;
}

/* ── Props ────────────────────────────────────────────────── */
interface MapInnerProps {
    restaurants: Restaurant[];
    center: [number, number];
    userLocation?: [number, number];
    onSelect: (id: string) => void;
}

/* ── 메인 컴포넌트 ────────────────────────────────────────── */
export default function MapInner({ restaurants, center, userLocation, onSelect }: MapInnerProps) {
    const mapRef = useRef<L.Map | null>(null);
    const isProgrammatic = useRef(false);
    const [hasMoved, setHasMoved] = useState(false);
    const [activeBounds, setActiveBounds] = useState<L.LatLngBounds | null>(null);

    const handleMoveEnd = useCallback(() => {
        setHasMoved(true);
    }, []);

    // 이 지역 검색
    const handleSearchHere = () => {
        if (!mapRef.current) return;
        setActiveBounds(mapRef.current.getBounds());
        setHasMoved(false);
    };

    // 경계 필터 해제
    const handleClearBounds = () => {
        setActiveBounds(null);
        setHasMoved(false);
    };

    // 내 위치로 돌아가기
    const handleReturnToUser = () => {
        if (!mapRef.current || !userLocation) return;
        isProgrammatic.current = true;
        mapRef.current.setView(userLocation, 13, { animate: true });
        setHasMoved(false);
    };

    // 표시할 레스토랑 (bounds 필터 적용)
    const visibleRestaurants = activeBounds
        ? restaurants.filter(r => r.lat != null && r.lng != null && activeBounds.contains([r.lat!, r.lng!]))
        : restaurants;

    return (
        <div className="w-full h-full relative z-0">
            <MapContainer
                center={center}
                zoom={13}
                minZoom={3}
                worldCopyJump={false}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    noWrap={true}
                />
                <MapRefCapture mapRef={mapRef} />
                <MapEventsHandler onMoveEnd={handleMoveEnd} isProgrammatic={isProgrammatic} />
                <ChangeView center={center} />

                {/* 내 위치 */}
                {userLocation && (
                    <>
                        <Circle center={userLocation} radius={300} pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.1, weight: 1 }} />
                        <Marker position={userLocation} icon={createUserIcon()}>
                            <Popup>
                                <div className="p-1 text-center">
                                    <div className="font-bold text-sm text-blue-600 mb-1">📍 내 위치</div>
                                    <div className="text-[11px] text-neutral-500">현재 위치 기준 가까운 순으로 정렬</div>
                                </div>
                            </Popup>
                        </Marker>
                    </>
                )}

                {/* 레스토랑 마커 */}
                {visibleRestaurants.map((res) =>
                    res.lat && res.lng ? (
                        <Marker
                            key={res.id}
                            position={[res.lat, res.lng]}
                            icon={createCustomIcon(true)}
                            eventHandlers={{ click: () => onSelect(res.id) }}
                        >
                            <Popup>
                                <div className="p-1 max-w-[200px]">
                                    <img src={res.image} alt={res.name} className="w-full h-24 object-cover rounded-md mb-2" />
                                    <h3 className="font-bold text-sm text-neutral-900 mb-1">{res.name}</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 mb-1">
                                        <Star size={10} className="text-amber-400 fill-amber-400" />
                                        <span>{res.starRating ? `${res.starRating} Stars` : res.rating}</span>
                                        <span>•</span>
                                        <span>{res.region.split(' ').slice(1, 3).join(' ')}</span>
                                    </div>
                                    {userLocation && (
                                        <div className="flex items-center gap-1 text-[10px] text-blue-500 font-bold mb-2">
                                            <span>📍</span>
                                            <span>내 위치에서 {formatDist(haversineKm(userLocation[0], userLocation[1], res.lat, res.lng))}</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => onSelect(res.id)}
                                        className="w-full py-1.5 bg-[#FF3D00] text-white text-[10px] font-bold rounded-lg hover:bg-[#E63600] transition-colors"
                                    >
                                        상세보기
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ) : null
                )}
            </MapContainer>

            {/* ── 오버레이 UI ─────────────────────────────── */}

            {/* 이 지역 검색 버튼 (지도 이동 후 상단 중앙) */}
            {hasMoved && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
                    <button
                        onClick={handleSearchHere}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-800 text-xs font-bold rounded-2xl shadow-xl border border-neutral-200 hover:bg-neutral-50 transition-all active:scale-95"
                    >
                        <Search size={13} className="text-[#FF3D00]" />
                        이 지역 검색
                    </button>
                </div>
            )}

            {/* 활성 bounds 필터 표시 + 해제 */}
            {activeBounds && !hasMoved && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FF3D00] text-white text-xs font-bold rounded-2xl shadow-xl">
                        <Search size={12} />
                        <span>이 지역 {visibleRestaurants.length}곳</span>
                        <button
                            onClick={handleClearBounds}
                            className="ml-1 w-4 h-4 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
                        >
                            <X size={10} />
                        </button>
                    </div>
                </div>
            )}

            {/* 내 위치로 버튼 (우하단) */}
            {userLocation && (
                <button
                    onClick={handleReturnToUser}
                    className="absolute bottom-6 right-4 z-[1000] flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-800 text-xs font-bold rounded-2xl shadow-xl border border-neutral-200 hover:bg-neutral-50 transition-all active:scale-95"
                >
                    <Navigation size={13} className="text-blue-500 fill-blue-500" />
                    내 위치로
                </button>
            )}

            {/* 범례 (우상단) */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 z-[1000]">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">Legend</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-600 mb-1">
                    <div className="w-3 h-3 bg-[#FF3D00] rounded-full" />
                    <span>미쉐린 가이드 서울</span>
                </div>
                {userLocation && (
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-500">
                        <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow" />
                        <span>내 위치</span>
                    </div>
                )}
            </div>
        </div>
    );
}
