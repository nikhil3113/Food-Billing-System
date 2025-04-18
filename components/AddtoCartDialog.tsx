
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { PlusCircle, MinusCircle, ShoppingCart } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  categoryName: string;
  available: boolean;
};

type AddToCartDialogProps = {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
};

export function AddToCartDialog({ item, onAddToCart }: AddToCartDialogProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    setOpen(false);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full"
        disabled={!item.available}
        variant={item.available ? "default" : "outline"}
      >
        {item.available ? (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </>
        ) : (
          "Out of Stock"
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
            <DialogDescription>
              Customize your order before adding to cart.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 relative h-24 w-full rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-3">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="font-semibold mt-1">&#8377;{item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      setQuantity(val);
                    }
                  }}
                  className="w-16 text-center"
                  min={1}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div className="font-medium">
              Total: &#8377;{(item.price * quantity).toFixed(2)}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}