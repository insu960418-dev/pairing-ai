'use client';

import {
    Search,
    Bell,
    Bookmark,
    Menu,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
    return (
        <header className="h-16 bg-white border-b border-neutral-100 flex items-center px-4 md:px-8 sticky top-0 z-50">
            <div className="w-full flex items-center justify-between gap-8 px-4 md:px-12">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 bg-[#FF3D00] rounded-xl flex items-center justify-center">
                        <span className="text-white font-black text-xs">P</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xl font-black text-neutral-900 tracking-tighter uppercase">Pairon</span>
                    </div>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-grow max-w-xl relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="text-neutral-300 group-focus-within:text-[#FF3D00] transition-colors" size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="미쉐린 2025 맛집을 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3D00]/10 focus:border-[#FF3D00] transition-all"
                    />
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-2 md:gap-5">
                    <button className="text-neutral-400 hover:text-neutral-900 transition-colors p-2 rounded-full hover:bg-neutral-50">
                        <Search size={22} className="md:hidden" />
                        <Bell size={22} className="hidden md:block" />
                    </button>
                    <button className="text-neutral-400 hover:text-neutral-900 transition-colors p-2 rounded-full hover:bg-neutral-50 hidden md:block">
                        <Bookmark size={22} />
                    </button>
                    <div className="h-8 w-px bg-neutral-100 hidden md:block mx-1" />
                    <button className="flex items-center gap-1 px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-black transition-all shadow-lg shadow-black/5">
                        LOGIN
                    </button>
                    <button className="text-neutral-900 p-2 md:hidden">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
}
