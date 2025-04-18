"use client";

import { useState, useRef } from "react";
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
import { Printer, Download, Copy, Check } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type CartItem = {
  item: {
    id: string;
    name: string;
    price: number;
    categoryName: string;
  };
  quantity: number;
};

type GenerateBillProps = {
  cartItems: CartItem[];
  totalAmount: number;
  orderId?: string;
  onCheckout: () => void;
};

export function GenerateBill({
  cartItems,
  totalAmount,
  orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
  onCheckout,
}: GenerateBillProps) {
  const [open, setOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const billRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const tax = totalAmount * 0.08; // 8% tax
  const grandTotal = totalAmount + tax;
  const currentDate = format(new Date(), "PPP");
  const currentTime = format(new Date(), "p");

  const handleFloatingPrint = useReactToPrint({
    contentRef: billRef,
    documentTitle: `Bill-${orderId}`,
    onAfterPrint: () => {
      toast({
        title: "Bill printed successfully",
        description: "Thank you for your order!",
      });
      setOpen(false); // Close dialog after printing
      onCheckout(); // Call onCheckout to clear cart and show success message
    },
  });

  const handleDownload = () => {
    const element = document.createElement("a");
    const billContent = billRef.current?.outerHTML || "";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill-${orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .bill-container { max-width: 800px; margin: 0 auto; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { border-top: 1px solid #ddd; }
            .total-row td { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="bill-container">
            ${billContent}
          </div>
        </body>
      </html>
    `;

    const file = new Blob([htmlContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `Bill-${orderId}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Bill downloaded",
      description: `Saved as Bill-${orderId}.html`,
    });
    setOpen(false); // Close dialog after downloading
    onCheckout(); // Call onCheckout to clear cart and show success message
  };

  const copyToClipboard = () => {
    if (!billRef.current) return;

    const lines = [
      `FOOD BILLING SYSTEM`,
      `Order ID: ${orderId}`,
      `Date: ${currentDate} ${currentTime}`,
      ``,
      `Customer: ${customerInfo.name}`,
      customerInfo.phone ? `Phone: ${customerInfo.phone}` : ``,
      ``,
      `ITEMS:`,
    ];

    cartItems.forEach(({ item, quantity }) => {
      lines.push(
        `${item.name} x${quantity} - &#8377;${(item.price * quantity).toFixed(
          2
        )}`
      );
    });

    lines.push(``);
    lines.push(`Subtotal: &#8377;${totalAmount.toFixed(2)}`);
    lines.push(`Tax (8%): &#8377;${tax.toFixed(2)}`);
    lines.push(`Total: &#8377;${grandTotal.toFixed(2)}`);
    lines.push(``);
    lines.push(`Thank you for your order!`);

    const textBill = lines.filter((line) => line !== undefined).join("\n");

    navigator.clipboard.writeText(textBill).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      toast({
        title: "Bill copied to clipboard",
        description: "You can paste it anywhere now",
      });
    });
  };

  const handleCheckout = () => {
    setIsGenerating(true);

    // Simulate API call to save order
    setTimeout(() => {
      setIsGenerating(false);
      setOpen(true); // Open dialog to collect customer info
    }, 1500);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    onCheckout(); // Call onCheckout when user explicitly closes the dialog
  };

  return (
    <>
      <Button
        className="w-full"
        onClick={handleCheckout}
        disabled={isGenerating || cartItems.length === 0}
      >
        {isGenerating ? "Processing..." : "Checkout & Generate Bill"}
      </Button>

      <Dialog open={open} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Information</DialogTitle>
            <DialogDescription>
              Please provide your details for the bill.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>

          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
              className="sm:order-1 w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFloatingPrint();
              }}
              className="sm:order-3 w-full sm:w-auto"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print Bill
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="sm:order-2 w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="hidden">
        <div ref={billRef} className="p-6 max-w-2xl mx-auto bg-white">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">FOOD BILLING SYSTEM</h1>
            <p className="text-gray-500">123 Food Street, Cityville</p>
            <p className="text-gray-500">Phone: (555) 123-4567</p>
          </div>

          <div className="flex justify-between mb-6">
            <div>
              <p className="font-bold">Bill To:</p>
              <p>{customerInfo.name || "Guest Customer"}</p>
              {customerInfo.phone && <p>Phone: {customerInfo.phone}</p>}
              {customerInfo && <p>Address: FF Foods</p>}
            </div>
            <div className="text-right">
              <p className="font-bold">Order #: {orderId}</p>
              <p>Date: {currentDate}</p>
              <p>Time: {currentTime}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
            <table className="w-full">
              <thead>
                <tr className="border-t border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Unit Price</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(({ item, quantity }) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">
                      <p>{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.categoryName}
                      </p>
                    </td>
                    <td className="text-center py-2">{quantity}</td>
                    <td className="text-right py-2">
                      &#8377;{item.price.toFixed(2)}
                    </td>
                    <td className="text-right py-2">
                      &#8377;{(item.price * quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right pt-4">
                    Subtotal:
                  </td>
                  <td className="text-right pt-4">
                    &#8377;{totalAmount.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right">
                    Tax (8%):
                  </td>
                  <td className="text-right">&#8377;{tax.toFixed(2)}</td>
                </tr>
                <tr className="font-bold">
                  <td colSpan={3} className="text-right pt-2">
                    Total:
                  </td>
                  <td className="text-right pt-2">
                    &#8377;{grandTotal.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="text-center mt-8 pt-4 border-t">
            <p>Thank you for your order!</p>
            <p className="text-sm text-gray-500 mt-2">
              For any queries, please contact customer service at
              support@foodbilling.com
            </p>
          </div>
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 flex gap-2 z-40">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0 bg-white shadow-lg"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0 bg-white shadow-lg"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-10 w-10 p-0 bg-white shadow-lg"
            onClick={() => handleFloatingPrint()}
          >
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
