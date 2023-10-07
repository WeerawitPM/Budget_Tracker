let budgetData = [];
const jsonData = localStorage.getItem("budgetData");

if (jsonData) {
  budgetData = JSON.parse(jsonData);
  showBudget();
} else {
  // ถ้าไม่มีข้อมูลใน LocalStorage ให้กำหนดให้ budgetData เป็นอาร์เรย์ว่าง
  localStorage.setItem("budgetData", []);
  budgetData = [];
}

function addBudget() {
  let date_time = document.getElementById("date_time").value;
  let money = document.getElementById("money").value;
  let description = document.getElementById("description").value;

  budgetData.push({
    date_time,
    money,
    description,
  });

  localStorage.setItem("budgetData", JSON.stringify(budgetData));
  showBudget();
}

function showBudget() {
  let income = document.getElementById("income_value");
  let income_value = 0;
  let expense = document.getElementById("expense_value");
  let expense_value = 0;

  for (let i = 0; i < budgetData.length; i++) {
    if (budgetData[i].money > 0) {
      income_value += parseInt(budgetData[i].money);
    } else {
      expense_value -= parseInt(budgetData[i].money);
    }
  }

  income.innerText = "฿" + income_value;
  expense.innerText = "฿" + expense_value;
}