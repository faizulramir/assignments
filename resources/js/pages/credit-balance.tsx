import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { motion } from 'framer-motion';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Code, Database } from "lucide-react";

interface Transaction {
    user_id: number;
    user_name: string;
    balance: number;
    created_at: string;
}

interface QueryResult {
    user_id: number;
    user_name: string;
    last_balance: number;
    last_updated: string;
}

interface Props {
    transactions: Transaction[];
    queryResult: QueryResult[];
    rawQuery: string;
}

const CreditBalance: React.FC<Props> = ({ transactions, queryResult, rawQuery }) => {
    const [showQuery, setShowQuery] = useState(false);

    return (
        <GuestLayout
            title="Credit Transactions"
            description="All credit transactions and balance report"
        >
            <Head title="Credit Transactions" />
            <motion.div
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Credit Transactions</CardTitle>
                                <Toggle
                                    pressed={showQuery}
                                    onPressedChange={setShowQuery}
                                    className="flex items-center gap-2"
                                >
                                    {showQuery ? <Database className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                                    {showQuery ? 'Show All Transactions' : 'Show Query Result'}
                                </Toggle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {showQuery
                                    ? "Users' credit balances as of December 31st, 2022"
                                    : "All credit transactions ordered by date"}
                            </p>
                        </CardHeader>
                        <CardContent>
                            {showQuery ? (
                                <>
                                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                                        <pre className="whitespace-pre-wrap">{rawQuery}</pre>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>User ID</TableHead>
                                                <TableHead>User Name</TableHead>
                                                <TableHead className="text-right">Balance</TableHead>
                                                <TableHead>Last Updated</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {queryResult.map((result) => (
                                                <TableRow key={result.user_id}>
                                                    <TableCell>{result.user_id}</TableCell>
                                                    <TableCell>{result.user_name}</TableCell>
                                                    <TableCell className="text-right">
                                                        {result.last_balance.toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        })}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(result.last_updated).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            timeZone: 'UTC'
                                                        })}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User ID</TableHead>
                                            <TableHead>User Name</TableHead>
                                            <TableHead className="text-right">Balance</TableHead>
                                            <TableHead>Transaction Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.map((transaction) => (
                                            <TableRow key={`${transaction.user_id}-${transaction.created_at}`}>
                                                <TableCell>{transaction.user_id}</TableCell>
                                                <TableCell>{transaction.user_name}</TableCell>
                                                <TableCell className="text-right">
                                                    {transaction.balance.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(transaction.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        timeZone: 'UTC'
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </GuestLayout>
    );
};

export default CreditBalance; 