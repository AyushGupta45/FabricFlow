"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Plus, Trash2, X } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  createOrderAction,
  updateOrderStatusAction,
  deleteOrderAction,
} from "./actions";
import { DataPagination } from "@/components/DataPagination";
import { toast } from "sonner";

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  "Received",
  "Processing",
  "Printing",
  "QC",
  "Packing",
  "Dispatched",
  "Completed",
];
const STATUS_COLORS: Record<string, string> = {
  Received: "bg-blue-50 text-blue-700 border-blue-200",
  Processing: "bg-amber-50 text-amber-700 border-amber-200",
  Printing: "bg-purple-50 text-purple-700 border-purple-200",
  QC: "bg-orange-50 text-orange-700 border-orange-200",
  Packing: "bg-teal-50 text-teal-700 border-teal-200",
  Dispatched: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

type Order = {
  id: string;
  orderId: string;
  enquiryId: string | null;
  clientName: string;
  clientEmail: string;
  fabricType: string | null;
  meters: number;
  status: string;
  createdAt: Date;
};

type Enquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  requirement: string;
  meters: number | null;
  createdAt: Date;
};

export function OrdersClient({
  initialOrders,
  enquiries,
}: {
  initialOrders: Order[];
  enquiries: Enquiry[];
}) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Create form state
  const [selectedEnquiryId, setSelectedEnquiryId] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [meters, setMeters] = useState("");

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((o) =>
        o.orderId === orderId ? { ...o, status: newStatus } : o,
      ),
    );
    setLoadingId(orderId);
    const result = await updateOrderStatusAction(orderId, newStatus);
    if (!result.success) {
      setOrders(initialOrders);
      toast.error("Failed to update status");
    } else {
      toast.success(`Status updated to ${newStatus}`);
    }
    setLoadingId(null);
  };

  const handleCreate = async () => {
    if (!selectedEnquiryId || !fabricType || !meters) {
      toast.error("Please fill all fields");
      return;
    }
    setCreating(true);
    const result = await createOrderAction(
      selectedEnquiryId,
      fabricType,
      parseInt(meters, 10),
    );
    if (result.success) {
      toast.success(`Order ${result.orderId} created successfully`);
      setShowCreate(false);
      setSelectedEnquiryId("");
      setFabricType("");
      setMeters("");
      // Refresh - add fake order to UI optimistically
      window.location.reload();
    } else {
      toast.error(result.error || "Failed to create order");
    }
    setCreating(false);
  };

  const handleDelete = async (orderId: string) => {
    setConfirmDeleteId(null);
    setDeletingId(orderId);
    const result = await deleteOrderAction(orderId);
    if (result.success) {
      setOrders(orders.filter((o) => o.orderId !== orderId));
      toast.success(`Order ${orderId} deleted`);
    } else {
      toast.error("Failed to delete order");
    }
    setDeletingId(null);
  };

  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return orders.filter(
      (o) =>
        o.orderId.toLowerCase().includes(term) ||
        o.clientName.toLowerCase().includes(term),
    );
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const selectedEnquiry = enquiries.find((e) => e.id === selectedEnquiryId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-[#2F2F2F]">
            Orders
          </h1>
          <p className="font-sans text-sm text-[#2F2F2F]/50 mt-1">
            View and update active processing pipelines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2F2F2F]/30 w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-10 text-sm border-neutral-300 bg-white focus-visible:ring-[#f08080] focus-visible:ring-2 rounded-lg shadow-sm"
            />
          </div>
          <Button
            onClick={() => setShowCreate(true)}
            className="h-10 px-4 bg-[#f08080] hover:bg-[#e46d6d] text-white rounded-lg text-sm font-semibold shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Create Order Dialog */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-4 right-4 text-[#2F2F2F]/40 hover:text-[#2F2F2F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-heading font-bold text-xl text-[#2F2F2F] mb-1">
              Create New Order
            </h2>
            <p className="text-sm text-[#2F2F2F]/50 mb-6">
              Select an enquiry to create an order from. The order ID will be
              auto-generated.
            </p>

            <div className="space-y-4">
              {/* Enquiry Selector */}
              <div>
                <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">
                  Enquiry *
                </label>
                <Select
                  value={selectedEnquiryId}
                  onValueChange={setSelectedEnquiryId}
                >
                  <SelectTrigger className="w-full h-10 border-neutral-300 text-sm bg-white rounded-lg">
                    <SelectValue placeholder="Select an enquiry..." />
                  </SelectTrigger>
                  <SelectContent>
                    {enquiries.map((enq) => (
                      <SelectItem
                        key={enq.id}
                        value={enq.id}
                        className="text-sm"
                      >
                        {enq.name}
                        {enq.company ? ` — ${enq.company}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedEnquiry && (
                  <div className="mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-[#2F2F2F]/60">
                    <span className="font-medium text-[#2F2F2F]">
                      {selectedEnquiry.email}
                    </span>
                    <span className="mx-2">·</span>
                    <span>{selectedEnquiry.requirement}</span>
                    {selectedEnquiry.meters && (
                      <>
                        <span className="mx-2">·</span>
                        <span>{selectedEnquiry.meters.toLocaleString()} m</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Fabric Type */}
              <div>
                <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">
                  Fabric Type *
                </label>
                <Input
                  placeholder="e.g. Cotton 40s, Polyester Blend"
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value)}
                  className="h-10 text-sm border-neutral-300 bg-white rounded-lg focus-visible:ring-[#f08080]"
                />
              </div>

              {/* Meters */}
              <div>
                <label className="block text-sm font-medium text-[#2F2F2F] mb-1.5">
                  Meters *
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 25000"
                  value={meters}
                  onChange={(e) => setMeters(e.target.value)}
                  className="h-10 text-sm border-neutral-300 bg-white rounded-lg focus-visible:ring-[#f08080]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreate(false)}
                className="h-10 px-4 text-sm rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={creating}
                className="h-10 px-6 bg-[#f08080] hover:bg-[#e46d6d] text-white rounded-lg text-sm font-semibold shadow-sm"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Order"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="bg-white border-neutral-200 shadow-sm overflow-hidden rounded-xl py-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-neutral-200 bg-neutral-50">
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6">
                  Order
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6">
                  Client
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6">
                  Fabric
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6 text-right">
                  Meters
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6">
                  Status
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6 w-[200px]">
                  Update
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-3 w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-[#2F2F2F]/40 text-sm"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors"
                  >
                    <TableCell className="font-semibold text-[#2F2F2F] text-sm py-5 px-6">
                      {order.orderId}
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <div className="text-sm text-[#2F2F2F]/70">
                        {order.clientName}
                      </div>
                      <div className="text-xs text-[#2F2F2F]/40 mt-0.5">
                        {order.clientEmail}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-[#2F2F2F]/50 py-5 px-6">
                      {order.fabricType || "—"}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-sm text-[#2F2F2F] py-5 px-6">
                      {order.meters.toLocaleString()}
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium px-2.5 py-0.5 ${STATUS_COLORS[order.status] || "bg-gray-50 text-gray-700 border-gray-200"}`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <Select
                        value={order.status}
                        onValueChange={(val) =>
                          handleStatusChange(order.orderId, val)
                        }
                        disabled={loadingId === order.orderId}
                      >
                        <SelectTrigger className="h-9 w-[170px] border-neutral-300 text-sm focus:ring-[#f08080] bg-white rounded-lg shadow-sm">
                          <div className="flex items-center gap-2">
                            {loadingId === order.orderId && (
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#f08080]" />
                            )}
                            <SelectValue placeholder="Status" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s} className="text-sm">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="py-5 px-3">
                      <button
                        onClick={() => setConfirmDeleteId(order.orderId)}
                        disabled={deletingId === order.orderId}
                        className="p-2 text-[#2F2F2F]/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === order.orderId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="px-6">
        <DataPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        title="Delete Order"
        description={`Are you sure you want to delete order ${confirmDeleteId}? This action cannot be undone.`}
        loading={deletingId !== null}
        onConfirm={() => confirmDeleteId && handleDelete(confirmDeleteId)}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
}
