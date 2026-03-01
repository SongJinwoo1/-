/**
 * محرك المساعد الذكي - Calm Solutions AI
 * إدارة الحجز التفاعلي، فرز الحالات، وحفظ الذاكرة
 */

const aiBot = {
    chatStep: 1,
    patientData: { name: '', phone: '', symptoms: '', priority: 'عادي' },

    // 1. تشغيل البوت والترحيب
    startChat: function() {
        const chatArea = document.getElementById('ai-messages');
        if (!chatArea) return;

        this.addMessage("bot", "مرحباً بك في حلول هادئة Elite ✨. أنا مساعدك الطبي الذكي، ما هو اسمك الكريم؟");
        
        // تفعيل زر الإرسال
        const sendBtn = document.getElementById('bot-send');
        const inputField = document.getElementById('bot-input');
        
        sendBtn.onclick = () => this.handleInput();
        inputField.onkeypress = (e) => { if (e.key === 'Enter') this.handleInput(); };
    },

    // 2. معالجة الإدخال والذكاء الاصطناعي
    handleInput: function() {
        const inputField = document.getElementById('bot-input');
        const val = inputField.value.trim();
        if (!val) return;

        this.addMessage("user", val);
        inputField.value = '';

        setTimeout(() => {
            this.processStep(val);
        }, 600);
    },

    // 3. منطق خطوات الـ 50 ميزة (Logic Stages)
    processStep: function(input) {
        switch(this.chatStep) {
            case 1: // الاسم
                this.patientData.name = input;
                this.addMessage("bot", `تشرفنا يا ${input}. ممكن رقم هاتفك للتواصل؟`);
                this.chatStep = 2;
                break;
            case 2: // الهاتف
                this.patientData.phone = input;
                this.addMessage("bot", "تمام. من فضلك أوصف لي الأعراض اللي بتحس بيها باختصار.");
                this.chatStep = 3;
                break;
            case 3: // فرز الحالات (Triage Algorithm)
                this.patientData.symptoms = input;
                const urgentKeywords = ['دم', 'نزيف', 'ألم شديد', 'حادث', 'تنفس'];
                const isUrgent = urgentKeywords.some(key => input.includes(key));
                
                if (isUrgent) {
                    this.patientData.priority = 'عاجل 🔴';
                    this.addMessage("bot", "⚠️ لاحظت أعراضاً تتطلب سرعة. تم تصنيف حالتك كـ 'عاجل' وسنقوم بتنبيه الطبيب فوراً.");
                } else {
                    this.addMessage("bot", "تم تسجيل الأعراض. جاري تأكيد موعدك...");
                }
                this.saveAppointment();
                this.chatStep = 4;
                break;
            default:
                this.addMessage("bot", "شكراً لك. موعدك محفوظ، هل تريد تعديل أي بيانات؟");
        }
    },

    // 4. حفظ الموعد في قاعدة البيانات المحلية
    saveAppointment: function() {
        let db = JSON.parse(localStorage.getItem('calm_db')) || [];
        const appointment = {
            ...this.patientData,
            date: new Date().toLocaleString('ar-EG'),
            id: Date.now()
        };
        db.push(appointment);
        localStorage.setItem('calm_db', JSON.stringify(db));
        
        setTimeout(() => {
            this.addMessage("bot", `🎉 تم الحجز بنجاح! رقم مرجعك هو: ${appointment.id}`);
        }, 1000);
    },

    // إضافة الرسالة للواجهة
    addMessage: function(sender, text) {
        const chatArea = document.getElementById('ai-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${sender}-msg`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatArea.appendChild(msgDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
};

// ربط البوت بواجهة الـ Elite عند التحميل
function renderEliteUI(container) {
    // الكود الذي كتبناه في core.js سيستدعي aiBot.startChat()
    setTimeout(() => aiBot.startChat(), 100);
}
