<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Irish Payroll Calculator 2026</title>
    <meta name="description" content="Fast, accurate Irish payroll calculations for 2026. Compute PAYE, USC, and PRSI instantly.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/static/style.css">
</head>
<body>

    <!-- Animated background orbs -->
    <div class="bg-orb orb1"></div>
    <div class="bg-orb orb2"></div>
    <div class="bg-orb orb3"></div>

    <div class="container">

        <!-- Header -->
        <header class="header">
            <div class="header-left">
                <div class="logo">
                    <span class="flag">🇮🇪</span>
                    <div>
                        <h1>Irish Payroll Calculator</h1>
                        <p class="subtitle">Tax Year 2026 &mdash; PAYE · USC · PRSI</p>
                    </div>
                </div>
            </div>
            <div class="header-right">
                <span class="badge">Revenue Compliant</span>
                <span class="disclaimer">For estimation only. Verify with Revenue.</span>
            </div>
        </header>

        <!-- Summary Cards -->
        <div class="stats-grid" id="statsGrid">
            <div class="stat-card" id="card-employees">
                <div class="stat-icon">👥</div>
                <div class="stat-info">
                    <span class="stat-label">Employees</span>
                    <span class="stat-value" id="stat-count">0</span>
                </div>
            </div>
            <div class="stat-card" id="card-gross">
                <div class="stat-icon">💼</div>
                <div class="stat-info">
                    <span class="stat-label">Total Gross</span>
                    <span class="stat-value" id="stat-gross">€0.00</span>
                </div>
            </div>
            <div class="stat-card" id="card-tax">
                <div class="stat-icon">🏛️</div>
                <div class="stat-info">
                    <span class="stat-label">Total Tax (PAYE+USC+PRSI)</span>
                    <span class="stat-value" id="stat-tax">€0.00</span>
                </div>
            </div>
            <div class="stat-card highlight" id="card-net">
                <div class="stat-icon">✅</div>
                <div class="stat-info">
                    <span class="stat-label">Total Net Pay</span>
                    <span class="stat-value" id="stat-net">€0.00</span>
                </div>
            </div>
        </div>

        <!-- Toolbar -->
        <div class="toolbar">
            <div class="toolbar-left">
                <label class="file-btn" for="csvUpload">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    Import CSV
                    <input type="file" id="csvUpload" accept=".csv">
                </label>
                <button class="btn btn-ghost" id="addRowBtn" onclick="addRow()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Employee
                </button>
            </div>
            <div class="toolbar-right">
                <button class="btn btn-ghost" onclick="clearAll()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                    Clear
                </button>
                <button class="btn btn-secondary" onclick="exportCSV()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Export CSV
                </button>
                <button class="btn btn-primary" onclick="calculateAll()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
                    Calculate All
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="table-wrapper">
            <table id="payrollTable">
                <thead>
                    <tr>
                        <th class="col-name">Employee Name</th>
                        <th class="col-pps">PPS Number</th>
                        <th class="col-num">Gross Pay <span class="th-sub">€/yr</span></th>
                        <th class="col-num">Tax Credits <span class="th-sub">€</span></th>
                        <th class="col-num">PAYE <span class="th-sub">€</span></th>
                        <th class="col-num">USC <span class="th-sub">€</span></th>
                        <th class="col-num">PRSI <span class="th-sub">€</span></th>
                        <th class="col-net">Net Pay <span class="th-sub">€</span></th>
                        <th class="col-action"></th>
                    </tr>
                </thead>
                <tbody id="payrollBody"></tbody>
            </table>

            <div class="empty-state" id="emptyState">
                <div class="empty-icon">📋</div>
                <p>No employees yet. Click <strong>Add Employee</strong> or import a CSV.</p>
            </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
            <p>Irish Payroll Calculator 2026 &mdash; PAYE, USC &amp; PRSI rates based on Revenue guidance. Not financial advice.</p>
        </footer>

    </div>

    <!-- Toast -->
    <div class="toast" id="toast"></div>

    <script src="/static/script.js"></script>
</body>
</html>
