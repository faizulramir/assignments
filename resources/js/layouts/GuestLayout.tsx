import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-gray-800">
                                    Password Generator
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                {children}
            </main>
        </div>
    );
} 