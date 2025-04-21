import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { motion } from 'framer-motion';

export default function Welcome() {
    return (
        <GuestLayout
            title="FzlxTech"
            description="Portfolio of Muhamad Faizul Bin Roni Amir - Lead Developer and Full Stack Engineer"
            disableBackButton={true}
        >
            <Head>
                <title>Home</title>
                <meta name="description" content="Portfolio of Muhamad Faizul Bin Roni Amir - Lead Developer and Full Stack Engineer" />
            </Head>
            <div className="min-h-screen flex flex-col bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 py-16"
                >
                    <div className="flex flex-col items-center text-center">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
                        >
                            Muhamad Faizul Bin Roni Amir
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-2xl text-blue-600 dark:text-blue-400 mb-6"
                        >
                            Lead Developer | Full Stack Engineer
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
                        >
                            Crafting elegant solutions to complex problems, one line of code at a time.
                            When I'm not coding, I'm probably thinking about coding.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Projects Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    id="projects"
                    className="container mx-auto px-6 py-16"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Assignments
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.a
                            href="/credit-balance"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="block"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">💰</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Credit Balance Calculator
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Because who doesn't love watching numbers go up? (Or down, if you're not careful!)
                                </p>
                            </div>
                        </motion.a>
                        <motion.a
                            href="/password-generator"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className="block"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🔑</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Password Generator
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Creating passwords so secure, even I can't remember them. (Don't worry, you can copy them!)
                                </p>
                            </div>
                        </motion.a>
                        <motion.a
                            href="/pizza-calculator"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="block"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🍕</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Pizza Calculator
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Because math should never get in the way of your pizza party. (Unless you're calculating calories!)
                                </p>
                            </div>
                        </motion.a>
                        <motion.a
                            href="/comments"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            className="block"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">💬</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Comments
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Where thoughts meet the digital world. (And sometimes, they even make sense!)
                                </p>
                            </div>
                        </motion.a>
                        <motion.a
                            href="/snail"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            whileHover={{ scale: 1.05 }}
                            className="block"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🐌</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Snail
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    A slow and steady journey through the world of web development. (But we promise it's worth the wait!)
                                </p>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    id="skills"
                    className="container mx-auto px-6 py-16 flex-grow"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Tech Stack
                    </motion.h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
                        >
                            <div className="text-4xl mb-4">⚛️</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">React</h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
                        >
                            <div className="text-4xl mb-4">🦕</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">TypeScript</h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
                        >
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tailwind CSS</h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
                        >
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Laravel</h3>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white dark:bg-gray-800 mt-auto"
                >
                    <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                        <p>© 2025 Muhamad Faizul Bin Roni Amir. All rights reserved.</p>
                        <p className="mt-2 text-sm">Made with ❤️ and ☕</p>
                    </div>
                </motion.footer>
            </div>
        </GuestLayout>
    );
}
