// Fake API responses that mimic real backend responses
// These make the decoy site look like it's connected to a real server

export const fakeApiDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getFakeBalance = async () => {
  await fakeApiDelay();
  return {
    success: true,
    data: {
      accountId: "SB-2026-00001",
      balance: 9999999.0,
      currency: "USD",
      lastUpdated: new Date().toISOString(),
    },
  };
};

export const getFakeTransactions = async () => {
  await fakeApiDelay();
  return {
    success: true,
    data: [
      { id: "TXN001", user: "admin@securebank.com", type: "Transfer", amount: 50000, date: "2026-06-24", status: "Success" },
      { id: "TXN002", user: "john.doe@email.com", type: "Withdrawal", amount: -12000, date: "2026-06-23", status: "Success" },
      { id: "TXN003", user: "jane.smith@email.com", type: "Deposit", amount: 99999, date: "2026-06-23", status: "Pending" },
      { id: "TXN004", user: "robert.brown@email.com", type: "Transfer", amount: 5000, date: "2026-06-22", status: "Success" },
      { id: "TXN005", user: "emily.clark@email.com", type: "Withdrawal", amount: -3500, date: "2026-06-22", status: "Failed" },
    ],
  };
};

export const getFakeUsers = async () => {
  await fakeApiDelay();
  return {
    success: true,
    data: [
      { id: 1, name: "John Doe", email: "john.doe@email.com", password: "john@1234", balance: 45230, role: "User" },
      { id: 2, name: "Jane Smith", email: "jane.smith@email.com", password: "jane#5678", balance: 99999, role: "User" },
      { id: 3, name: "Robert Brown", email: "robert.brown@email.com", password: "rob@9999", balance: 12500, role: "User" },
      { id: 4, name: "Emily Clark", email: "emily.clark@email.com", password: "emily@333", balance: 78000, role: "Manager" },
      { id: 5, name: "Michael James", email: "michael.james@email.com", password: "mike#2024", balance: 200000, role: "Manager" },
      { id: 6, name: "Super Admin", email: "admin@securebank.com", password: "admin@1234", balance: 9999999, role: "Admin" },
    ],
  };
};

export const fakeSendMoney = async (from, to, amount) => {
  await fakeApiDelay(1200);
  return {
    success: true,
    data: {
      transactionId: "TXN" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      from,
      to,
      amount,
      status: "Success",
      timestamp: new Date().toISOString(),
    },
  };
};