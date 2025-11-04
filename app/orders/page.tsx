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

// Dummy order data
const orders = [
  {
    id: "O-1001",
    customer: "Alice Smith",
    total: "$123.45",
    status: "Processing",
    date: "2024-05-01",
  },
  {
    id: "O-1002",
    customer: "Bob Johnson",
    total: "$89.00",
    status: "Shipped",
    date: "2024-05-02",
  },
  {
    id: "O-1003",
    customer: "Carol White",
    total: "$210.15",
    status: "Delivered",
    date: "2024-05-04",
  },
  {
    id: "O-1004",
    customer: "Dan Lee",
    total: "$47.00",
    status: "Processing",
    date: "2024-05-06",
  },
  {
    id: "O-1005",
    customer: "Eva Brown",
    total: "$59.30",
    status: "Cancelled",
    date: "2024-05-06",
  },
  {
    id: "O-1006",
    customer: "Frank Miller",
    total: "$132.99",
    status: "Refunded",
    date: "2024-05-08",
  },
  {
    id: "O-1007",
    customer: "Grace Lin",
    total: "$24.15",
    status: "Shipped",
    date: "2024-05-13",
  },
  {
    id: "O-1008",
    customer: "Henry Kim",
    total: "$71.20",
    status: "Processing",
    date: "2024-05-13",
  },
  {
    id: "O-1009",
    customer: "Ivy Wu",
    total: "$412.72",
    status: "Delivered",
    date: "2024-05-15",
  },
  {
    id: "O-1010",
    customer: "Jack Black",
    total: "$65.80",
    status: "Shipped",
    date: "2024-05-20",
  },
  {
    id: "O-1011",
    customer: "Kat Parker",
    total: "$105.90",
    status: "Processing",
    date: "2024-06-01",
  },
  {
    id: "O-1012",
    customer: "Leo Chang",
    total: "$310.55",
    status: "Delivered",
    date: "2024-06-02",
  },
];

const PAGE_SIZE = 5;

type OrderRow =
  | (typeof orders)[number]
  | {
      id: string;
      customer: string;
      total: string;
      status: string;
      date: string;
      isBlank: true;
    };

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Filter orders by search on id, customer, status, total, date
  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;
    const lower = search.toLowerCase();
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(lower) ||
        order.customer.toLowerCase().includes(lower) ||
        order.status.toLowerCase().includes(lower) ||
        order.total.toLowerCase().includes(lower) ||
        order.date.toLowerCase().includes(lower)
    );
  }, [search]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));

  React.useEffect(() => {
    if (page > totalPages) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOrders, totalPages]);

  const paginatedOrders = useMemo(() => {
    return filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [filteredOrders, page]);

  // Blank rows for layout consistency
  const displayRows: OrderRow[] = [
    ...paginatedOrders,
    ...Array.from({
      length:
        PAGE_SIZE - paginatedOrders.length > 0
          ? PAGE_SIZE - paginatedOrders.length
          : 0,
    }).map((_, i) => ({
      id: `blank-${i}`,
      customer: "",
      total: "",
      status: "",
      date: "",
      isBlank: true as const,
    })),
  ];

  return (
    <div className="p-4">
      <Header
        title="Orders"
        description="View and manage your store’s orders."
      />
      {/* Input at the top of the table */}
      <div className="mb-4 w-full">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </span>
          <Input
            className="pl-10 w-full"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            aria-label="Search orders"
          />
        </div>
      </div>
      {/* Orders Table */}
      <Table className="border border-border rounded-md">
        <TableHeader className="rounded-md">
          <TableRow className="border-b border-border">
            <TableHead className="w-[110px] px-6 py-4">Order ID</TableHead>
            <TableHead className="px-6 py-4">Customer</TableHead>
            <TableHead className="px-6 py-4">Date</TableHead>
            <TableHead className="px-6 py-4">Status</TableHead>
            <TableHead className="text-right px-6 py-4">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRows.map((order) =>
            "isBlank" in order && order.isBlank ? (
              <TableRow className="border-b border-border" key={order.id}>
                <TableCell className="px-6 py-4">&nbsp;</TableCell>
                <TableCell className="px-6 py-4"></TableCell>
                <TableCell className="px-6 py-4"></TableCell>
                <TableCell className="px-6 py-4"></TableCell>
                <TableCell className="text-right px-6 py-4"></TableCell>
              </TableRow>
            ) : (
              <TableRow className="border-b border-border" key={order.id}>
                <TableCell className="font-medium px-6 py-4">
                  {order.id}
                </TableCell>
                <TableCell className="px-6 py-4">{order.customer}</TableCell>
                <TableCell className="px-6 py-4">{order.date}</TableCell>
                <TableCell className="px-6 py-4">{order.status}</TableCell>
                <TableCell className="text-right px-6 py-4">
                  {order.total}
                </TableCell>
              </TableRow>
            )
          )}
          {/* Show row if no matches */}
          {filteredOrders.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-6"
              >
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination row with page info on left and pagination controls centered */}
      <div className="flex items-center mt-4">
        {/* Left: Page info */}
        <span className="text-sm text-muted-foreground mr-auto">{`Page ${
          filteredOrders.length === 0 ? 0 : page
        } of ${totalPages}`}</span>
        {/* Middle: Pagination Controls */}
        <div className="flex items-center justify-center flex-1 gap-2">
          <button
            className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-sm disabled:opacity-50 flex items-center justify-center"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || filteredOrders.length === 0}
            aria-label="Previous page"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1">
            {filteredOrders.length > 0 &&
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
            disabled={page === totalPages || filteredOrders.length === 0}
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
