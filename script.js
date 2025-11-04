let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateDashboard() {
  let income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  let expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  let balance = income - expense;

  document.getElementById("total-income").textContent = `₹${income}`;
  document.getElementById("total-expense").textContent = `₹${expense}`;
  document.getElementById("balance").textContent = `₹${balance}`;
}

function renderHistory() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.className = t.type === "income" ? "income-item" : "expense-item";
    li.innerHTML = `
      ${t.desc} <span>₹${t.amount}</span>
      <button onclick="deleteTransaction(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateDashboard();
  renderHistory();
}

document.getElementById("add-btn").addEventListener("click", () => {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || !amount) {
    alert("Please enter description and amount!");
    return;
  }

  const newTransaction = { desc, amount, type };
  transactions.push(newTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";

  updateDashboard();
  renderHistory();
});

// Initialize
updateDashboard();
renderHistory();