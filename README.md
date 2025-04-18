# Fast Food Billing System

![Fast Food Billing System Banner](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop&w=1200&h=400)

A modern, feature-rich web application designed to streamline food ordering and billing processes for restaurants. The system provides an intuitive interface for customers to browse menus, place orders, and receive itemized bills, while giving restaurant staff efficient order management tools.

## ✨ Features

### Customer Features

- **Interactive Menu Browsing** - Explore food items with high-quality images
- **Shopping Cart** - Add, remove, and modify items with real-time calculations
- **Bill Generation** - Professional, downloadable bills with complete order details
- **User Authentication** - Secure login with social provider options

### Business Features

- **Order Processing** - Track orders from placement to fulfillment
- **Bill Management** - Generate, print, and download itemized bills
- **Menu Management** - Easily update your menu offerings
- **User Management** - Manage customer accounts and staff access levels

## 🖥️ Screenshots

<div align="center">
  <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" width="400" alt="Menu Interface" />
  <img src="https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" width="400" alt="Bill Generation" />
</div>

## 🔧 Technology Stack

- **Next.js** - React framework for server-side rendering and routing
- **TypeScript** - Type safety and improved developer experience
- **Tailwind CSS** - Responsive, modern UI design system
- **Next Auth** - Authentication with multiple provider support
- **React Context API** - Global state management
- **React to Print** - Bill printing functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-billing-system.git
   cd food-billing-system
   ```
2. **Install dependencies**
   ```bash
   npm install
    # or
    yarn install
   ```
3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add your environment variables. You can use the `.env.example` file as a reference.

   ```json
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   DATABASE_URL=your_database_url
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Adding Menu Items**

   - Navigate to the app/menu-page/page.tsx file.
   - Add your menu items in the `menuItems` array.

   ```typescript
   const menuItems = [
     {
       id: "1",
       name: "Classic Cheeseburger",
       description:
         "Juicy beef patty with melted cheddar cheese, lettuce, tomato, and special sauce",
       price: 9.99,
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
       price: 12.99,
       image:
         "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
       categoryId: "2",
       categoryName: "Pizza",
       available: true,
     },
     // Add more items as needed
   ];
   ```

## 📸 Screenshots

<div align="center">
  <details open>
    <summary><strong>Application Showcase</strong></summary>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
      <a href="/public/homePage.png" target="_blank">
        <img src="/public/homePage.png" width="100%" alt="Home Page" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        <p align="center"><strong>Home Page</strong> - Modern interface with featured items</p>
      </a>
      <a href="/Menu-Page.png" target="_blank">
        <img src="/Menu-Page.png" width="100%" alt="Menu Page" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        <p align="center"><strong>Menu Page</strong> - Browse categories and items</p>
      </a>
      <a href="/MenuPageSecondHalf.png" target="_blank">
        <img src="/MenuPageSecondHalf.png" width="100%" alt="Menu Categories" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        <p align="center"><strong>Menu Categories</strong> - Multiple food options</p>
      </a>
      <a href="/fastFoodSidebar.png" target="_blank">
        <img src="/fastFoodSidebar.png" width="100%" alt="Navigation Sidebar" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        <p align="center"><strong>Navigation Sidebar</strong> - Intuitive app navigation</p>
      </a>
      <a href="/Bill.png" target="_blank">
        <img src="/Bill.png" width="100%" alt="Bill Generation" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        <p align="center"><strong>Bill Generation</strong> - Detailed order summary</p>
      </a>
      <a href="/DownloadBill.png" target="_blank">
        <img src="/DownloadBill.png" width="100%" alt="Bill Download" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        <p align="center"><strong>Bill Download</strong> - Save and share receipts</p>
      </a>
    </div>
  </details>
</div>

<div align="center">
  <p><em>Click on any screenshot to view full size</em></p>
</div>

      >
