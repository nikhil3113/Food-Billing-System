"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartDialog } from "@/components/AddtoCartDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GenerateBill } from "@/components/GenerateBill";

// This is a static mock data for demonstration
const MOCK_MENU_ITEMS = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheddar cheese, lettuce, tomato, and special sauce",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    categoryId: "1",
    categoryName: "Burgers",
    available: true,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description:
      "Traditional pizza with tomato sauce, fresh mozzarella, basil, and olive oil",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    categoryId: "2",
    categoryName: "Pizza",
    available: true,
  },
  {
    id: "3",
    name: "Caesar Salad",
    description:
      "Romaine lettuce with Caesar dressing, parmesan cheese, and croutons",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    categoryId: "3",
    categoryName: "Salads",
    available: true,
  },
  {
    id: "4",
    name: "Veggie Wrap",
    description:
      "Whole wheat wrap filled with hummus, mixed greens, avocado, and roasted vegetables",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    categoryId: "4",
    categoryName: "Wraps",
    available: true,
  },
  {
    id: "5",
    name: "Chicken Alfredo Pasta",
    description:
      "Fettuccine pasta with creamy Alfredo sauce and grilled chicken",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    categoryId: "5",
    categoryName: "Pasta",
    available: true,
  },
  {
    id: "6",
    name: "Chocolate Brownie Sundae",
    description:
      "Warm brownie topped with vanilla ice cream, chocolate sauce, and whipped cream",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    categoryId: "6",
    categoryName: "Desserts",
    available: true,
  },
  {
    id: "7",
    name: "Spicy Chicken Wings",
    description:
      "Crispy fried chicken wings tossed in spicy buffalo sauce, served with blue cheese dip",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    categoryId: "7",
    categoryName: "Appetizers",
    available: false,
  },
  {
    id: "8",
    name: "Fresh Fruit Smoothie",
    description: "Blend of seasonal fruits with yogurt and honey",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1647275486864-1b29efb0d570?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RnJlc2glMjBGcnVpdCUyMFNtb290aGllfGVufDB8fDB8fHww",
    categoryId: "8",
    categoryName: "Beverages",
    available: true,
  },
];

// Group menu items by category
const groupByCategory = (items: typeof MOCK_MENU_ITEMS) => {
  const grouped: Record<string, typeof MOCK_MENU_ITEMS> = {};

  items.forEach((item) => {
    if (!grouped[item.categoryName]) {
      grouped[item.categoryName] = [];
    }
    grouped[item.categoryName].push(item);
  });

  return grouped;
};

export default function MenuPage() {
  const menuByCategory = groupByCategory(MOCK_MENU_ITEMS);
  const [cartItems, setCartItems] = useState<
    Array<{ item: (typeof MOCK_MENU_ITEMS)[0]; quantity: number }>
  >([]);
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  };

  const handleAddToCart = (
    item: (typeof MOCK_MENU_ITEMS)[0],
    quantity: number
  ) => {
    // Check if item already in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.item.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { item, quantity }]);
    }

    toast({
      title: "Added to Cart",
      description: `${quantity} × ${item.name} added to your cart.`,
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.item.id !== itemId));
    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart.",
      variant: "destructive",
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Cart Icon in Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-full h-12 w-12"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalCartItems() > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center"
                  variant="destructive"
                >
                  {getTotalCartItems()}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>
                {cartItems.length === 0
                  ? "Your cart is empty"
                  : `You have ${getTotalCartItems()} items in your cart`}
              </SheetDescription>
            </SheetHeader>

            {cartItems.length > 0 && (
              <>
                <div className="my-6 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {cartItems.map((cartItem) => (
                    <div key={cartItem.item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{cartItem.item.name}</h4>
                        <p className="text-sm text-gray-500">
                          &#8377;{cartItem.item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleUpdateQuantity(
                                cartItem.item.id,
                                cartItem.quantity - 1
                              )
                            }
                          >
                            <span>-</span>
                          </Button>
                          <span className="w-8 text-center">
                            {cartItem.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleUpdateQuantity(
                                cartItem.item.id,
                                cartItem.quantity + 1
                              )
                            }
                          >
                            <span>+</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <span className="font-semibold">
                          &#8377;
                          {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-500"
                          onClick={() => handleRemoveFromCart(cartItem.item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mt-auto">
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Subtotal</span>
                    <span className="font-semibold">
                      &#8377;{getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <GenerateBill
                    cartItems={cartItems}
                    totalAmount={getCartTotal()}
                    onCheckout={() => {
                      // Clear cart after successful checkout
                      setTimeout(() => {
                        setCartItems([]);
                        setIsCartOpen(false);
                        toast({
                          title: "Order completed",
                          description:
                            "Your order has been placed successfully",
                        });
                      }, 2000);
                    }}
                  />
                </div>
              </>
            )}

            {cartItems.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <ShoppingCart className="h-16 w-16 text-gray-300" />
                <p className="text-gray-500">Your cart is empty</p>
                <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_MENU_ITEMS.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={item.available ? "default" : "destructive"}
              >
                {item.available ? "Available" : "Out of Stock"}
              </Badge>
              <Badge className="absolute top-2 left-2" variant="secondary">
                {item.categoryName}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{item.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                &#8377;{item.price.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{item.description}</p>
            </CardContent>
            <CardFooter className="pt-2">
              <AddToCartDialog item={item} onAddToCart={handleAddToCart} />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Category sections */}
      <div className="mt-16 space-y-12">
        {Object.entries(menuByCategory).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">{category}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card key={item.id} className="flex overflow-hidden w-[400px]">
                  <div className="relative w-1/3 min-h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col w-2/3 p-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-2 gap-5">
                      <span className="font-semibold">
                        &#8377;{item.price.toFixed(2)}
                      </span>
                      <div className="px-5">
                        <AddToCartDialog
                          item={item}
                          onAddToCart={handleAddToCart}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
