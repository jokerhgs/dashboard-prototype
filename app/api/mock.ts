export const fetchDashboardData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    revenueChart: [
      { month: "January", sales: 1200 },
      { month: "February", sales: 1400 },
      { month: "March", sales: 1700 },
      { month: "April", sales: 900 },
      { month: "May", sales: 1500 },
      { month: "June", sales: 2000 },
    ],
    orderVolume: [
      { month: "January", orders: 300 },
      { month: "February", orders: 350 },
      { month: "March", orders: 420 },
      { month: "April", orders: 210 },
      { month: "May", orders: 390 },
      { month: "June", orders: 480 },
    ],
  };
};

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "out_of_stock" | "low_stock";
  sales: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: "1",
      name: "Wireless Headphones Pro",
      category: "Electronics",
      price: 199.99,
      stock: 45,
      status: "active",
      sales: 234,
    },
    {
      id: "2",
      name: "Smart Watch Series 8",
      category: "Electronics",
      price: 349.99,
      stock: 12,
      status: "low_stock",
      sales: 189,
    },
    {
      id: "3",
      name: "Leather Backpack",
      category: "Fashion",
      price: 89.99,
      stock: 0,
      status: "out_of_stock",
      sales: 156,
    },
    {
      id: "4",
      name: "Coffee Maker Deluxe",
      category: "Home & Kitchen",
      price: 129.99,
      stock: 78,
      status: "active",
      sales: 312,
    },
    {
      id: "5",
      name: "Running Shoes",
      category: "Sports",
      price: 119.99,
      stock: 5,
      status: "low_stock",
      sales: 278,
    },
    {
      id: "6",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 79.99,
      stock: 34,
      status: "active",
      sales: 445,
    },
    {
      id: "7",
      name: "Yoga Mat Premium",
      category: "Sports",
      price: 39.99,
      stock: 92,
      status: "active",
      sales: 567,
    },
    {
      id: "8",
      name: "Desk Lamp LED",
      category: "Home & Kitchen",
      price: 49.99,
      stock: 0,
      status: "out_of_stock",
      sales: 123,
    },
    {
      id: "9",
      name: "Phone Case Leather",
      category: "Accessories",
      price: 24.99,
      stock: 156,
      status: "active",
      sales: 892,
    },
    {
      id: "10",
      name: "Water Bottle Insulated",
      category: "Sports",
      price: 29.99,
      stock: 67,
      status: "active",
      sales: 634,
    },
  ];
};
