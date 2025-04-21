import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, ChevronDown, ChevronUp } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PizzaOrder {
    size: 'small' | 'medium' | 'large';
    hasPepperoni: boolean;
    hasExtraCheese: boolean;
    [key: string]: string | boolean; // Required for Inertia form data
}
interface CartItem extends PizzaOrder {
    id: string;
    itemTotal: string;
}

interface Props {
    cart: CartItem[];
    cartTotal: number;
}

interface PageProps {
    cart: CartItem[];
    cartTotal: number;
}

const PizzaCalculator: React.FC<Props> = ({ cart: initialCart, cartTotal: initialCartTotal }) => {
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [cartTotal, setCartTotal] = useState<number>(initialCartTotal);
    const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
    const [showClearCartDialog, setShowClearCartDialog] = useState(false);
    const [showDocs, setShowDocs] = useState(false);

    const { data, setData, post, processing } = useForm<PizzaOrder>({
        size: 'small',
        hasPepperoni: false,
        hasExtraCheese: false,
        id: '',
    });

    const handleAddToCart = () => {
        post('/pizza-calculator/add-to-cart', {
            onSuccess: (page) => {
                const response = page as unknown as { props: PageProps };
                setCart(response.props.cart);
                setCartTotal(response.props.cartTotal);
            },
        });
    };

    const handleRemoveFromCart = (item: CartItem) => {
        setData({ id: item.id, size: item.size, hasPepperoni: item.hasPepperoni, hasExtraCheese: item.hasExtraCheese });
        setItemToRemove(item);
    };

    const confirmRemove = () => {
        if (!itemToRemove) return;

        post('/pizza-calculator/remove-from-cart', {
            preserveState: true,
            onSuccess: (page) => {
                const response = page as unknown as { props: PageProps };
                setCart(response.props.cart);
                setCartTotal(response.props.cartTotal);
                setItemToRemove(null);
            },
        });
    };

    const handleClearCartClick = () => {
        setShowClearCartDialog(true);
    };

    const confirmClearCart = () => {
        post('/pizza-calculator/clear-cart', {
            preserveState: true,
            onSuccess: (page) => {
                const response = page as unknown as { props: PageProps };
                setCart(response.props.cart);
                setCartTotal(response.props.cartTotal);
                setShowClearCartDialog(false);
            },
        });
    };

    const getPizzaImage = (size: string) => {
        switch (size) {
            case 'small':
                return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80w=500';
            case 'medium':
                return 'https://plus.unsplash.com/premium_photo-1668771085743-1d2d19818140?q=80&w=500';
            case 'large':
                return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500';
            default:
                return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500';
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
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <GuestLayout
            title="Pizza Calculator"
            description="Pizza Calculator"
        >
            <Head title="Pizza Calculator" />
            <motion.div
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[calc(100vh-8rem)] md:max-h-[800px]"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Order Form */}
                        <motion.div
                            className="bg-card shadow-xl rounded-lg overflow-hidden flex flex-col h-full min-h-[600px] md:min-h-0"
                            variants={itemVariants}
                        >
                            <div className="p-4 shrink-0">
                                <motion.img
                                    src={getPizzaImage(data.size)}
                                    alt={`${data.size} pizza`}
                                    className="w-full h-48 object-cover rounded-lg"
                                    layoutId="pizza-image"
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                />
                                <motion.h2
                                    className="text-xl font-bold my-4 text-center text-foreground"
                                    variants={itemVariants}
                                >
                                    Customize Your Pizza
                                </motion.h2>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4">
                                <motion.div
                                    className="space-y-4 pb-4"
                                    variants={containerVariants}
                                >
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-lg font-medium text-foreground mb-2">Pizza Size</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['small', 'medium', 'large'].map((size) => (
                                                <motion.button
                                                    key={size}
                                                    onClick={() => setData({ ...data, size: size as 'small' | 'medium' | 'large' })}
                                                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${data.size === size
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-border hover:border-primary/50'
                                                        }`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="block font-semibold">{size.charAt(0).toUpperCase() + size.slice(1)}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        RM{size === 'small' ? '15' : size === 'medium' ? '22' : '30'}
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div className="space-y-3" variants={containerVariants}>
                                        <motion.div
                                            className="flex items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="pepperoni"
                                                checked={data.hasPepperoni}
                                                onChange={(e) => setData({ ...data, hasPepperoni: e.target.checked })}
                                                className="h-5 w-5 text-primary focus:ring-primary border-input rounded"
                                            />
                                            <label htmlFor="pepperoni" className="ml-3 flex-1">
                                                <span className="block font-medium text-foreground">Pepperoni</span>
                                                <span className="text-sm text-muted-foreground">
                                                    +RM{data.size === 'small' ? '3' : '5'}
                                                </span>
                                            </label>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="extraCheese"
                                                checked={data.hasExtraCheese}
                                                onChange={(e) => setData({ ...data, hasExtraCheese: e.target.checked })}
                                                className="h-5 w-5 text-primary focus:ring-primary border-input rounded"
                                            />
                                            <label htmlFor="extraCheese" className="ml-3 flex-1">
                                                <span className="block font-medium text-foreground">Extra Cheese</span>
                                                <span className="text-sm text-muted-foreground">+RM6</span>
                                            </label>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </div>
                            <div className="p-4 border-t">
                                <motion.button
                                    onClick={handleAddToCart}
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Cart */}
                        <motion.div
                            className="bg-card shadow-xl rounded-lg overflow-hidden flex flex-col h-full min-h-[400px] md:min-h-0"
                            variants={itemVariants}
                        >
                            <div className="p-4 border-b">
                                <div className="flex justify-between items-center">
                                    <motion.h2
                                        className="text-xl font-bold text-foreground"
                                        variants={itemVariants}
                                    >
                                        Your Cart
                                    </motion.h2>
                                    {cart.length > 0 && (
                                        <motion.button
                                            onClick={handleClearCartClick}
                                            className="text-destructive hover:text-destructive/80 transition-colors duration-200 p-2 rounded-full hover:bg-destructive/10"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            title="Clear Cart"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4">
                                <AnimatePresence mode="popLayout">
                                    {cart.length === 0 ? (
                                        <motion.div
                                            className="text-center py-8"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <div className="text-5xl mb-3">🍕</div>
                                            <p className="text-muted-foreground">Your cart is empty</p>
                                            <p className="text-muted-foreground text-sm">Add some delicious pizzas!</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className="space-y-4"
                                            variants={containerVariants}
                                        >
                                            {cart.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    className="border-b pb-4 last:border-b-0"
                                                    variants={itemVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    layout
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <motion.img
                                                            src={getPizzaImage(item.size)}
                                                            alt={`${item.size} pizza`}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                            whileHover={{ scale: 1.05 }}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-medium text-foreground">
                                                                {item.size.charAt(0).toUpperCase() + item.size.slice(1)} Pizza
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {item.hasPepperoni && 'Pepperoni, '}
                                                                {item.hasExtraCheese && 'Extra Cheese'}
                                                            </p>
                                                            <p className="text-sm font-medium text-primary mt-1">
                                                                RM{Number(item.itemTotal).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <motion.button
                                                            onClick={() => handleRemoveFromCart(item)}
                                                            className="text-destructive hover:text-destructive/80 transition-colors duration-200 p-2 rounded-full hover:bg-destructive/10"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            title="Remove Item"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </motion.button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div
                                className="p-4 border-t bg-muted"
                                variants={itemVariants}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium text-foreground">Total</span>
                                    <motion.span
                                        className="text-2xl font-bold text-primary"
                                        key={cartTotal}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        RM{cartTotal.toFixed(2)}
                                    </motion.span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Documentation Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    className="bg-card shadow-xl rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold text-foreground">Pizza Calculator Overview</h2>
                    </div>
                    <div className="p-6 space-y-8">
                        {/* Key Features */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium text-foreground">Pizza Customization</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        <li>Size selection with varying prices</li>
                                        <li>Optional toppings with size-based pricing</li>
                                        <li>Real-time price calculation</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-foreground">Shopping Cart</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        <li>Session-based persistence</li>
                                        <li>Add/remove items functionality</li>
                                        <li>Real-time total updates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Pricing Structure</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium text-foreground">Base Prices</h4>
                                    <ul className="list-none text-sm text-muted-foreground space-y-1">
                                        <li>Small: RM15</li>
                                        <li>Medium: RM22</li>
                                        <li>Large: RM30</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-foreground">Toppings</h4>
                                    <ul className="list-none text-sm text-muted-foreground space-y-1">
                                        <li>Pepperoni (Small): +RM3</li>
                                        <li>Pepperoni (Medium/Large): +RM5</li>
                                        <li>Extra Cheese (All sizes): +RM6</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AlertDialog open={!!itemToRemove} onOpenChange={() => setItemToRemove(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove Pizza from Cart</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this pizza from your cart?
                            {itemToRemove && (
                                <div className="mt-2 text-sm">
                                    <p>
                                        {itemToRemove.size.charAt(0).toUpperCase() + itemToRemove.size.slice(1)} Pizza
                                        {itemToRemove.hasPepperoni && ' with Pepperoni'}
                                        {itemToRemove.hasExtraCheese && ' and Extra Cheese'}
                                    </p>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmRemove}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showClearCartDialog} onOpenChange={() => setShowClearCartDialog(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to clear your cart?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmClearCart}>Clear</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </GuestLayout>
    );
};

export default PizzaCalculator;