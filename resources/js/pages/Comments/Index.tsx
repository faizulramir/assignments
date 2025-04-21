import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface RawComment {
    id: number;
    content: string;
    user_id: number;
    created_at: string;
}

interface QueryResult {
    comment_id: number;
    content: string;
    user_name: string;
    likes_count: number;
    liked_by_users: string;
}

interface Props {
    rawComments: RawComment[];
    sqlQuery: string;
    queryResults: QueryResult[];
}

export default function CommentsIndex({ rawComments = [], sqlQuery = '', queryResults = [] }: Props) {
    const [showQuery, setShowQuery] = useState(false);

    return (
        <GuestLayout
            title="Comments"
            description="View comments data and SQL queries"
        >
            <div className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-gray-900 dark:text-white"
                        >
                            {showQuery ? 'SQL Query Results' : 'Raw Comments Data'}
                        </motion.h1>
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setShowQuery(!showQuery)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {showQuery ? 'Show Raw Data' : 'Show SQL Query'}
                        </motion.button>
                    </div>

                    {showQuery ? (
                        <div className="space-y-6">
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

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                            >
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Query Results
                                </h2>
                                {queryResults.length > 0 ? (
                                    <div className="space-y-4">
                                        {queryResults.map((result, index) => (
                                            <motion.div
                                                key={result.comment_id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="border-b border-gray-200 dark:border-gray-700 pb-4"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {result.user_name}
                                                        </h3>
                                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                                            {result.content}
                                                        </p>
                                                        {result.liked_by_users && (
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    Liked by: {result.liked_by_users}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            {result.likes_count} {result.likes_count === 1 ? 'like' : 'likes'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No query results available
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {rawComments.length > 0 ? (
                                rawComments.map((comment, index) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    ID: {comment.id}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    User ID: {comment.user_id}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {comment.content}
                                            </p>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Created: {new Date(comment.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    No comments available
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
} 