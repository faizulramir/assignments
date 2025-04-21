import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Comment {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
    };
    likes_count: number;
}

interface Props {
    comments: Comment[];
    sqlQuery: string;
}

export default function CommentsIndex({ comments, sqlQuery }: Props) {
    const [showQuery, setShowQuery] = useState(false);

    return (
        <GuestLayout
            title="Comments"
            description="View all comments and their like counts"
        >
            <div className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-gray-900 dark:text-white"
                        >
                            Comments
                        </motion.h1>
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setShowQuery(!showQuery)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {showQuery ? 'Show Data' : 'Show SQL Query'}
                        </motion.button>
                    </div>

                    {showQuery ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                SQL Query
                            </h2>
                            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                                {sqlQuery}
                            </pre>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            {comments.map((comment, index) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {comment.user.name}
                                            </h3>
                                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                                {comment.content}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {comment.likes_count} {comment.likes_count === 1 ? 'like' : 'likes'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
} 