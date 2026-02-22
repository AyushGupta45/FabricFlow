import {
  Factory,
  Palette,
  PackageCheck,
  Search,
  Settings,
  Paintbrush,
  ShieldCheck,
  Truck,
  Shield,
  Clock,
  Globe,
  ClipboardCheck,
  Activity,
  Layers,
  FlaskConical,
  PenTool,
  Award,
} from "lucide-react";

export const services = [
  {
    title: "Fabric Processing",
    description:
      "Grey fabric treatment including RFD, bleaching, mercerizing and singeing to prepare for dyeing.",
    icon: Factory,
  },
  {
    title: "Dyeing & Printing",
    description:
      "Reactive dyeing, digital printing and screen printing based on buyer specifications and lab dips.",
    icon: Palette,
  },
  {
    title: "Bulk Roll Dispatch",
    description:
      "Processed fabric rolls inspected, stretch-packed and dispatched securely to your warehouse.",
    icon: PackageCheck,
  },
  {
    title: "Finishing & Coating",
    description:
      "Calendering, water-repellent coating, anti-pilling and softener treatments for export-quality finish.",
    icon: Layers,
  },
  {
    title: "Lab Testing & Colour Matching",
    description:
      "In-house lab for colour fastness testing, shrinkage analysis, and precise pantone matching to buyer dips.",
    icon: FlaskConical,
  },
  {
    title: "Custom Print Development",
    description:
      "From concept artwork to production-ready screens — complete print development with sampling included.",
    icon: PenTool,
  },
];

export const processSteps = [
  {
    id: 1,
    title: "Grey Fabric Inspection",
    label: "Initial quality check",
    icon: <Search className="w-7 h-7 text-[#f08080]" strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: "Processing",
    label: "RFD & Bleaching",
    icon: <Settings className="w-7 h-7 text-[#f08080]" strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: "Printing",
    label: "Dyeing & printing",
    icon: <Paintbrush className="w-7 h-7 text-[#f08080]" strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: "Quality Check",
    label: "Final inspection",
    icon: <ShieldCheck className="w-7 h-7 text-[#f08080]" strokeWidth={1.5} />,
  },
  {
    id: 5,
    title: "Dispatch",
    label: "Securely packed rolls",
    icon: <Truck className="w-7 h-7 text-[#f08080]" strokeWidth={1.5} />,
  },
];

export const whyChooseUs = [
  {
    icon: Shield,
    title: "ISO 9001 Certified",
    description:
      "Quality management system certified ensuring consistent output across every batch.",
  },
  {
    icon: Clock,
    title: "24-Hour Quotation",
    description:
      "Send us your specs — receive a detailed processing quotation within one business day.",
  },
  {
    icon: Globe,
    title: "Pan-India Delivery",
    description:
      "Reliable dispatch network covering all major textile hubs across India.",
  },
];

export const capabilitiesMetrics = [
  {
    value: 10,
    prefix: "5-",
    suffix: " Lakh",
    unit: "Meters",
    label: "Monthly Capacity",
  },
  {
    value: 15,
    prefix: "",
    suffix: "",
    unit: "Days",
    label: "Processing Turn-around",
  },
  {
    value: 35,
    prefix: "30-",
    suffix: "",
    unit: "Days",
    label: "Printing Completion",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rajesh Mehta",
    company: "Sanghvi Textiles",
    quote:
      "FabricFlow consistently delivers on time with quality we can depend on. Our production line has never run smoother.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "Gujarat Fabrics Ltd.",
    quote:
      "Switching to FabricFlow for our reactive dyeing needs was the best decision. Excellent colour fastness and consistency.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    company: "Krishna Exports",
    quote:
      "Their turnaround time is remarkable. From grey fabric to finished rolls in 15 days — helps us meet tight export deadlines.",
    rating: 5,
  },
];

export const CLIENT_LOGOS = [
  "Sanghvi Textiles",
  "Gujarat Fabrics",
  "Krishna Exports",
  "Reliance Mills",
  "Arvind Ltd",
  "Vardhman Group",
];

