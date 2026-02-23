import { Food } from '@/lib/types';
import { ChefHat } from 'lucide-react';

interface MenuCardProps {
    food: Food;
    onClick: (food: Food) => void;
}

export default function MenuCard({ food, onClick }: MenuCardProps) {
    return (
        <div
            onClick={() => onClick(food)}
            className="glass-panel glass-panel-hover rounded-2xl p-8 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 flex flex-col items-start gap-4 group relative overflow-hidden h-full shadow-sm"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center group-hover:border-brand-orange/40 transition-colors duration-500 shadow-inner">
                <ChefHat className="text-neutral-400 group-hover:text-brand-orange transition-colors" size={24} />
            </div>

            <div className="mt-2 flex-grow">
                <h3 className="text-xl font-medium text-neutral-900 mb-3 tracking-tight group-hover:text-brand-orange transition-colors">{food.name}</h3>
                <div className="space-y-1">
                    <p className="text-sm text-neutral-500 font-light">
                        <span className="inline-block w-12 text-neutral-400 text-xs uppercase tracking-wider">메인</span>
                        <span className="text-neutral-700">{food.main_ingredient}</span>
                    </p>
                    <p className="text-sm text-neutral-500 font-light">
                        <span className="inline-block w-12 text-neutral-400 text-xs uppercase tracking-wider">소스</span>
                        <span className="text-neutral-700">{food.sauce_base || '-'}</span>
                    </p>
                </div>
            </div>

            <div className="mt-6 flex items-center text-xs tracking-widest uppercase font-medium text-brand-orange opacity-60 group-hover:opacity-100 transition-all duration-300">
                Pairing Match
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    );
}
