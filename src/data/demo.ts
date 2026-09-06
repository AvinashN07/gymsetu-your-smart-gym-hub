// Demo data for a single gym in Hyderabad. Shapes mirror future database tables
// (members, payments, attendance) so this can be swapped for real queries later.

export type MemberStatus = "active" | "expiring" | "expired";
export type PaymentStatus = "paid" | "due" | "overdue";

export type Member = {
  id: string;
  name: string;
  phone: string;
  plan: "Monthly" | "Quarterly" | "6-month" | "Annual";
  planAmount: number;
  branch: string;
  joinedOn: string;
  expiresOn: string;
  status: MemberStatus;
};

export type Payment = {
  id: string;
  memberId: string;
  memberName: string;
  plan: Member["plan"];
  amount: number;
  method: "UPI" | "Cash" | "Card" | "Bank transfer";
  date: string;
  status: PaymentStatus;
};

export type AttendanceRecord = {
  id: string;
  memberId: string;
  memberName: string;
  checkIn: string;
  checkOut: string | null;
  slot: "Morning" | "Evening";
};

export const gym = {
  name: "Iron Yard Fitness",
  branch: "Kukatpally, Hyderabad",
  owner: "Arjun Patil",
  ownerInitials: "AP",
  today: "12 May 2025",
};

export const formatINR = (value: number) =>
  "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const formatCompactINR = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return formatINR(value);
};

export const kpis = {
  activeMembers: 486,
  activeMembersDelta: "+24 this month",
  monthlyRevenue: 342000,
  revenueDelta: "+18.2% vs Apr",
  expiringSoon: 37,
  todaysAttendance: 128,
  attendanceShare: "63% of base",
  pendingPayments: 58400,
  pendingInvoices: 23,
};

export const revenueSeries = [
  { month: "Dec", value: 208000 },
  { month: "Jan", value: 246000 },
  { month: "Feb", value: 231000 },
  { month: "Mar", value: 289000 },
  { month: "Apr", value: 312000 },
  { month: "May", value: 342000 },
];

export const attendanceSeries = [
  { day: "Mon", value: 142 },
  { day: "Tue", value: 128 },
  { day: "Wed", value: 156 },
  { day: "Thu", value: 134 },
  { day: "Fri", value: 168 },
  { day: "Sat", value: 189 },
  { day: "Sun", value: 96 },
];

export const members: Member[] = [
  { id: "GS-1041", name: "Aarav Reddy", phone: "+91 98490 11234", plan: "Annual", planAmount: 36000, branch: "Kukatpally", joinedOn: "04 Jun 2024", expiresOn: "04 Jun 2025", status: "active" },
  { id: "GS-1042", name: "Priya Sharma", phone: "+91 90000 45781", plan: "6-month", planAmount: 12000, branch: "Kukatpally", joinedOn: "12 Dec 2024", expiresOn: "12 Jun 2025", status: "active" },
  { id: "GS-1043", name: "Rahul Naidu", phone: "+91 99590 22110", plan: "Monthly", planAmount: 2500, branch: "Miyapur", joinedOn: "18 Apr 2025", expiresOn: "18 May 2025", status: "expiring" },
  { id: "GS-1044", name: "Meera Chand", phone: "+91 91770 88345", plan: "Annual", planAmount: 36000, branch: "Kukatpally", joinedOn: "22 Jan 2025", expiresOn: "22 Jan 2026", status: "active" },
  { id: "GS-1045", name: "Sai Kiran Goud", phone: "+91 70930 66512", plan: "Quarterly", planAmount: 6500, branch: "Miyapur", joinedOn: "20 Feb 2025", expiresOn: "20 May 2025", status: "expiring" },
  { id: "GS-1046", name: "Fatima Begum", phone: "+91 89850 74120", plan: "Monthly", planAmount: 2500, branch: "Kukatpally", joinedOn: "02 May 2025", expiresOn: "02 Jun 2025", status: "active" },
  { id: "GS-1047", name: "Nikhil Varma", phone: "+91 96760 31908", plan: "6-month", planAmount: 12000, branch: "Kukatpally", joinedOn: "09 Nov 2024", expiresOn: "09 May 2025", status: "expired" },
  { id: "GS-1048", name: "Divya Rao", phone: "+91 93910 55023", plan: "Quarterly", planAmount: 6500, branch: "Miyapur", joinedOn: "14 Mar 2025", expiresOn: "14 Jun 2025", status: "active" },
  { id: "GS-1049", name: "Yashwanth Kumar", phone: "+91 98661 40277", plan: "Monthly", planAmount: 2500, branch: "Kukatpally", joinedOn: "16 Apr 2025", expiresOn: "16 May 2025", status: "expiring" },
  { id: "GS-1050", name: "Sneha Kulkarni", phone: "+91 70325 91864", plan: "Annual", planAmount: 36000, branch: "Kukatpally", joinedOn: "28 Aug 2024", expiresOn: "28 Aug 2025", status: "active" },
  { id: "GS-1051", name: "Imran Shaikh", phone: "+91 90140 27536", plan: "Monthly", planAmount: 2500, branch: "Miyapur", joinedOn: "01 Apr 2025", expiresOn: "01 May 2025", status: "expired" },
  { id: "GS-1052", name: "Harika Mudiraj", phone: "+91 99123 60741", plan: "6-month", planAmount: 12000, branch: "Kukatpally", joinedOn: "05 Feb 2025", expiresOn: "05 Aug 2025", status: "active" },
];

