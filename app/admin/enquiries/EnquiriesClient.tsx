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
import { Input } from "@/components/ui/input";
import { Search, Trash2, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataPagination } from "@/components/DataPagination";
import { deleteEnquiryAction } from "./actions";
import { toast } from "sonner";

const PAGE_SIZE = 10;

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

export function EnquiriesClient({
  initialEnquiries,
}: {
  initialEnquiries: Enquiry[];
}) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDelete = async (id: string, name: string) => {
    setConfirmDelete(null);
    setDeletingId(id);
    const result = await deleteEnquiryAction(id);
    if (result.success) {
      setEnquiries(enquiries.filter((e) => e.id !== id));
      toast.success(`Enquiry from ${name} deleted`);
    } else {
      toast.error("Failed to delete enquiry");
    }
    setDeletingId(null);
  };

  const filteredEnquiries = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return enquiries.filter(
      (enq) =>
        enq.name.toLowerCase().includes(term) ||
        enq.email.toLowerCase().includes(term) ||
        (enq.company && enq.company.toLowerCase().includes(term)) ||
        (enq.phone && enq.phone.includes(searchTerm)),
    );
  }, [enquiries, searchTerm]);

  const totalPages = Math.ceil(filteredEnquiries.length / PAGE_SIZE);
  const paginatedEnquiries = filteredEnquiries.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-[#2F2F2F]">
            Enquiries
          </h1>
          <p className="font-sans text-sm text-[#2F2F2F]/50 mt-1">
            Incoming leads from the contact form.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2F2F2F]/30 w-4 h-4" />
          <Input
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 h-10 text-sm border-neutral-300 bg-white focus-visible:ring-[#f08080] focus-visible:ring-2 rounded-lg shadow-sm"
          />
        </div>
      </div>
      <Card className="bg-white border-neutral-200 shadow-sm overflow-hidden rounded-xl py-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-neutral-200 bg-neutral-50">
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6">
                  Lead
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6">
                  Requirement
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6 text-right">
                  Volume
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-6 text-right">
                  Date
                </TableHead>
                <TableHead className="text-xs font-bold text-[#2F2F2F]/60 uppercase tracking-wider py-4 px-3 w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEnquiries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-[#2F2F2F]/40 text-sm"
                  >
                    No enquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedEnquiries.map((enq) => (
                  <TableRow
                    key={enq.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors"
                  >
                    <TableCell className="py-5 px-6 min-w-[200px]">
                      <div className="font-semibold text-sm text-[#2F2F2F]">
                        {enq.name}
                      </div>
                      {enq.company && (
                        <div className="text-xs text-[#2F2F2F]/50 mt-0.5">
                          {enq.company}
                        </div>
                      )}
                      <div className="text-xs text-[#2F2F2F]/40 mt-0.5">
                        {enq.email}
                      </div>
                      {enq.phone && (
                        <div className="text-xs text-[#2F2F2F]/40 mt-0.5">
                          {enq.phone}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-5 px-6 max-w-[320px]">
                      <p className="text-sm text-[#2F2F2F]/70 line-clamp-2 leading-relaxed">
                        {enq.requirement}
                      </p>
                    </TableCell>
                    <TableCell className="text-right py-5 px-6 font-semibold text-sm text-[#2F2F2F] whitespace-nowrap">
                      {enq.meters ? enq.meters.toLocaleString() : "—"} m
                    </TableCell>
                    <TableCell className="text-right py-5 px-6 text-xs text-[#2F2F2F]/50 whitespace-nowrap">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                      }).format(new Date(enq.createdAt))}
                    </TableCell>
                    <TableCell className="py-5 px-3">
                      <button
                        onClick={() =>
                          setConfirmDelete({ id: enq.id, name: enq.name })
                        }
                        disabled={deletingId === enq.id}
                        className="p-2 text-[#2F2F2F]/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === enq.id ? (
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
        open={confirmDelete !== null}
        title="Delete Enquiry"
        description={`Are you sure you want to delete the enquiry from ${confirmDelete?.name}? This action cannot be undone.`}
        loading={deletingId !== null}
        onConfirm={() =>
          confirmDelete && handleDelete(confirmDelete.id, confirmDelete.name)
        }
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
