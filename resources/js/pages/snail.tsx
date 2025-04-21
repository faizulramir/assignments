import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Progress {
    day: number;
    position: number;
    is_day: boolean;
}

interface PageProps {
    progress: Progress[];
    well_depth: number;
    climb_per_day: number;
    slip_per_night: number;
}

const Snail: React.FC<PageProps> = ({ progress: initialProgress, well_depth, climb_per_day, slip_per_night }) => {
    const [progress, setProgress] = useState<Progress[]>(initialProgress || []);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);

    const form = useForm({
        well_depth: well_depth || 11,
        climb_per_day: climb_per_day || 3,
        slip_per_night: slip_per_night || 2
    });

    // Theme switching effect
    // useEffect(() => {
    //     const currentProgress = progress[currentStep];
    //     if (currentProgress) {
    //         document.documentElement.style.transition = 'background-color 1s ease-in-out, color 1s ease-in-out';
    //         document.documentElement.classList.toggle('dark', !currentProgress.is_day);
    //     } else {
    //         document.documentElement.style.transition = 'background-color 1s ease-in-out, color 1s ease-in-out';
    //         document.documentElement.classList.remove('dark');
    //     }
    // }, [currentStep, progress]);

    // // Reset theme when component unmounts
    // useEffect(() => {
    //     return () => {
    //         document.documentElement.style.transition = 'none';
    //         document.documentElement.classList.remove('dark');
    //     };
    // }, []);

    const calculate = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/snail/calculate', {
            preserveScroll: true,
            onSuccess: (page) => {
                const props = page.props as unknown as PageProps;
                setProgress(props.progress);
                setCurrentStep(0);
                setIsSimulating(true);
            },
            onError: (errors) => {
                console.error('Error calculating snail climb:', errors);
            }
        });
    };

    useEffect(() => {
        if (isSimulating && currentStep < progress.length) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => {
                    console.log('Updating step:', prev, '->', prev + 1);
                    return prev + 1;
                });
            }, 2000);
            return () => clearTimeout(timer);
        } else if (currentStep >= progress.length) {
            setIsSimulating(false);
            setCurrentStep(0);
            setTimeout(() => {
                setProgress([]);
            }, 2000);
        }
    }, [currentStep, progress.length, isSimulating]);

    const currentProgress = progress.length === 0 ?
        { position: 0, is_day: true, day: 0 } :
        (progress[currentStep] || { position: 0, is_day: true, day: 0 });

    return (
        <GuestLayout title="Snail Climbing Problem" description="This is a simulation of the snail climbing problem.">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-bold mb-4">Snail Climbing Problem</h1>

                <form onSubmit={calculate} className="mb-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label htmlFor="well_depth">Well Depth (meters)</Label>
                            <Input
                                id="well_depth"
                                type="number"
                                value={form.data.well_depth}
                                onChange={e => form.setData('well_depth', parseInt(e.target.value))}
                                disabled={isSimulating}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="climb_per_day">Climb per Day (meters)</Label>
                            <Input
                                id="climb_per_day"
                                type="number"
                                value={form.data.climb_per_day}
                                onChange={e => form.setData('climb_per_day', parseInt(e.target.value))}
                                disabled={isSimulating}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slip_per_night">Slip per Night (meters)</Label>
                            <Input
                                id="slip_per_night"
                                type="number"
                                value={form.data.slip_per_night}
                                onChange={e => form.setData('slip_per_night', parseInt(e.target.value))}
                                disabled={isSimulating}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={isSimulating || form.processing}
                    >
                        {form.processing ? 'Calculating...' : 'Start Simulation'}
                    </button>
                </form>

                <div className="relative h-[500px] border-l-4 border-gray-300">
                    {/* Well visualization */}
                    <div className="absolute inset-0">
                        {/* Height markers */}
                        {Array.from({ length: form.data.well_depth + 1 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute left-4 w-2 h-px bg-gray-400"
                                style={{ bottom: `${(i / form.data.well_depth) * 100}%` }}
                            >
                                <span className="absolute -left-8 text-xs">{i}m</span>
                            </div>
                        ))}

                        {/* Snail position indicator */}
                        <div
                            className="absolute"
                            style={{
                                left: '2rem',
                                bottom: `${(currentProgress.position / form.data.well_depth) * 100}%`,
                                transform: `translate(0, 50%)`,
                                transition: 'all 1s ease-in-out',
                                zIndex: 10
                            }}
                        >
                            <div
                                className={`text-4xl transform ${currentProgress.is_day ? '-scale-x-100 rotate-12' : '-scale-x-100 -rotate-12'}`}
                                style={{ transition: 'transform 1s ease-in-out' }}
                            >
                                🐌
                            </div>
                            <div className="absolute -left-4 -top-6 text-sm bg-black/50 text-white px-2 rounded">
                                {currentProgress.position}m
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <p>Day: {currentProgress.day}</p>
                    <p>Current Position: {currentProgress.position}m</p>
                    <p className={`font-bold ${currentProgress.is_day ? 'text-yellow-500' : 'text-blue-500'}`}>
                        Time of Day: {currentProgress.is_day ? '☀️ Day' : '🌙 Night'}
                    </p>
                    {!isSimulating && progress.length > 0 && (
                        <p className="text-xl font-bold mt-2">
                            The snail will escape in {progress[progress.length - 1].day} days!
                        </p>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
};

export default Snail; 