import { PrismaClient, Role, Priority, RequestStatus, PaymentStatus, TransactionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Building
  const building = await prisma.building.create({
    data: {
      name: "Towers A",
      address: "King Fahd Road, Riyadh",
      unitsCount: 120,
    },
  });
  console.log("Created building:", building.name);

  // 2. Users
  const hash = (pw: string) => bcrypt.hashSync(pw, 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@test.com",
      passwordHash: hash("admin123"),
      role: Role.ADMIN,
      buildingId: building.id,
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "Manager User",
      email: "manager@test.com",
      passwordHash: hash("manager123"),
      role: Role.MANAGER,
      buildingId: building.id,
    },
  });

  const owner = await prisma.user.create({
    data: {
      name: "Owner User",
      email: "owner@test.com",
      passwordHash: hash("owner123"),
      role: Role.OWNER,
      unitNumber: "302",
      buildingId: building.id,
    },
  });
  console.log("Created users: admin, manager, owner");

  // 3. Vendors
  const [secureWatch, liftTech, cleanPro] = await Promise.all([
    prisma.vendor.create({
      data: {
        name: "SecureWatch",
        category: "Security",
        rating: 4.5,
        email: "contact@securewatch.com",
        phone: "+966501234567",
        description: "Professional security services",
      },
    }),
    prisma.vendor.create({
      data: {
        name: "LiftTech",
        category: "Electrical",
        rating: 4.2,
        email: "info@lifttech.com",
        phone: "+966507654321",
        description: "Elevator and electrical maintenance",
      },
    }),
    prisma.vendor.create({
      data: {
        name: "CleanPro",
        category: "Cleaning",
        rating: 4.8,
        email: "hello@cleanpro.com",
        phone: "+966509876543",
        description: "Premium cleaning services",
      },
    }),
  ]);
  console.log("Created vendors: SecureWatch, LiftTech, CleanPro");

  // 4. Maintenance Requests
  await Promise.all([
    prisma.maintenanceRequest.create({
      data: {
        title: "Broken elevator door",
        description: "The elevator door on the 3rd floor is not closing properly",
        location: "3rd Floor - Elevator B",
        category: "Electrical",
        priority: Priority.HIGH,
        status: RequestStatus.IN_PROGRESS,
        paymentStatus: PaymentStatus.UNPAID,
        amount: 1500.0,
        vendorId: liftTech.id,
        createdById: owner.id,
        buildingId: building.id,
      },
    }),
    prisma.maintenanceRequest.create({
      data: {
        title: "Water leak in parking",
        description: "There is a water leak in parking level B2 near spot 45",
        location: "Parking B2",
        category: "Plumbing",
        priority: Priority.HIGH,
        status: RequestStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        createdById: owner.id,
        buildingId: building.id,
      },
    }),
    prisma.maintenanceRequest.create({
      data: {
        title: "AC maintenance",
        description: "Annual AC servicing for common areas",
        location: "Common Areas",
        category: "HVAC",
        priority: Priority.MEDIUM,
        status: RequestStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
        amount: 3200.0,
        vendorId: cleanPro.id,
        createdById: manager.id,
        buildingId: building.id,
      },
    }),
    prisma.maintenanceRequest.create({
      data: {
        title: "Security camera replacement",
        description: "Camera at entrance gate is malfunctioning",
        location: "Main Entrance",
        category: "Security",
        priority: Priority.MEDIUM,
        status: RequestStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        vendorId: secureWatch.id,
        createdById: manager.id,
        buildingId: building.id,
      },
    }),
    prisma.maintenanceRequest.create({
      data: {
        title: "Garden lighting fix",
        description: "Several garden lights are not working",
        location: "Garden Area",
        category: "Electrical",
        priority: Priority.LOW,
        status: RequestStatus.REJECTED,
        paymentStatus: PaymentStatus.UNPAID,
        createdById: owner.id,
        buildingId: building.id,
      },
    }),
  ]);
  console.log("Created 5 maintenance requests");

  // 5. Announcements
  await Promise.all([
    prisma.announcement.create({
      data: {
        title: "Annual General Meeting",
        description: "The annual general meeting will be held on March 25th at 7 PM in the main hall. All owners are encouraged to attend.",
        priority: Priority.HIGH,
        buildingId: building.id,
        createdById: admin.id,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "Water Supply Maintenance",
        description: "Water supply will be temporarily interrupted on March 20th from 9 AM to 12 PM for routine maintenance.",
        priority: Priority.MEDIUM,
        buildingId: building.id,
        createdById: manager.id,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "New Parking Regulations",
        description: "Please note the updated parking regulations effective April 1st. Each unit is allocated 2 parking spots.",
        priority: Priority.LOW,
        buildingId: building.id,
        createdById: manager.id,
      },
    }),
  ]);
  console.log("Created 3 announcements");

  // 6. Transactions
  await Promise.all([
    prisma.transaction.create({
      data: {
        description: "Monthly maintenance fee",
        amount: 25000.0,
        category: "Maintenance",
        status: TransactionStatus.PAID,
        buildingId: building.id,
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Security service payment",
        amount: 8500.0,
        category: "Security",
        status: TransactionStatus.PENDING,
        buildingId: building.id,
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Elevator repair invoice",
        amount: 4200.0,
        category: "Repairs",
        status: TransactionStatus.UNPAID,
        buildingId: building.id,
      },
    }),
  ]);
  console.log("Created 3 transactions");

  // 7. Documents
  await Promise.all([
    prisma.document.create({
      data: {
        name: "Building Insurance Policy",
        category: "Insurance",
        relatedTo: "Building A",
        url: "/documents/insurance-policy.pdf",
        size: 2048000,
        buildingId: building.id,
      },
    }),
    prisma.document.create({
      data: {
        name: "Annual Budget Report 2025",
        category: "Financial",
        relatedTo: "Finance Department",
        url: "/documents/budget-2025.pdf",
        size: 1536000,
        buildingId: building.id,
      },
    }),
  ]);
  console.log("Created 2 documents");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
