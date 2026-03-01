/**
 * لوحة تحكم الطبيب - Calm Solutions Admin
 * إدارة المواعيد، الإحصائيات الحية، وتصدير التقارير
 */

const adminDashboard = {
    
    // 1. تشغيل لوحة الإدارة
    init: function() {
        const adminBtn = document.getElementById('admin-login-btn');
        if (adminBtn) {
            adminBtn.onclick = () => this.verifyAccess();
        }
    },

    // 2. التحقق من صلاحية الدخول (Security Gate)
    verifyAccess: function() {
        const password = prompt("أدخل كلمة مرور الطبيب (للشرح: 1234):");
        if (password === "1234") {
            this.renderDashboard();
        } else {
            alert("❌ عذراً، كلمة المرور خاطئة. تم تسجيل محاولة الدخول.");
        }
    },

    // 3. بناء الواجهة برمجياً
    renderDashboard: function() {
        const renderArea = document.getElementById('render-area');
        const db = JSON.parse(localStorage.getItem('calm_db')) || [];
        
        // حساب الإحصائيات
        const total = db.length;
        const urgent = db.filter(a => a.priority.includes('عاجل')).length;

        renderArea.innerHTML = `
            <div class="admin-panel-container animate-fade">
                <div class="stats-grid">
                    <div class="stat-card"><h3>إجمالي الحجوزات</h3><p>${total}</p></div>
                    <div class="stat-card urgent-stat"><h3>حالات الطوارئ 🔴</h3><p>${urgent}</p></div>
                </div>

                <div class="data-table-wrapper">
                    <div class="table-header">
                        <h2>جدول المواعيد (Alt+H للتخفي)</h2>
                        <button id="export-btn" class="export-btn">تصدير Excel 📊</button>
                    </div>
                    <table class="appointments-table">
                        <thead>
                            <tr><th>المريض</th><th>الهاتف</th><th>الأولوية</th><th>التاريخ</th></tr>
                        </thead>
                        <tbody>
                            ${this.generateTableRows(db)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // تفعيل زر التصدير
        document.getElementById('export-btn').onclick = () => this.exportToCSV(db);
    },

    // توليد صفوف الجدول
    generateTableRows: function(data) {
        if (data.length === 0) return '<tr><td colspan="4">لا يوجد مواعيد مسجلة حتى الآن.</td></tr>';
        return data.map(app => `
            <tr>
                <td class="patient-data">${app.name}</td>
                <td>${app.phone}</td>
                <td style="color: ${app.priority.includes('عاجل') ? 'red' : 'inherit'}">${app.priority}</td>
                <td>${app.date}</td>
            </tr>
        `).join('');
    },

    // 4. ميزة تصدير البيانات (Excel/CSV Export)
    exportToCSV: function(data) {
        if (data.length === 0) return alert("لا يوجد بيانات لتصديرها.");
        
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + "الاسم,الهاتف,الأولوية,التاريخ\n";
        data.forEach(row => {
            csvContent += `${row.name},${row.phone},${row.priority},${row.date}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "مواعيد_حلول_هادئة.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// تشغيل النظام
adminDashboard.init();
