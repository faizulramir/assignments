import { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import GuestLayout from '@/layouts/GuestLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface PasswordOptions {
    length: number;
    useLowercase: boolean;
    useUppercase: boolean;
    useNumbers: boolean;
    useSymbols: boolean;
}

interface CustomPageProps extends PageProps {
    password?: string;
}

export default function PasswordGenerator({ password: initialPassword }: CustomPageProps) {
    const [password, setPassword] = useState<string>(initialPassword || '');
    const { data, setData, post, processing } = useForm<PasswordOptions & Record<string, any>>({
        length: 12,
        useLowercase: true,
        useUppercase: true,
        useNumbers: true,
        useSymbols: true,
    });

    const generatePassword = () => {
        post('/password-generator', {
            preserveScroll: true,
            onSuccess: (page) => {
                setPassword(page.props?.password as string);
            },
            onError: () => {
                toast.error('Failed to generate password');
            }
        });
    };

    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            toast.success('Password copied to clipboard!');
        }
    };

    return (
        <GuestLayout>
            <Head title="Password Generator" />

            <div className="container mx-auto py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Password Generator</CardTitle>
                        <CardDescription>
                            Generate secure passwords with customizable options
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Password Display */}
                            <div className="flex gap-2">
                                <Input
                                    value={password}
                                    readOnly
                                    className="text-lg font-mono"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={copyToClipboard}
                                    disabled={!password}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Length Slider */}
                            <div className="space-y-2">
                                <Label>Password Length: {data.length}</Label>
                                <Slider
                                    value={[data.length]}
                                    min={4}
                                    max={50}
                                    step={1}
                                    onValueChange={([value]: number[]) => setData('length', value)}
                                />
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Lowercase Letters</Label>
                                    <Switch
                                        checked={data.useLowercase}
                                        onCheckedChange={(checked: boolean) => setData('useLowercase', checked)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Uppercase Letters</Label>
                                    <Switch
                                        checked={data.useUppercase}
                                        onCheckedChange={(checked: boolean) => setData('useUppercase', checked)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Numbers</Label>
                                    <Switch
                                        checked={data.useNumbers}
                                        onCheckedChange={(checked: boolean) => setData('useNumbers', checked)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Symbols</Label>
                                    <Switch
                                        checked={data.useSymbols}
                                        onCheckedChange={(checked: boolean) => setData('useSymbols', checked)}
                                    />
                                </div>
                            </div>

                            {/* Generate Button */}
                            <Button
                                className="w-full"
                                onClick={generatePassword}
                                disabled={processing || (!data.useLowercase && !data.useUppercase && !data.useNumbers && !data.useSymbols)}
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                {processing ? 'Generating...' : 'Generate Password'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
