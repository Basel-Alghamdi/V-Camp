import {
  PrismaClient,
  Role,
  Priority,
  RequestStatus,
  PaymentStatus,
  TransactionStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ── helpers ──────────────────────────────────────────────
const hash = (pw: string) => bcrypt.hashSync(pw, 12);
const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);
const SAR = (v: number) => v;

async function connectWithRetry(maxRetries = 5) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      await prisma.$queryRawUnsafe("SELECT 1");
      console.log("✅ Database connected");
      return;
    } catch {
      console.log(`⏳ Waiting for database to wake up… (attempt ${i}/${maxRetries})`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
  throw new Error("Could not connect to database after retries");
}

async function main() {
  console.log("🏗️  Seeding demo / trial data …");

  await connectWithRetry();

  // ─── 0. Cleanup previous demo data ───────────────────
  console.log("🧹 Cleaning up previous demo data…");
  await prisma.activityLog.deleteMany({ where: { user: { buildingId: "demo-building-001" } } });
  await prisma.document.deleteMany({ where: { buildingId: "demo-building-001" } });
  await prisma.transaction.deleteMany({ where: { buildingId: "demo-building-001" } });
  await prisma.announcement.deleteMany({ where: { buildingId: "demo-building-001" } });
  await prisma.maintenanceRequest.deleteMany({ where: { buildingId: "demo-building-001" } });
  await prisma.vendor.deleteMany({
    where: {
      name: {
        in: [
          "Al Faris Maintenance Co.", "Noor Electric Solutions", "Cool Zone HVAC",
          "Saudi Lift Engineering", "Guardian Security Systems",
          "Green Oasis Landscaping", "Crystal Clean Services",
        ],
      },
    },
  });
  console.log("✅ Cleanup done");

  // ─── 1. Building ──────────────────────────────────────
  const building = await prisma.building.upsert({
    where: { id: "demo-building-001" },
    update: {},
    create: {
      id: "demo-building-001",
      name: "Al Rimal Residence",
      address: "Prince Sultan Road, Al Olaya District, Riyadh 12211",
      unitsCount: 84,
      subscriptionPlan: "premium",
    },
  });
  console.log("✅ Building ready");

  // ─── 2. Users (sequential upserts) ───────────────────
  const demoOwner = await prisma.user.upsert({
    where: { email: "bofaf78501@niprack.com" },
    update: { buildingId: building.id, unitNumber: "A-504" },
    create: {
      name: "Abdullah Al-Rashid",
      email: "bofaf78501@niprack.com",
      passwordHash: hash("demo1234"),
      role: Role.OWNER,
      unitNumber: "A-504",
      buildingId: building.id,
    },
  });

  const demoManager = await prisma.user.upsert({
    where: { email: "demo-manager@vcamp.sa" },
    update: {},
    create: {
      name: "Khalid Al-Otaibi",
      email: "demo-manager@vcamp.sa",
      passwordHash: hash("demo1234"),
      role: Role.MANAGER,
      buildingId: building.id,
    },
  });

  const demoAdmin = await prisma.user.upsert({
    where: { email: "demo-admin@vcamp.sa" },
    update: {},
    create: {
      name: "Faisal Al-Harbi",
      email: "demo-admin@vcamp.sa",
      passwordHash: hash("demo1234"),
      role: Role.ADMIN,
      buildingId: building.id,
    },
  });

  const owner2 = await prisma.user.upsert({
    where: { email: "demo-owner2@vcamp.sa" },
    update: {},
    create: {
      name: "Mohammed Al-Qahtani",
      email: "demo-owner2@vcamp.sa",
      passwordHash: hash("demo1234"),
      role: Role.OWNER,
      unitNumber: "B-201",
      buildingId: building.id,
    },
  });

  const owner3 = await prisma.user.upsert({
    where: { email: "demo-owner3@vcamp.sa" },
    update: {},
    create: {
      name: "Sara Al-Dosari",
      email: "demo-owner3@vcamp.sa",
      passwordHash: hash("demo1234"),
      role: Role.OWNER,
      unitNumber: "C-102",
      buildingId: building.id,
    },
  });
  console.log("✅ Users created (5)");

  // ─── 3. Vendors (sequential — need IDs back) ─────────
  const alFaris = await prisma.vendor.create({
    data: {
      name: "Al Faris Maintenance Co.",
      category: "Plumbing",
      rating: 4.7,
      email: "info@alfaris.sa",
      phone: "+966 55 123 4567",
      contractEndDate: new Date("2027-06-30"),
      description: "Licensed plumbing & water systems contractor serving Riyadh since 2015.",
    },
  });

  const noorElec = await prisma.vendor.create({
    data: {
      name: "Noor Electric Solutions",
      category: "Electrical",
      rating: 4.5,
      email: "support@noorelectric.sa",
      phone: "+966 55 234 5678",
      contractEndDate: new Date("2026-12-31"),
      description: "Certified electricians for residential and commercial projects.",
    },
  });

  const coolZone = await prisma.vendor.create({
    data: {
      name: "Cool Zone HVAC",
      category: "HVAC",
      rating: 4.8,
      email: "service@coolzone.sa",
      phone: "+966 55 345 6789",
      contractEndDate: new Date("2027-03-15"),
      description: "AC installation, repair & maintenance — all major brands.",
    },
  });

  const saudiLift = await prisma.vendor.create({
    data: {
      name: "Saudi Lift Engineering",
      category: "Elevators",
      rating: 4.3,
      email: "ops@saudilift.sa",
      phone: "+966 55 456 7890",
      contractEndDate: new Date("2026-09-30"),
      description: "Elevator installation, modernization & 24/7 emergency service.",
    },
  });

  const guardian = await prisma.vendor.create({
    data: {
      name: "Guardian Security Systems",
      category: "Security",
      rating: 4.6,
      email: "hello@guardiansec.sa",
      phone: "+966 55 567 8901",
      contractEndDate: new Date("2027-01-15"),
      description: "CCTV, access control, and manned security for residential compounds.",
    },
  });

  const greenOasis = await prisma.vendor.create({
    data: {
      name: "Green Oasis Landscaping",
      category: "Landscaping",
      rating: 4.4,
      email: "care@greenoasis.sa",
      phone: "+966 55 678 9012",
      contractEndDate: new Date("2026-11-30"),
      description: "Professional landscaping, irrigation & garden maintenance.",
    },
  });

  const crystalClean = await prisma.vendor.create({
    data: {
      name: "Crystal Clean Services",
      category: "Cleaning",
      rating: 4.9,
      email: "book@crystalclean.sa",
      phone: "+966 55 789 0123",
      contractEndDate: new Date("2027-04-30"),
      description: "Daily building cleaning, deep cleaning & pest control services.",
    },
  });

  console.log("✅ Vendors created (7)");

  // ─── 4. Maintenance Requests (createMany) ─────────────
  await prisma.maintenanceRequest.createMany({
    data: [
      {
        title: "Elevator B stuck on 5th floor",
        description: "Elevator B is stuck between the 5th and 6th floor. Passengers were safely evacuated. Elevator is now out of service.",
        location: "Tower A — Elevator B",
        category: "Elevators",
        priority: Priority.HIGH,
        status: RequestStatus.IN_PROGRESS,
        paymentStatus: PaymentStatus.UNPAID,
        amount: SAR(8500),
        vendorId: saudiLift.id,
        createdById: demoOwner.id,
        buildingId: building.id,
        createdAt: daysAgo(1),
      },
      {
        title: "Major water leak in basement B2",
        description: "Significant water pooling in the basement parking B2 near drainage channel. Possible main pipe burst.",
        location: "Basement B2 — Drainage Area",
        category: "Plumbing",
        priority: Priority.HIGH,
        status: RequestStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdById: demoManager.id,
        buildingId: building.id,
        createdAt: daysAgo(0),
      },
      {
        title: "Emergency power generator failure",
        description: "Backup generator failed during scheduled test. Replaced faulty starter motor and fuel pump.",
        location: "Utility Room — Ground Floor",
        category: "Electrical",
        priority: Priority.HIGH,
        status: RequestStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
        amount: SAR(12000),
        vendorId: noorElec.id,
        createdById: demoAdmin.id,
        buildingId: building.id,
        createdAt: daysAgo(14),
      },
      {
        title: "AC not cooling — Unit A-504",
        description: "Split AC in the living room is running but not producing cold air. Possible refrigerant leak.",
        location: "Unit A-504 — Living Room",
        category: "HVAC",
        priority: Priority.MEDIUM,
        status: RequestStatus.IN_PROGRESS,
        paymentStatus: PaymentStatus.UNPAID,
        amount: SAR(1800),
        vendorId: coolZone.id,
        createdById: demoOwner.id,
        buildingId: building.id,
        createdAt: daysAgo(3),
      },
      {
        title: "Lobby CCTV camera offline",
        description: "Camera #7 in the main lobby has been offline for 2 days. Night vision IR module may be burnt.",
        location: "Main Lobby — Camera #7",
        category: "Security",
        priority: Priority.MEDIUM,
        status: RequestStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        vendorId: guardian.id,
        createdById: demoManager.id,
        buildingId: building.id,
        createdAt: daysAgo(2),
      },
      {
        title: "Swimming pool pump repair",
        description: "Pool circulation pump making loud grinding noise. Replaced impeller and mechanical seal.",
        location: "Rooftop — Swimming Pool",
        category: "Plumbing",
        priority: Priority.MEDIUM,
        status: RequestStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
        amount: SAR(3200),
        vendorId: alFaris.id,
        createdById: owner2.id,
        buildingId: building.id,
        createdAt: daysAgo(21),
      },
      {
        title: "Replace corridor light fixtures — Floor 3",
        description: "6 LED panel lights on the 3rd floor corridor are flickering. Full replacement recommended.",
        location: "3rd Floor — Corridor",
        category: "Electrical",
        priority: Priority.MEDIUM,
        status: RequestStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
        amount: SAR(2400),
        vendorId: noorElec.id,
        createdById: demoManager.id,
        buildingId: building.id,
        createdAt: daysAgo(30),
      },
      {
        title: "Garden sprinkler heads need adjustment",
        description: "Several sprinkler heads in the east garden are spraying onto walkways instead of plant beds.",
        location: "East Garden",
        category: "Landscaping",
        priority: Priority.LOW,
        status: RequestStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        vendorId: greenOasis.id,
        createdById: owner3.id,
        buildingId: building.id,
        createdAt: daysAgo(5),
      },
      {
        title: "Repaint speed bumps in parking",
        description: "Yellow paint on parking speed bumps has faded. Needs fresh coat for visibility & safety.",
        location: "Parking — All Levels",
        category: "General",
        priority: Priority.LOW,
        status: RequestStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
        amount: SAR(950),
        vendorId: crystalClean.id,
        createdById: demoManager.id,
        buildingId: building.id,
        createdAt: daysAgo(45),
      },
      {
        title: "Install EV charger in parking",
        description: "Request to install electric vehicle charging station in parking spot B2-15.",
        location: "Basement B2 — Spot 15",
        category: "Electrical",
        priority: Priority.LOW,
        status: RequestStatus.REJECTED,
        paymentStatus: PaymentStatus.UNPAID,
        createdById: demoOwner.id,
        buildingId: building.id,
        createdAt: daysAgo(35),
      },
      {
        title: "Front gate intercom malfunction",
        description: "Visitor intercom at the main gate is producing static. Visitors cannot communicate with residents.",
        location: "Main Gate — Intercom Panel",
        category: "Security",
        priority: Priority.HIGH,
        status: RequestStatus.IN_PROGRESS,
        paymentStatus: PaymentStatus.UNPAID,
        amount: SAR(2200),
        vendorId: guardian.id,
        createdById: owner2.id,
        buildingId: building.id,
        createdAt: daysAgo(1),
      },
      {
        title: "Deep cleaning — common areas",
        description: "Quarterly deep cleaning of all lobbies, corridors, stairwells, and parking levels.",
        location: "All Common Areas",
        category: "Cleaning",
        priority: Priority.MEDIUM,
        status: RequestStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
        amount: SAR(5500),
        vendorId: crystalClean.id,
        createdById: demoManager.id,
        buildingId: building.id,
        createdAt: daysAgo(10),
      },
      {
        title: "Rooftop water tank cleaning",
        description: "Annual water tank sanitization and inspection as per municipal health regulations.",
        location: "Rooftop — Water Tanks",
        category: "Plumbing",
        priority: Priority.MEDIUM,
        status: RequestStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        amount: SAR(4000),
        vendorId: alFaris.id,
        createdById: demoAdmin.id,
        buildingId: building.id,
        createdAt: daysAgo(4),
      },
      {
        title: "Fire alarm panel annual inspection",
        description: "Mandatory annual fire alarm system test and certification by Civil Defense.",
        location: "Ground Floor — Fire Panel Room",
        category: "Safety",
        priority: Priority.HIGH,
        status: RequestStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdById: demoManager.id,
        buildingId: building.id,
        createdAt: daysAgo(2),
      },
      {
        title: "Replace gym flooring tiles",
        description: "Several rubber floor tiles in the gym area are cracked and need replacement.",
        location: "Ground Floor — Gym",
        category: "General",
        priority: Priority.LOW,
        status: RequestStatus.IN_PROGRESS,
        paymentStatus: PaymentStatus.UNPAID,
        amount: SAR(3800),
        createdById: owner3.id,
        buildingId: building.id,
        createdAt: daysAgo(7),
      },
    ],
  });
  console.log("✅ Maintenance requests created (15)");

  // ─── 5. Announcements (createMany) ────────────────────
  await prisma.announcement.createMany({
    data: [
      {
        title: "Annual General Meeting — Q1 2026",
        description: "The annual owners' meeting is scheduled for March 28, 2026 at 7:00 PM in the ground floor meeting hall. Agenda includes budget review, maintenance plans, and board elections. All unit owners are required to attend or send a proxy.",
        priority: Priority.HIGH,
        buildingId: building.id,
        createdById: demoAdmin.id,
        createdAt: daysAgo(3),
      },
      {
        title: "Scheduled Water Supply Interruption",
        description: "Water supply will be temporarily shut off on March 20 from 8:00 AM to 1:00 PM for tank cleaning and pipe inspection. Please store enough water for the duration.",
        priority: Priority.HIGH,
        buildingId: building.id,
        createdById: demoManager.id,
        createdAt: daysAgo(5),
      },
      {
        title: "New Parking Regulations — Effective April 1st",
        description: "Each unit is allocated a maximum of 2 parking spots. Guest parking is limited to 4 hours. Unauthorized vehicles will be towed at the owner's expense. Updated stickers will be distributed next week.",
        priority: Priority.MEDIUM,
        buildingId: building.id,
        createdById: demoManager.id,
        createdAt: daysAgo(7),
      },
      {
        title: "Swimming Pool Summer Hours",
        description: "Starting April 1st, the rooftop swimming pool will operate from 6:00 AM to 10:00 PM daily. Children under 12 must be accompanied by an adult at all times.",
        priority: Priority.LOW,
        buildingId: building.id,
        createdById: demoManager.id,
        createdAt: daysAgo(10),
      },
      {
        title: "Elevator Maintenance Schedule",
        description: "Elevator A will undergo preventive maintenance every Tuesday from 9:00 AM to 11:00 AM. Elevator B will remain operational during this time. We apologize for the inconvenience.",
        priority: Priority.MEDIUM,
        buildingId: building.id,
        createdById: demoManager.id,
        createdAt: daysAgo(12),
      },
      {
        title: "Quarterly Pest Control Treatment",
        description: "Pest control treatment for all common areas and parking levels is scheduled for March 22. Residents are advised to keep unit doors and windows closed between 7:00–9:00 AM.",
        priority: Priority.MEDIUM,
        buildingId: building.id,
        createdById: demoAdmin.id,
        createdAt: daysAgo(4),
      },
      {
        title: "Ramadan Security Arrangements",
        description: "During the holy month of Ramadan, main gate hours will be extended until 2:00 AM. Additional security personnel will be posted at all entrances during Taraweeh prayer times.",
        priority: Priority.HIGH,
        buildingId: building.id,
        createdById: demoAdmin.id,
        createdAt: daysAgo(1),
      },
      {
        title: "Community BBQ Event — Families Welcome",
        description: "Join us for a community BBQ this Friday from 5:00 PM at the garden area. Food and beverages will be provided. RSVP at the reception desk by Wednesday.",
        priority: Priority.LOW,
        buildingId: building.id,
        createdById: demoManager.id,
        createdAt: daysAgo(2),
      },
    ],
  });
  console.log("✅ Announcements created (8)");

  // ─── 6. Transactions (createMany) ─────────────────────
  await prisma.transaction.createMany({
    data: [
      { description: "Service charges — January 2026", amount: SAR(126000), category: "fee", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(75) },
      { description: "Service charges — February 2026", amount: SAR(126000), category: "fee", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(45) },
      { description: "Service charges — March 2026", amount: SAR(126000), category: "fee", status: TransactionStatus.PENDING, buildingId: building.id, createdAt: daysAgo(15) },
      { description: "Generator repair — Noor Electric", amount: SAR(12000), category: "Maintenance", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(14) },
      { description: "Pool pump repair — Al Faris", amount: SAR(3200), category: "Maintenance", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(21) },
      { description: "Corridor lights — Noor Electric", amount: SAR(2400), category: "Maintenance", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(30) },
      { description: "Deep cleaning Q1 — Crystal Clean", amount: SAR(5500), category: "Cleaning", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(10) },
      { description: "Speed bump painting", amount: SAR(950), category: "Maintenance", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(45) },
      { description: "Elevator B emergency repair", amount: SAR(8500), category: "Maintenance", status: TransactionStatus.PENDING, buildingId: building.id, createdAt: daysAgo(1) },
      { description: "AC repair — Unit A-504", amount: SAR(1800), category: "Maintenance", status: TransactionStatus.UNPAID, buildingId: building.id, createdAt: daysAgo(3) },
      { description: "Guardian Security — Monthly contract", amount: SAR(15000), category: "Security", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(15) },
      { description: "CCTV system annual license", amount: SAR(4500), category: "Security", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(60) },
      { description: "Electricity bill — February 2026", amount: SAR(18500), category: "Utilities", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(20) },
      { description: "Water bill — February 2026", amount: SAR(6200), category: "Utilities", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(20) },
      { description: "Electricity bill — March 2026", amount: SAR(19200), category: "Utilities", status: TransactionStatus.PENDING, buildingId: building.id, createdAt: daysAgo(2) },
      { description: "Monthly landscaping — Green Oasis", amount: SAR(3500), category: "Landscaping", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(15) },
      { description: "Building insurance — annual premium", amount: SAR(45000), category: "Insurance", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(90) },
      { description: "Management office supplies", amount: SAR(1200), category: "Administrative", status: TransactionStatus.PAID, buildingId: building.id, createdAt: daysAgo(25) },
      { description: "Fire alarm inspection fee", amount: SAR(2800), category: "Safety", status: TransactionStatus.PENDING, buildingId: building.id, createdAt: daysAgo(2) },
      { description: "Gym equipment maintenance", amount: SAR(3800), category: "Amenities", status: TransactionStatus.UNPAID, buildingId: building.id, createdAt: daysAgo(7) },
    ],
  });
  console.log("✅ Transactions created (20)");

  // ─── 7. Documents (createMany) ────────────────────────
  await prisma.document.createMany({
    data: [
      { name: "Building Insurance Policy 2026", category: "Insurance", relatedTo: "Al Rimal Residence", url: "/documents/insurance-policy-2026.pdf", size: 2_450_000, buildingId: building.id },
      { name: "Annual Budget Report 2025", category: "Financial", relatedTo: "Finance", url: "/documents/annual-budget-2025.pdf", size: 1_830_000, buildingId: building.id },
      { name: "Q1 2026 Financial Statement", category: "Financial", relatedTo: "Finance", url: "/documents/q1-2026-financials.pdf", size: 980_000, buildingId: building.id },
      { name: "Security Contract — Guardian", category: "Contract", relatedTo: "Guardian Security", url: "/documents/guardian-contract.pdf", size: 540_000, buildingId: building.id },
      { name: "Cleaning Contract — Crystal Clean", category: "Contract", relatedTo: "Crystal Clean Services", url: "/documents/crystalclean-contract.pdf", size: 480_000, buildingId: building.id },
      { name: "HVAC Maintenance Agreement", category: "Contract", relatedTo: "Cool Zone HVAC", url: "/documents/coolzone-agreement.pdf", size: 620_000, buildingId: building.id },
      { name: "Civil Defense Fire Safety Certificate", category: "Report", relatedTo: "Civil Defense", url: "/documents/fire-safety-cert.pdf", size: 350_000, buildingId: building.id },
      { name: "Elevator Inspection Report — Feb 2026", category: "Report", relatedTo: "Saudi Lift Engineering", url: "/documents/elevator-inspection-feb26.pdf", size: 1_200_000, buildingId: building.id },
      { name: "Owners' Meeting Minutes — Dec 2025", category: "Report", relatedTo: "Board", url: "/documents/meeting-minutes-dec25.pdf", size: 420_000, buildingId: building.id },
      { name: "Parking Regulations — Updated", category: "Other", relatedTo: "Management", url: "/documents/parking-regulations-v2.pdf", size: 280_000, buildingId: building.id },
    ],
  });
  console.log("✅ Documents created (10)");

  // ─── 8. Activity Logs (createMany) ────────────────────
  await prisma.activityLog.createMany({
    data: [
      { action: "created a maintenance request", entityType: "maintenance", userId: demoOwner.id, createdAt: daysAgo(0) },
      { action: "assigned vendor to request", entityType: "maintenance", userId: demoManager.id, createdAt: daysAgo(0) },
      { action: "published an announcement", entityType: "announcement", userId: demoAdmin.id, createdAt: daysAgo(1) },
      { action: "updated request status to In Progress", entityType: "maintenance", userId: demoManager.id, createdAt: daysAgo(1) },
      { action: "uploaded a document", entityType: "document", userId: demoManager.id, createdAt: daysAgo(2) },
      { action: "approved payment of SAR 12,000", entityType: "transaction", userId: demoAdmin.id, createdAt: daysAgo(2) },
      { action: "created a maintenance request", entityType: "maintenance", userId: owner2.id, createdAt: daysAgo(3) },
      { action: "published an announcement", entityType: "announcement", userId: demoManager.id, createdAt: daysAgo(3) },
      { action: "completed maintenance request", entityType: "maintenance", userId: demoManager.id, createdAt: daysAgo(5) },
      { action: "added a new vendor", entityType: "vendor", userId: demoAdmin.id, createdAt: daysAgo(5) },
      { action: "updated building information", entityType: "building", userId: demoAdmin.id, createdAt: daysAgo(7) },
      { action: "recorded fee payment", entityType: "transaction", userId: demoManager.id, createdAt: daysAgo(7) },
      { action: "rejected maintenance request", entityType: "maintenance", userId: demoManager.id, createdAt: daysAgo(10) },
      { action: "uploaded insurance document", entityType: "document", userId: demoAdmin.id, createdAt: daysAgo(12) },
      { action: "created a maintenance request", entityType: "maintenance", userId: owner3.id, createdAt: daysAgo(14) },
      { action: "approved payment of SAR 3,200", entityType: "transaction", userId: demoAdmin.id, createdAt: daysAgo(15) },
      { action: "published an announcement", entityType: "announcement", userId: demoManager.id, createdAt: daysAgo(18) },
      { action: "updated vendor contract", entityType: "vendor", userId: demoManager.id, createdAt: daysAgo(20) },
      { action: "completed maintenance request", entityType: "maintenance", userId: demoManager.id, createdAt: daysAgo(21) },
      { action: "logged in", entityType: "auth", userId: demoOwner.id, createdAt: daysAgo(0) },
    ],
  });
  console.log("✅ Activity logs created (20)");

  // ─── Done ─────────────────────────────────────────────
  console.log("\n🎉 Demo seed complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Trial Account Login:");
  console.log("  📧  Email:    bofaf78501@niprack.com");
  console.log("  🔑  Password: demo1234");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
