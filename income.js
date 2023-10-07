let budgetData = [];
const jsonData = localStorage.getItem("budgetData");

if (jsonData) {
    budgetData = JSON.parse(jsonData);
    showTable_Income();
} else {
    // ถ้าไม่มีข้อมูลใน LocalStorage ให้กำหนดให้ budgetData เป็นอาร์เรย์ว่าง
    localStorage.setItem("budgetData", []);
    budgetData = [];
}

function showTable_Income() {
    let table_income = document.getElementById("table_income");
    for (let i = 0; i < budgetData.length; i++) {
        if (budgetData[i].money > 0) {
            let tr = document.createElement("tr");
            let format_date = new Date(budgetData[i].date_time).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
            tr.innerHTML = `
                <td>${format_date}</td>
                <td>${budgetData[i].money}</td>
                <td>${budgetData[i].description}</td>
                <td><button class="btn btn-danger" onclick="deleteBudget(${i})">ลบ</button></td>
            `;
            table_income.appendChild(tr);
        }
    }
}

function deleteBudget(index) {
    Swal.fire({
        title: 'คุณแน่ใจหรือไม่ที่จะลบรายการนี้?',
        text: "หากลบแล้วจะไม่สามารถกู้คืนได้!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            budgetData.splice(index, 1);
            localStorage.setItem("budgetData", JSON.stringify(budgetData));
            location.reload();
        }
    })
}

function downloadCSV() {
    let csv = "\ufeffวันที่,รายรับ,รายละเอียด\n";
    for (let i = 0; i < budgetData.length; i++) {
        if (budgetData[i].money > 0) {
            let format_date = new Date(budgetData[i].date_time).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
            csv += `${format_date},${budgetData[i].money},${budgetData[i].description}\n`;
        }
    }
    // สร้างลิงค์สำหรับดาวน์โหลดไฟล์
    let hiddenElement = document.createElement('a');
    // กำหนดลิงค์สำหรับดาวน์โหลด
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    // กำหนดชื่อไฟล์
    hiddenElement.target = '_blank';
    hiddenElement.download = 'income.csv';
    // กำหนดให้คลิกที่ลิงค์สำหรับดาวน์โหลดไฟล์
    hiddenElement.click();
}