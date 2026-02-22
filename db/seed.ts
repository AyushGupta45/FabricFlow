import { db } from "./index";
import { orders, enquiries } from "./schema";

async function main() {
  console.log("Seeding database...");

  // Clear existing data (delete orders first due to FK)
  await db.delete(orders);
  await db.delete(enquiries);

  // Seed Enquiries (with emails)
  const now = new Date();
  const enquiryData = [
    {
      name: "Rahul Verma",
      email: "rahul@vermaexporters.com",
      company: "Verma Exporters",
      phone: "+91 9876543210",
      requirement: "Reactive printing on cotton sheets.",
      meters: 25000,
    },
    {
      name: "Sneha Gupta",
      email: "sneha@luxefabrics.in",
      company: "Luxe Fabrics",
      phone: "+91 9988776655",
      requirement: "Digital printing on rayon with Pantone matching.",
      meters: 15000,
    },
    {
      name: "Manoj Singh",
      email: "manoj@singhexports.com",
      company: "Singh Exports",
      phone: "+91 9123456789",
      requirement: "Mercerizing and finishing for export-quality cotton.",
      meters: 50000,
    },
    {
      name: "Arjun Mehta",
      email: "arjun@mehtatextiles.com",
      company: "Mehta Textile Mills",
      phone: "+91 9811122233",
      requirement: "Bleaching and RFD processing for 40s cotton fabric.",
      meters: 32000,
    },
    {
      name: "Priya Shah",
      email: "priya@urbanloom.in",
      company: "Urban Loom Pvt Ltd",
      requirement: "Pigment printing on polyester blend fabric.",
      meters: 18000,
    },
    {
      name: "Karan Malhotra",
      email: "karan@malhotraoverseas.com",
      company: "Malhotra Overseas",
      phone: "+91 9765432101",
      requirement: "Reactive dyeing for bed linen export order.",
      meters: 45000,
    },
    {
      name: "Neha Agarwal",
      email: "neha@agarwalhome.com",
      company: "Agarwal Home Textiles",
      requirement: "Digital floral print on viscose fabric.",
      meters: 22000,
    },
    {
      name: "Vikram Patel",
      email: "vikram@patelprocessors.in",
      company: "Patel Processors",
      phone: "+91 9871203040",
      requirement: "Mercerizing and soft finish for premium shirting.",
      meters: 38000,
    },
    {
      name: "Rohit Bansal",
      email: "rohit@bansalexim.com",
      company: "Bansal Exim",
      phone: "+91 9812345678",
      requirement: "Screen printing on cotton canvas fabric.",
      meters: 27000,
    },
    {
      name: "Ishita Rao",
      email: "ishita@raofashion.com",
      company: "Rao Fashion Fabrics",
      requirement: "Pantone shade matching for export buyer.",
      meters: 12000,
    },
    {
      name: "Amit Tiwari",
      email: "amit@tiwaritextiles.in",
      company: "Tiwari Textile Works",
      phone: "+91 9823456123",
      requirement: "Calendering and wrinkle-resistant finishing.",
      meters: 41000,
    },
    {
      name: "Deepak Yadav",
      email: "deepak@yadavgarments.com",
      company: "Yadav Garments Supply",
      phone: "+91 9784512365",
      requirement: "Reactive dyeing for bulk T-shirt fabric.",
      meters: 60000,
    },
  ];

  const insertedEnquiries = await db
    .insert(enquiries)
    .values(enquiryData)
    .returning();

  // Seed Orders — linked to enquiries with FF-XXXXX IDs
  const orderSeedData = [
    {
      orderId: "FF-R7K3M",
      enquiryId: insertedEnquiries[0].id,
      clientName: insertedEnquiries[0].name,
      clientEmail: insertedEnquiries[0].email,
      fabricType: "Cotton Sheet",
      meters: 15000,
      status: "Processing",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 5, 5),
    },
    {
      orderId: "FF-B4N8W",
      enquiryId: insertedEnquiries[1].id,
      clientName: insertedEnquiries[1].name,
      clientEmail: insertedEnquiries[1].email,
      fabricType: "Rayon",
      meters: 8500,
      status: "Received",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 4, 12),
    },
    {
      orderId: "FF-P2X6T",
      enquiryId: insertedEnquiries[2].id,
      clientName: insertedEnquiries[2].name,
      clientEmail: insertedEnquiries[2].email,
      fabricType: "Cotton 40s",
      meters: 22000,
      status: "Printing",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 4, 24),
    },
    {
      orderId: "FF-D9H5A",
      enquiryId: insertedEnquiries[3].id,
      clientName: insertedEnquiries[3].name,
      clientEmail: insertedEnquiries[3].email,
      fabricType: "Cotton Poplin",
      meters: 30000,
      status: "Completed",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 3, 3),
    },
    {
      orderId: "FF-L6Y2J",
      enquiryId: insertedEnquiries[5].id,
      clientName: insertedEnquiries[5].name,
      clientEmail: insertedEnquiries[5].email,
      fabricType: "Cotton Sateen",
      meters: 12000,
      status: "Dispatched",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 3, 17),
    },
    {
      orderId: "FF-Q8C4V",
      enquiryId: insertedEnquiries[7].id,
      clientName: insertedEnquiries[7].name,
      clientEmail: insertedEnquiries[7].email,
      fabricType: "Cotton Voile",
      meters: 18000,
      status: "Completed",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 2, 8),
    },
    {
      orderId: "FF-G3E7U",
      clientName: "Reliance Mills",
      clientEmail: "orders@reliancemills.in",
      fabricType: "Polyester Blend",
      meters: 25000,
      status: "Processing",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 2, 20),
    },
    {
      orderId: "FF-M5S9F",
      clientName: "Arvind Ltd",
      clientEmail: "procurement@arvind.com",
      fabricType: "Denim",
      meters: 40000,
      status: "Dispatched",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 4),
    },
    {
      orderId: "FF-Z2W8K",
      clientName: "Vardhman Group",
      clientEmail: "textile@vardhman.com",
      fabricType: "Cotton Twill",
      meters: 20000,
      status: "Printing",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 15),
    },
    {
      orderId: "FF-A4V6N",
      clientName: "Welspun India",
      clientEmail: "sourcing@welspun.com",
      fabricType: "Terry Cotton",
      meters: 35000,
      status: "Received",
      createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 28),
    },
    {
      orderId: "FF-T7J3P",
      clientName: "Raymond Textiles",
      clientEmail: "ops@raymond.in",
      fabricType: "Wool Blend",
      meters: 15000,
      status: "Processing",
      createdAt: new Date(now.getFullYear(), now.getMonth(), 2),
    },
    {
      orderId: "FF-H9X5B",
      clientName: "Bombay Dyeing",
      clientEmail: "purchase@bombaydyeing.com",
      fabricType: "Cambric Cotton",
      meters: 28000,
      status: "Received",
      createdAt: new Date(now.getFullYear(), now.getMonth(), 10),
    },
  ];

  await db.insert(orders).values(orderSeedData);

  console.log("Database seeded successfully!");
  console.log(`  → ${insertedEnquiries.length} enquiries`);
  console.log(`  → ${orderSeedData.length} orders`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
