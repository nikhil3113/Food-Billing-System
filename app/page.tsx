import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Clock, CreditCard, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071" 
            alt="Restaurant hero image"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Quick Food <span className="text-yellow-400">Billing</span> System
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-8">
            A modern ordering system that makes your dining experience seamless and efficient.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/menu-page">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-black">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our System</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Food</h3>
              <p className="text-gray-600">
                All meals are made with high-quality, fresh ingredients for the best taste.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Quick ordering and billing process means less waiting and more enjoying.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Payment</h3>
              <p className="text-gray-600">
                Multiple payment options available for your convenience.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Locations</h3>
              <p className="text-gray-600">
                Find us at convenient locations across the city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Most Popular Items</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our customers favorite dishes that keep them coming back for more.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">₹{item.price.toFixed(2)}</span>
                    <Button asChild size="sm">
                      <Link href="/menu-page">
                        Order Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/menu-page">
                View Full Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Place Your Order?</h2>
          <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
            Experience our fast and convenient ordering system and enjoy delicious food without the wait.
          </p>
          <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white">
            <Link href="/menu-page">
              Order Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fast Food Billing</h3>
              <p className="text-gray-400">
                Making your dining experience seamless and enjoyable.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/menu-page" className="text-gray-400 hover:text-white">Menu</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                123 Food Street<br />
                Cityville, State 12345<br />
                Phone: (555) 123-4567<br />
                Email: info@fastfoodbilling.com
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Fast Food Billing System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Popular items data
const popularItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar cheese, lettuce, tomato, and special sauce",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Traditional pizza with tomato sauce, fresh mozzarella, basil, and olive oil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Spicy Chicken Wings",
    description: "Crispy fried chicken wings tossed in spicy buffalo sauce, served with blue cheese dip",
    price: 11.49,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];