export const payments: Payment[] = [
  { id: "PMT-9081", memberId: "GS-1041", memberName: "Aarav Reddy", plan: "Annual", amount: 36000, method: "UPI", date: "12 May 2025", status: "paid" },
  { id: "PMT-9082", memberId: "GS-1042", memberName: "Priya Sharma", plan: "6-month", amount: 12000, method: "Card", date: "11 May 2025", status: "due" },
  { id: "PMT-9083", memberId: "GS-1043", memberName: "Rahul Naidu", plan: "Monthly", amount: 2500, method: "Cash", date: "02 May 2025", status: "overdue" },
  { id: "PMT-9084", memberId: "GS-1044", memberName: "Meera Chand", plan: "Annual", amount: 36000, method: "Bank transfer", date: "10 May 2025", status: "paid" },
  { id: "PMT-9085", memberId: "GS-1045", memberName: "Sai Kiran Goud", plan: "Quarterly", amount: 6500, method: "UPI", date: "09 May 2025", status: "paid" },
  { id: "PMT-9086", memberId: "GS-1046", memberName: "Fatima Begum", plan: "Monthly", amount: 2500, method: "UPI", date: "08 May 2025", status: "paid" },
  { id: "PMT-9087", memberId: "GS-1047", memberName: "Nikhil Varma", plan: "6-month", amount: 12000, method: "Cash", date: "28 Apr 2025", status: "overdue" },
  { id: "PMT-9088", memberId: "GS-1048", memberName: "Divya Rao", plan: "Quarterly", amount: 6500, method: "UPI", date: "07 May 2025", status: "paid" },
  { id: "PMT-9089", memberId: "GS-1049", memberName: "Yashwanth Kumar", plan: "Monthly", amount: 2500, method: "UPI", date: "06 May 2025", status: "due" },
  { id: "PMT-9090", memberId: "GS-1051", memberName: "Imran Shaikh", plan: "Monthly", amount: 2500, method: "Cash", date: "25 Apr 2025", status: "overdue" },
];

export const attendance: AttendanceRecord[] = [
  { id: "ATT-501", memberId: "GS-1041", memberName: "Aarav Reddy", checkIn: "06:12", checkOut: "07:34", slot: "Morning" },
  { id: "ATT-502", memberId: "GS-1046", memberName: "Fatima Begum", checkIn: "06:28", checkOut: "07:41", slot: "Morning" },
  { id: "ATT-503", memberId: "GS-1050", memberName: "Sneha Kulkarni", checkIn: "06:45", checkOut: "08:02", slot: "Morning" },
  { id: "ATT-504", memberId: "GS-1044", memberName: "Meera Chand", checkIn: "07:05", checkOut: "08:20", slot: "Morning" },
  { id: "ATT-505", memberId: "GS-1052", memberName: "Harika Mudiraj", checkIn: "07:22", checkOut: "08:35", slot: "Morning" },
  { id: "ATT-506", memberId: "GS-1043", memberName: "Rahul Naidu", checkIn: "18:04", checkOut: "19:28", slot: "Evening" },
  { id: "ATT-507", memberId: "GS-1045", memberName: "Sai Kiran Goud", checkIn: "18:31", checkOut: "20:05", slot: "Evening" },
  { id: "ATT-508", memberId: "GS-1048", memberName: "Divya Rao", checkIn: "18:47", checkOut: null, slot: "Evening" },
  { id: "ATT-509", memberId: "GS-1049", memberName: "Yashwanth Kumar", checkIn: "19:12", checkOut: null, slot: "Evening" },
  { id: "ATT-510", memberId: "GS-1042", memberName: "Priya Sharma", checkIn: "19:35", checkOut: null, slot: "Evening" },
];
