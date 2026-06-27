const expenseForm = document.querySelector("#expense-form");
const expName = document.querySelector("#expense-name");
const expAmount = document.querySelector("#expense-amount");
const expDays = document.querySelector("#days");
const expMonth = document.querySelector("#Month");
const expList = document.querySelector("#expense-list");
const balanceDisplay = document.querySelector("#balance");
const incomeDisplay = document.querySelector("#income");
const expensesDisplay = document.querySelector("#expenses");
const listCount = document.querySelector("#list-count");
const sidebarTotal = document.querySelector("#sidebar-month-total");
const sidebarEntries = document.querySelector("#sidebar-entries");

let totalBalance = 0;
let totalExpenses = 0;
let entryCount = 0;

function fmt(amount) {
    return "₹" + Math.abs(amount).toFixed(2);
}

function updateSummary() {
    balanceDisplay.textContent = (totalBalance < 0 ? "−" : "") + fmt(totalBalance);
    expensesDisplay.textContent = fmt(totalExpenses);
    listCount.textContent = entryCount + (entryCount === 1 ? " item" : " items");
    sidebarTotal.textContent = fmt(totalExpenses);
    sidebarEntries.textContent = entryCount;
}

expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = expName.value.trim();
    const amount = parseFloat(expAmount.value) || 0;
    const day = expDays.value;
    const month = expMonth.value;

    // Remove empty state if present
    const empty = expList.querySelector(".empty-state");
    if (empty) empty.remove();

    const li = document.createElement("li");
    li.innerHTML = `
        <div class="li-left">
            <span class="li-name">${name}</span>
            <span class="li-meta">${day}, ${month}</span>
        </div>
        <span class="li-amount">−${fmt(amount)}</span>
    `;
    expList.prepend(li);

    totalExpenses += amount;
    totalBalance -= amount;
    entryCount++;

    updateSummary();
    expenseForm.reset();
});