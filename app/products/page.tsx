"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Header } from "../_components/header";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: "P001",
    name: "Wireless Mouse",
    price: "$29.99",
    stock: 120,
  },
  {
    id: "P002",
    name: "Mechanical Keyboard",
    price: "$89.99",
    stock: 60,
  },
  {
    id: "P003",
    name: "HD Monitor",
    price: "$199.99",
    stock: 30,
  },
  // Example: add more fake data for pagination demonstration
  { id: "P004", name: "Webcam", price: "$59.99", stock: 75 },
  { id: "P005", name: "USB-C Hub", price: "$39.99", stock: 52 },
  { id: "P006", name: "Gaming Chair", price: "$299.99", stock: 12 },
  { id: "P007", name: "Desk Lamp", price: "$24.99", stock: 200 },
  { id: "P008", name: "Bluetooth Speaker", price: "$49.99", stock: 90 },
  { id: "P009", name: "Laptop Stand", price: "$34.99", stock: 63 },
  { id: "P010", name: "External SSD", price: "$129.99", stock: 15 },
  { id: "P011", name: "Drawing Tablet", price: "$109.99", stock: 25 },
  {
    id: "P012",
    name: "Noise Cancelling Headphones",
    price: "$179.99",
    stock: 39,
  },
];

const PAGE_SIZE = 5;

type ProductRow =
  | (typeof products)[number]
  | {
      id: string;
      name: string;
      price: string;
      stock: string;
      isBlank: true;
    };

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Derived list: filtered by search
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const lower = search.toLowerCase();
    return products.filter(
      (product) =>
        product.id.toLowerCase().includes(lower) ||
        product.name.toLowerCase().includes(lower) ||
        product.price.toLowerCase().includes(lower) ||
        product.stock.toString().toLowerCase().includes(lower)
    );
  }, [search]);

  // Calculate total pages from filtered list
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  // Adjust current page if filtering reduces number of pages
  React.useEffect(() => {
    if (page > totalPages) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts, totalPages]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [filteredProducts, page]);

  // Pad the paginatedProducts with blank rows if less than PAGE_SIZE
  const displayRows: ProductRow[] = [
    ...paginatedProducts,
    ...Array.from({
      length:
        PAGE_SIZE - paginatedProducts.length > 0
          ? PAGE_SIZE - paginatedProducts.length
          : 0,
    }).map((_, i) => ({
      id: `blank-${i}`,
      name: "",
      price: "",
      stock: "",
      isBlank: true as const,
    })),
  ];

  return (
    <div className="p-4">
      <Header
        title="Products"
        description="Browse and manage your inventory of products."
      />
      {/* Input at the top of the table */}
      <div className="mb-4 w-full">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </span>
          <Input
            className="pl-10 w-full"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            aria-label="Search products"
          />
        </div>
      </div>
      {/* Products Table */}
      <Table className="border border-border rounded-md">
        <TableHeader className="rounded-md">
          <TableRow className="border-b border-border">
            <TableHead className="w-[100px] px-6 py-4">Product ID</TableHead>
            <TableHead className="px-6 py-4">Name</TableHead>
            <TableHead className="px-6 py-4">Price</TableHead>
            <TableHead className="text-right px-6 py-4">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRows.map((product) =>
            "isBlank" in product && product.isBlank ? (
              <TableRow className="border-b border-border" key={product.id}>
                <TableCell className="px-6 py-4">&nbsp;</TableCell>
                <TableCell className="px-6 py-4"></TableCell>
                <TableCell className="px-6 py-4"></TableCell>
                <TableCell className="text-right px-6 py-4"></TableCell>
              </TableRow>
            ) : (
              <TableRow className="border-b border-border" key={product.id}>
                <TableCell className="font-medium px-6 py-4">
                  {product.id}
                </TableCell>
                <TableCell className="px-6 py-4">{product.name}</TableCell>
                <TableCell className="px-6 py-4">{product.price}</TableCell>
                <TableCell className="text-right px-6 py-4">
                  {product.stock}
                </TableCell>
              </TableRow>
            )
          )}
          {/* Show row if no matches */}
          {filteredProducts.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6"
              >
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination row with page info on left and pagination controls centered */}
      <div className="flex items-center mt-4">
        {/* Left: Page info */}
        <span className="text-sm text-muted-foreground mr-auto">{`Page ${
          filteredProducts.length === 0 ? 0 : page
        } of ${totalPages}`}</span>
        {/* Middle: Pagination Controls */}
        <div className="flex items-center justify-center flex-1 gap-2">
          <button
            className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-sm disabled:opacity-50 flex items-center justify-center"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || filteredProducts.length === 0}
            aria-label="Previous page"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1">
            {filteredProducts.length > 0 &&
              [...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = pageNum === page;
                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded border text-sm ${
                      isCurrent
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                    onClick={() => setPage(pageNum)}
                    aria-current={isCurrent ? "page" : undefined}
                    type="button"
                  >
                    {pageNum}
                  </button>
                );
              })}
          </div>
          <button
            className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-sm disabled:opacity-50 flex items-center justify-center"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || filteredProducts.length === 0}
            aria-label="Next page"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        {/* Spacer at far right to balance flex */}
        <span className="ml-auto" />
      </div>
    </div>
  );
}