export const qualityMetrics = [
  {
    title: "Sample Approval",
    description:
      "Rigorous checking of samples matching to client lab dips and specs before production begins.",
    icon: ClipboardCheck,
  },
  {
    title: "Process Monitoring",
    description:
      "Continuous supervision of parameters like PH, temperature, and speed throughout production.",
    icon: Activity,
  },
  {
    title: "Roll Inspection",
    description:
      "100% manual and automated checks looking for stains, damages, or discrepancies.",
    icon: Search,
  },
  {
    title: "Safe Dispatch",
    description:
      "Secure stretch packing ensuring quality holds throughout transport and handling.",
    icon: ShieldCheck,
  },
];

export const GALLERY_IMAGES = [
  {
    src: "/textile-factory.png",
    alt: "Modern textile processing factory floor with dyeing machines",
    caption: "Processing Facility",
    span: "",
  },
  {
    src: "/fabric-rolls.png",
    alt: "Premium fabric rolls stacked in warehouse",
    caption: "Finished Fabric Rolls",
    span: "",
  },
  {
    src: "/quality-inspection.png",
    alt: "Quality inspection on industrial inspection table",
    caption: "Quality Control",
    span: "",
  },
  {
    src: "/dyeing-vats.png",
    alt: "Industrial dyeing vats filled with vibrant blue fabric",
    caption: "Dyeing Section",
    span: "",
  },
  {
    src: "/screen-printing.png",
    alt: "Rotary screen printing machine printing patterns on cotton",
    caption: "Screen Printing",
    span: "",
  },
  {
    src: "/fabric-warehouse.png",
    alt: "Warehouse with towering shelves of colorful fabric rolls",
    caption: "Fabric Warehouse",
    span: "",
  },
  {
    src: "/lab-testing.png",
    alt: "Colour fastness testing and Pantone matching in lab",
    caption: "Lab Testing",
    span: "",
  },
  {
    src: "/finishing-machine.png",
    alt: "Calendering and finishing machine processing fabric",
    caption: "Finishing Unit",
    span: "",
  },
  {
    src: "/quality-check.png",
    alt: "Worker examining printed fabric under inspection lights",
    caption: "Quality Check",
    span: "",
  },
  {
    src: "/dispatch-bay.png",
    alt: "Stretch-packed fabric rolls ready for dispatch",
    caption: "Dispatch Bay",
    span: "",
  },
  {
    src: "/fabric-cutting.png",
    alt: "Automated fabric cutting machine in operation",
    caption: "Fabric Cutting",
    span: "",
  },
  {
    src: "/mercerizing-unit.png",
    alt: "Industrial mercerizing machine processing fabric",
    caption: "Mercerizing Unit",
    span: "",
  },
  {
    src: "/color-swatches.png",
    alt: "Colorful fabric swatches and Pantone samples on table",
    caption: "Colour Matching",
    span: "",
  },
  {
    src: "/steam-treatment.png",
    alt: "Industrial steam treatment chamber processing fabric",
    caption: "Steam Treatment",
    span: "",
  },
];

export const CERTIFICATIONS = [
  {
    icon: Shield,
    title: "ISO 9001:2015",
    description:
      "Quality management system certified — ensuring consistent process output across every batch.",
  },
  {
    icon: Award,
    title: "Oeko-Tex Standard 100",
    description:
      "Tested for harmful substances — our processed textiles are safe for direct skin contact.",
  },
  {
    icon: Globe,
    title: "GOTS Certified",
    description:
      "Global Organic Textile Standard compliance for sustainable and organic textile processing.",
  },
];

export const FACILITY_STATS = [
  { value: "50,000", unit: "sq. ft.", label: "Processing Facility" },
  { value: "14", unit: "Machines", label: "Industrial Equipment" },
  { value: "120+", unit: "Workers", label: "Skilled Workforce" },
  { value: "24/7", unit: "Monitoring", label: "Quality Control" },
];
