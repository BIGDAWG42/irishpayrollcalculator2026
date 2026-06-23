document.addEventListener('DOMContentLoaded', function() {
    let employees = [];

    // Functions will be assigned to window after definition

function renderTable() {
    const tbody = document.querySelector('#payrollTable tbody');
    tbody.innerHTML = '';
    employees.forEach((emp, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input value="${emp.name || ''}" onchange="updateEmp(${i}, 'name', this.value)" /></td>
            <td><input value="${emp.pps || ''}" onchange="updateEmp(${i}, 'pps', this.value)" /></td>
            <td><input type="number" step="0.01" value="${emp.gross_pay || 0}" onchange="updateEmp(${i}, 'gross_pay', parseFloat(this.value) || 0)" /></td>
            <td><input type="number" step="0.01" value="${emp.tax_credits || 0}" onchange="updateEmp(${i}, 'tax_credits', parseFloat(this.value) || 0)" /></td>
            <td class="calc paye">0.00</td>
            <td class="calc usc">0.00</td>
            <td class="calc prsi">0.00</td>
            <td class="calc net">0.00</td>
        `;
        tbody.appendChild(row);
    });
}

function updateEmp(i, field, value) {
    employees[i][field] = value;
    if (['gross_pay', 'tax_credits'].includes(field)) {
        calculateRow(i);
    }
}

function calculateRow(i) {
    // Client-side preview (full calc on server)
    const emp = employees[i];
    const gross = parseFloat(emp.gross_pay) || 0;
    const row = document.querySelectorAll('#payrollTable tbody tr')[i];
    if (row) {
        const netCell = row.querySelector('.net') || row.querySelectorAll('td')[7];
        if (netCell) netCell.textContent = gross.toFixed(2);
    }
}

function addRow() {
    employees.push({name: '', pps: '', gross_pay: 0, tax_credits: 0, srcop: 44000});
    renderTable();
}

async function calculateAll() {
    try {
        const res = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({employees: employees})
        });
        const data = await res.json();
        
        // Update table with server results - safer
        const rows = document.querySelectorAll('#payrollTable tbody tr');
        data.employees.forEach((result, i) => {
            const row = rows[i];
            if (row) {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 8) {
                    cells[4].textContent = (result.paye || 0).toFixed(2);
                    cells[5].textContent = (result.usc || 0).toFixed(2);
                    cells[6].textContent = (result.prsi || 0).toFixed(2);
                    cells[7].textContent = (result.net_pay || 0).toFixed(2);
                }
            }
        });
        
        // Show summary
        const summaryDiv = document.getElementById('summary');
        if (!summaryDiv) return;
        const s = data.summary;
        summaryDiv.innerHTML = `
            <strong>Summary for ${s.total_employees} employees:</strong><br>
            Total Gross: €${s.total_gross} | 
            Total PAYE: €${s.total_paye} | 
            Total USC: €${s.total_usc} | 
            Total PRSI: €${s.total_prsi} | 
            Employer PRSI: €${s.total_employer_prsi} | 
            <span style="color:green">Total Net Pay: €${s.total_net}</span>
        `;
        
    } catch (e) {
        alert('Calculation error: ' + e.message);
    }
}

function exportCSV() {
    fetch('/export_csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({employees: employees})
    }).then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'irish_payroll.csv';
        a.click();
      });
}

function clearAll() {
    if (confirm('Clear all employees?')) {
        employees = [];
        renderTable();
        const summaryDiv = document.getElementById('summary');
        if (summaryDiv) summaryDiv.innerHTML = '';
    }
}

// CSV Upload - Improved for mock CSV
document.getElementById('csvUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        const text = ev.target.result.trim();
        const rows = text.split('\n').map(r => r.split(',').map(cell => cell.trim()));
        employees = [];
        
        // Find header indices (flexible)
        const header = rows[0].map(h => h.toLowerCase());
        const nameIdx = header.findIndex(h => h.includes('name') || h.includes('full'));
        const ppsIdx = header.findIndex(h => h.includes('pps'));
        const grossIdx = header.findIndex(h => h.includes('gross'));
        const taxIdx = header.findIndex(h => h.includes('tax'));
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length > 1 && row[0]) {
                employees.push({
                    name: (nameIdx >= 0 ? row[nameIdx] : row[1] || ''),
                    pps: (ppsIdx >= 0 ? row[ppsIdx] : row[2] || ''),
                    gross_pay: parseFloat(grossIdx >= 0 ? row[grossIdx] : row[4]) || 0,
                    tax_credits: parseFloat(taxIdx >= 0 ? row[taxIdx] : row[5]) || 0,
                    srcop: 44000
                });
            }
        }
        
        if (employees.length === 0) {
            alert("No valid data found in CSV. Check format.");
            return;
        }
        
        renderTable();
        calculateAll();  // Auto-calculate after upload
    };
    reader.readAsText(file);
});

// Initial row
addRow();

// Make functions global for HTML onclick handlers
window.addRow = addRow;
window.calculateAll = calculateAll;
window.exportCSV = exportCSV;
window.clearAll = clearAll;
window.updateEmp = updateEmp;

});

