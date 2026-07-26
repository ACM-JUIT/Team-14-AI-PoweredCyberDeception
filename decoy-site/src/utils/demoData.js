// Demo-ready fake data for PhantomShield presentation

export const DEMO_USERS = [
  { id: 1, name: "John Doe", email: "john.doe@securebank.com", password: "john@1234", balance: "$45,230.00", role: "User", lastLogin: "Today 08:32 AM" },
  { id: 2, name: "Jane Smith", email: "jane.smith@securebank.com", password: "jane#5678", balance: "$99,999.00", role: "User", lastLogin: "Today 09:15 AM" },
  { id: 3, name: "Robert Brown", email: "robert.brown@securebank.com", password: "rob@9999", balance: "$12,500.00", role: "User", lastLogin: "Yesterday" },
  { id: 4, name: "Emily Clark", email: "emily.clark@securebank.com", password: "emily@333", balance: "$78,000.00", role: "Manager", lastLogin: "Today 07:45 AM" },
  { id: 5, name: "Michael James", email: "michael.james@securebank.com", password: "mike#2024", balance: "$200,000.00", role: "Manager", lastLogin: "Today 10:00 AM" },
  { id: 6, name: "Super Admin", email: "admin@securebank.com", password: "admin@1234", balance: "$9,999,999.00", role: "Admin", lastLogin: "Just now" },
];

export const DEMO_TRANSACTIONS = [
  { id: "TXN001", user: "admin@securebank.com", type: "Transfer", amount: "+$50,000", date: "Today 09:42 AM", status: "Success" },
  { id: "TXN002", user: "john.doe@securebank.com", type: "Withdrawal", amount: "-$12,000", date: "Today 08:30 AM", status: "Success" },
  { id: "TXN003", user: "jane.smith@securebank.com", type: "Deposit", amount: "+$99,999", date: "Yesterday 11:20 PM", status: "Pending" },
  { id: "TXN004", user: "robert.brown@securebank.com", type: "Transfer", amount: "+$5,000", date: "Yesterday 06:15 PM", status: "Success" },
  { id: "TXN005", user: "emily.clark@securebank.com", type: "Withdrawal", amount: "-$3,500", date: "2 days ago", status: "Failed" },
  { id: "TXN006", user: "admin@securebank.com", type: "Transfer", amount: "+$200,000", date: "2 days ago", status: "Success" },
];

export const DEMO_SYSTEM_INFO = {
  server: "securebank-prod-01",
  database: "Connected",
  totalUsers: "12,483",
  adminPassword: "admin@1234",
  apiKey: "sk-prod-9x8y7z6w5v4u3t2s",
  lastBackup: "Today 03:00 AM",
  uptime: "99.9%",
  version: "v3.2.1",
};