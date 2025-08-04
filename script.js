document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const generateBtn = document.getElementById('generate-btn');
    const loadingSection = document.getElementById('loading-section');
    const resultsSection = document.getElementById('results-section');
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    analyzeBtn.addEventListener('click', function() {
        const postUrl = document.getElementById('post-url').value;
        if (!postUrl) {
            alert('กรุณากรอก URL หรือ Post ID ของโพสต์ Facebook');
            return;
        }
        
        // จำลองการโหลดข้อมูล
        loadingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        
        setTimeout(function() {
            loadingSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 2000);
    });
    
    generateBtn.addEventListener('click', function() {
        const postUrl = document.getElementById('post-url').value;
        if (!postUrl) {
            alert('กรุณากรอก URL หรือ Post ID ของโพสต์ Facebook');
            return;
        }
        
        // จำลองการโหลดข้อมูล
        loadingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        
        setTimeout(function() {
            loadingSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 3000);
    });
    
    // เพิ่มฟังก์ชันคัดลอกคำตอบ
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const responseContent = this.previousElementSibling;
            const textArea = document.createElement('textarea');
            textArea.value = responseContent.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // แสดงข้อความยืนยันการคัดลอก
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> คัดลอกแล้ว!';
            button.style.background = '#2ecc71';
            
            setTimeout(function() {
                button.innerHTML = originalText;
                button.style.background = '#4a90e2';
            }, 2000);
        });
    });
});
