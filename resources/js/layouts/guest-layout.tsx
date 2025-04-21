import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Toaster } from 'sonner';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Link href="/">
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                    Password Generator
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <AppearanceToggleDropdown />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                {children}
                <Toaster />
            </main>
        </div>
    );
} 