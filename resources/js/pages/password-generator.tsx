import { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import GuestLayout from '@/layouts/guest-layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Info, Shield, Lock, Key, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
    const [copied, setCopied] = useState(false);
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

    const copyToClipboard = async () => {
        if (password) {
            try {
                await navigator.clipboard.writeText(password);
                setCopied(true);
                toast.success('Password copied to clipboard!', {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        background: 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        border: '1px solid hsl(var(--border))',
                    },
                });
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                toast.error('Failed to copy password', {
                    duration: 2000,
                    position: 'top-center',
                });
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    const passwordVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const copyButtonVariants = {
        initial: { scale: 1 },
        copied: {
            scale: [1, 1.2, 1],
            transition: {
                duration: 0.3,
                times: [0, 0.5, 1]
            }
        }
    };

    return (
        <GuestLayout title="Password Generator" description="Password Generator">
            <Head title="Password Generator" />

            <div className="container mx-auto py-8 space-y-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <CardTitle className="flex items-center gap-2">
                                <motion.div variants={iconVariants}>
                                    <Lock className="h-5 w-5" />
                                </motion.div>
                                Password Generator
                            </CardTitle>
                            <CardDescription>
                                Generate secure passwords with customizable options
                            </CardDescription>
                        </motion.div>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Password Display */}
                            <motion.div
                                className="flex gap-2"
                                variants={passwordVariants}
                            >
                                <Input
                                    value={password}
                                    readOnly
                                    className="text-lg font-mono"
                                />
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    variants={copyButtonVariants}
                                    animate={copied ? "copied" : "initial"}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={copyToClipboard}
                                        disabled={!password}
                                        className="relative"
                                    >
                                        <AnimatePresence mode="wait">
                                            {copied ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ opacity: 0, rotate: -180 }}
                                                    animate={{ opacity: 1, rotate: 0 }}
                                                    exit={{ opacity: 0, rotate: 180 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="copy"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Length Slider */}
                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label>Password Length: {data.length}</Label>
                                <Slider
                                    value={[data.length]}
                                    min={4}
                                    max={50}
                                    step={1}
                                    onValueChange={([value]: number[]) => setData('length', value)}
                                />
                            </motion.div>

                            {/* Options */}
                            <motion.div className="space-y-4" variants={itemVariants}>
                                <motion.div
                                    className="flex items-center justify-between"
                                    whileHover={{ x: 5 }}
                                >
                                    <Label>Lowercase Letters</Label>
                                    <Switch
                                        checked={data.useLowercase}
                                        onCheckedChange={(checked: boolean) => setData('useLowercase', checked)}
                                    />
                                </motion.div>
                                <motion.div
                                    className="flex items-center justify-between"
                                    whileHover={{ x: 5 }}
                                >
                                    <Label>Uppercase Letters</Label>
                                    <Switch
                                        checked={data.useUppercase}
                                        onCheckedChange={(checked: boolean) => setData('useUppercase', checked)}
                                    />
                                </motion.div>
                                <motion.div
                                    className="flex items-center justify-between"
                                    whileHover={{ x: 5 }}
                                >
                                    <Label>Numbers</Label>
                                    <Switch
                                        checked={data.useNumbers}
                                        onCheckedChange={(checked: boolean) => setData('useNumbers', checked)}
                                    />
                                </motion.div>
                                <motion.div
                                    className="flex items-center justify-between"
                                    whileHover={{ x: 5 }}
                                >
                                    <Label>Symbols</Label>
                                    <Switch
                                        checked={data.useSymbols}
                                        onCheckedChange={(checked: boolean) => setData('useSymbols', checked)}
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Generate Button */}
                            <motion.div variants={buttonVariants}>
                                <Button
                                    className="w-full"
                                    onClick={generatePassword}
                                    disabled={processing || (!data.useLowercase && !data.useUppercase && !data.useNumbers && !data.useSymbols)}
                                    asChild
                                >
                                    <motion.div
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        {processing ? 'Generating...' : 'Generate Password'}
                                    </motion.div>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </CardContent>
                </Card>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <motion.div
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Info className="h-5 w-5" />
                            </motion.div>
                            How It Works
                        </CardTitle>
                        <CardDescription>
                            Learn about the password generation process and security features
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <motion.div
                            className="prose dark:prose-invert max-w-none"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h3 className="text-lg font-semibold flex items-center gap-2" variants={itemVariants}>
                                <motion.div variants={iconVariants}>
                                    <Key className="h-5 w-5" />
                                </motion.div>
                                Password Generation Process
                            </motion.h3>
                            <motion.p variants={itemVariants}>
                                Our password generator creates secure passwords using a combination of:
                            </motion.p>
                            <motion.ul className="space-y-2" variants={itemVariants}>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                                    Lowercase letters (a-z)
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                    Uppercase letters (A-Z)
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
                                    Numbers (0-9)
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                                    Special symbols (!, #, $, %, &, (, ), *, +, @, ^)
                                </motion.li>
                            </motion.ul>

                            <motion.h3 className="text-lg font-semibold flex items-center gap-2 mt-6" variants={itemVariants}>
                                <motion.div variants={iconVariants}>
                                    <Shield className="h-5 w-5" />
                                </motion.div>
                                Security Features
                            </motion.h3>
                            <motion.ul className="space-y-2" variants={itemVariants}>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                                    Passwords are generated server-side for enhanced security
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                                    Each generated password includes at least one character from each selected character type
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                                    Passwords are randomly shuffled to ensure unpredictability
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                                    No passwords are stored or logged on the server
                                </motion.li>
                            </motion.ul>

                            <motion.h3 className="text-lg font-semibold flex items-center gap-2 mt-6" variants={itemVariants}>
                                <motion.div variants={iconVariants}>
                                    <AlertTriangle className="h-5 w-5" />
                                </motion.div>
                                Best Practices
                            </motion.h3>
                            <motion.ul className="space-y-2" variants={itemVariants}>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                                    Use passwords that are at least 12 characters long
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                                    Include a mix of character types for better security
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                                    Never reuse passwords across different services
                                </motion.li>
                                <motion.li className="flex items-center gap-2" variants={itemVariants}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                                    Consider using a password manager to store your passwords securely
                                </motion.li>
                            </motion.ul>
                        </motion.div>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
