/**
 * نظام الأمان المتقدم - Calm Solutions Elite
 * يحمي بيانات المرضى ويمنع المتطفلين من فحص الكود
 */

(function() {
    // التأكد من أن الميزة تعمل فقط في النسخة الاحترافية
    if (typeof IS_PREMIUM === 'undefined' || !IS_PREMIUM) return;

    // 1. منع النقر الأيمن (Disable Right Click)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.warn("🔒 نظام الحماية: النقر الأيمن معطل لحماية البيانات.");
    });

    // 2. مراقبة لوحة المفاتيح (Anti-F12 & Alt+H)
    document.addEventListener('keydown', (e) => {
        
        // منع F12 (أدوات المطور)
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            alert('🔒 تنبيه أمني: أدوات الفحص مغلقة بقرار إداري.');
        }

        // منع Ctrl+U (عرض الكود المصدري)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
        }

        // منع Ctrl+Shift+I (فتح الـ Inspector)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
            e.preventDefault();
        }

        // 3. وضع التخفي السري (Secret Privacy Mode - Alt+H)
        // لو الطبيب ضغط Alt + H، البيانات الحساسة تختفي فوراً (Blur)
        if (e.altKey && (e.key === 'h' || e.key === 'H' || e.key === 'ا')) {
            e.preventDefault();
            togglePrivacyBlur();
        }
    });

    // دالة التعتيم (Blur Logic)
    function togglePrivacyBlur() {
        const sensitiveElements = document.querySelectorAll('.patient-data, td, .messages-area');
        sensitiveElements.forEach(el => {
            if (el.style.filter === 'blur(10px)') {
                el.style.filter = 'none';
            } else {
                el.style.filter = 'blur(10px)';
                el.style.transition = 'filter 0.3s ease';
            }
        });
        console.log("🕵️ وضع التخفي السري تم تفعيله/تعطيله.");
    }

})();
