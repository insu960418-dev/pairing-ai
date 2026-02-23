'use client';

import { Food, PairingResult } from '@/lib/types';
import { X, Wine, Sparkles, TrendingUp, Info, Award } from 'lucide-react';
import { useEffect } from 'react';

interface RecommendationModalProps {
    food: Food;
    result: PairingResult;
    onClose: () => void;
}

export default function RecommendationModal({ food, result, onClose }: RecommendationModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-500">

            {/* Subtle background glow */}
            <div className="absolute w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-400 flex flex-col md:flex-row">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-all z-20"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Food Info (35%) */}
                <div className="md:w-[35%] bg-neutral-50 p-8 md:p-12 border-r border-neutral-100 flex flex-col justify-center text-center md:text-left">
                    <div className="inline-flex items-center justify-center md:justify-start gap-2 text-brand-orange mb-6">
                        <Sparkles size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Selected Menu</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4">
                        {food.name}
                    </h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                            <span className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">Main Ingredient</span>
                            <p className="text-sm text-neutral-800 font-medium">{food.main_ingredient}</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                            <span className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">Sauce Base</span>
                            <p className="text-sm text-neutral-800 font-medium">{food.sauce_base || 'Natural Ju'}</p>
                        </div>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-[10px] text-neutral-400 italic">
                        <Info size={12} />
                        <span>AI Sommelier identifies specific flavor bridges based on molecular pairing logic.</span>
                    </div>
                </div>

                {/* Right Side: Pairing Options (65%) */}
                <div className="flex-grow p-8 md:p-12 overflow-y-auto max-h-[85vh]">
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">Sommelier's Selection</h3>
                        <p className="text-sm text-neutral-500 font-light italic">메뉴의 풍미를 극대화할 두 가지 세그먼트의 최적 페어링입니다.</p>
                    </div>

                    <div className="space-y-10">
                        {/* Option 1: Standard / The Sommelier's Value Choice */}
                        <div className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                                <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">The Sommelier's Value Choice</h4>
                                <span className="ml-auto text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-1 rounded">10-20만원대</span>
                            </div>

                            <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 group-hover:border-neutral-200 transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-lg font-bold text-neutral-900 mb-1">{result.classic.name}</p>
                                        <p className="text-xs text-neutral-500">{result.classic.region} · {result.classic.grape}</p>
                                    </div>
                                    <Wine className="text-neutral-300" size={32} />
                                </div>

                                <div className="relative pl-4 border-l-2 border-brand-orange/30">
                                    <p className="text-sm text-neutral-600 leading-relaxed italic">
                                        "{result.classicReason}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Option 2: Premium / The Iconic Experience */}
                        <div className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                                <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">The Iconic Experience</h4>
                                <div className="ml-auto flex items-center gap-2">
                                    <TrendingUp size={12} className="text-amber-500" />
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">최고의 미식 경험</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 rounded-3xl p-6 border-amber-100 group-hover:border-amber-200 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2">
                                    <Award className="text-amber-200" size={48} />
                                </div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div>
                                        <p className="text-lg font-bold text-amber-900 mb-1">{result.adventurous.name}</p>
                                        <p className="text-xs text-amber-700/60">{result.adventurous.region} · {result.adventurous.grape}</p>
                                    </div>
                                    <Wine className="text-amber-400" size={32} />
                                </div>

                                <div className="relative pl-4 border-l-2 border-amber-400 relative z-10">
                                    <p className="text-sm text-amber-900/80 leading-relaxed italic font-medium">
                                        "{result.adventurousReason}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                        <span>AI Matching Engine v3.0</span>
                        <span>2024-2025 Michelin Collection</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
