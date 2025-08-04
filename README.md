<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Facebook Comment Assistant</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background: linear-gradient(135deg, #4267B2, #898F9C);
            color: #333;
            min-height: 100vh;
            padding: 20px;
        }      
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            padding: 30px 0;
            color: white;
        } 
        header h1 {
            font-size: 2.8rem;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }        
        header p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto;
            opacity: 0.9;
        }        
        .card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            overflow: hidden;
            margin-bottom: 30px;
        }      
        .card-header {
            background: #3b5998;
            color: white;
            padding: 20px;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
        }        
        .card-header i {
            margin-right: 12px;
            font-size: 1.8rem;
        }        
        .card-body {
            padding: 30px;
        }        
        .input-group {
            margin-bottom: 25px;
        }        
        .input-group label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: #3b5998;
            font-size: 1.1rem;
        }       
        .input-group input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }        
        .input-group input:focus {
            border-color: #3b5998;
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 89, 152, 0.2);
        }        
        .input-group .hint {
            margin-top: 8px;
            color: #666;
            font-size: 0.9rem;
        }        
        .btn {
            background: #3b5998;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }        
        .btn i {
            margin-right: 8px;
        }        
        .btn:hover {
            background: #324b80;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }        
        .btn:active {
            transform: translateY(0);
        }        
        .btn-generate {
            background: #25D366;
            margin-left: 15px;
        }        
        .btn-generate:hover {
            background: #20ba59;
        }        
        .btn-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }        
        .comments-section {
            margin-top: 40px;
        }        
        .comment {
            background: #f0f2f5;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 4px solid #3b5998;
        }        
        .comment-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }        
        .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #3b5998;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
            margin-right: 15px;
        }        
        .user-info {
            flex: 1;
        }        
        .user-name {
            font-weight: 600;
            color: #3b5998;
        }        
        .comment-time {
            color: #777;
            font-size: 0.9rem;
        }        
        .comment-content {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #333;
        }        
        .ai-response {
            background: #e7f3ff;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            border-left: 4px solid #4a90e2;
            position: relative;
        }        
        .response-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            color: #4a90e2;
            font-weight: 600;
        }        
        .response-header i {
            margin-right: 10px;
            font-size: 1.3rem;
        }        
        .response-content {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #333;
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }       
        .copy-btn {
            background: #4a90e2;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
        }       
        .copy-btn i {
            margin-right: 5px;
        }        
        .copy-btn:hover {
            background: #3a7bc8;
        }        
        .loading {
            text-align: center;
            padding: 40px;
            color: #3b5998;
        }        
        .loading i {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: spin 1.5s linear infinite;
        }        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }        
        .hidden {
            display: none;
        }        
        .post-preview {
            background: #f0f2f5;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }        
        .post-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }        
        .post-content {
            font-size: 1.1rem;
            line-height: 1.6;
        }        
        .post-stats {
            display: flex;
            margin-top: 15px;
            color: #606770;
            font-size: 0.9rem;
        }        
        .post-stat {
            margin-right: 20px;
            display: flex;
            align-items: center;
        }        
        .post-stat i {
            margin-right: 5px;
        }        
        .footer {
            text-align: center;
            color: white;
            padding: 30px 0;
            font-size: 0.9rem;
            opacity: 0.8;
        }        
        @media (max-width: 768px) {
            header h1 {
                font-size: 2.2rem;
            }            
            .btn-container {
                flex-direction: column;
            }           
            .btn {
                width: 100%;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1><i class="fab fa-facebook"></i> AI Facebook Comment Assistant</h1>
            <p>ป้อนลิงก์โพสต์ Facebook แล้วให้ AI ช่วยสร้างคำตอบคอมเมนต์ที่เหมาะสมและเป็นมืออาชีพ</p>
        </header>        
        <div class="card">
            <div class="card-header">
                <i class="fas fa-link"></i>
                <span>กรอกข้อมูลโพสต์ Facebook</span>
            </div>
            <div class="card-body">
                <div class="input-group">
                    <label for="post-url">URL โพสต์ Facebook</label>
                    <input type="text" id="post-url" placeholder="https://www.facebook.com/username/posts/1234567890" value="https://www.facebook.com/ExamplePage/posts/101010101010">
                    <div class="hint">หรือคุณสามารถใช้ Post ID เช่น: 1234567890_1234567890</div>
                </div>                
                <div class="input-group">
                    <label for="page-type">ประเภทเพจของคุณ</label>
                    <select id="page-type" class="input">
                        <option value="business">ธุรกิจ/บริษัท</option>
                        <option value="personal">ส่วนตัว</option>
                        <option value="brand">แบรนด์/สินค้า</option>
                        <option value="influencer">อินฟลูเอนเซอร์</option>
                        <option value="community">ชุมชน/กลุ่ม</option>
                    </select>
                </div>                
                <div class="input-group">
                    <label for="tone">โทนคำตอบที่ต้องการ</label>
                    <select id="tone" class="input">
                        <option value="friendly">เป็นกันเอง</option>
                        <option value="professional">มืออาชีพ</option>
                        <option value="casual">สบายๆ</option>
                        <option value="enthusiastic">กระตือรือร้น</option>
                        <option value="supportive">ให้การสนับสนุน</option>
                    </select>
                </div>                
                <div class="btn-container">
                    <button id="analyze-btn" class="btn">
                        <i class="fas fa-search"></i> วิเคราะห์โพสต์
                    </button>
                    <button id="generate-btn" class="btn btn-generate">
                        <i class="fas fa-robot"></i> สร้างคำตอบด้วย AI
                    </button>
                </div>
            </div>
        </div>        
        <div id="loading-section" class="loading hidden">
            <i class="fas fa-spinner"></i>
            <h2>AI กำลังสร้างคำตอบที่เหมาะสมให้กับคุณ...</h2>
            <p>กรุณารอสักครู่</p>
        </div>        
        <div id="results-section" class="hidden">
            <div class="card">
                <div class="card-header">
                    <i class="fas fa-file-alt"></i>
                    <span>ตัวอย่างโพสต์</span>
                </div>
                <div class="card-body">
                    <div class="post-preview">
                        <div class="post-header">
                            <div class="avatar">EP</div>
                            <div>
                                <div class="user-name">Example Page</div>
                                <div class="comment-time">โพสต์เมื่อ 2 ชั่วโมงที่แล้ว</div>
                            </div>
                        </div>
                        <div class="post-content">
                            <p>🚀 เปิดตัวผลิตภัณฑ์ใหม่ของเรา! SuperTech Pro - อุปกรณ์ล้ำสมัยที่ช่วยให้ชีวิตคุณง่ายขึ้นด้วยเทคโนโลยี AI</p>
                            <p>💡 คุณสมบัติเด่น:</p>
                            <ul>
                                <li>ประมวลผลเร็วขึ้น 200%</li>
                                <li>ใช้งานง่ายด้วยระบบสัมผัส</li>
                                <li>แบตเตอรี่ใช้งานได้นาน 48 ชั่วโมง</li>
                                <li>ราคาพิเศษเพียง 5,990 บาท ในช่วงเปิดตัว 2 สัปดาห์แรก!</li>
                            </ul>
                            <p>#SuperTechPro #NewProduct #TechInnovation</p>
                        </div>
                        <div class="post-stats">
                            <div class="post-stat"><i class="far fa-thumbs-up"></i> 245</div>
                            <div class="post-stat"><i class="far fa-comment"></i> 38 คอมเมนต์</div>
                            <div class="post-stat"><i class="far fa-share-square"></i> 12 แชร์</div>
                        </div>
                    </div>
                </div>
            </div>            
            <div class="comments-section">
                <h2 style="color: white; margin-bottom: 20px;">คำตอบที่สร้างโดย AI</h2>                
                <div class="comment">
                    <div class="comment-header">
                        <div class="avatar">S</div>
                        <div>
                            <div class="user-name">สมชาย ใจดี</div>
                            <div class="comment-time">คอมเมนต์เมื่อ 1 ชั่วโมงที่แล้ว</div>
                        </div>
                    </div>
                    <div class="comment-content">
                        ราคาเริ่มต้นเท่าไหร่ครับ และมีโปรโมชั่นอะไรบ้าง?
                    </div>
                    <div class="ai-response">
                        <div class="response-header">
                            <i class="fas fa-robot"></i>
                            <span>คำตอบแนะนำโดย AI</span>
                        </div>
                        <div class="response-content">
                            สวัสดีค่ะคุณสมชาย 😊 ผลิตภัณฑ์ SuperTech Pro ราคาเริ่มต้นเพียง 5,990 บาทเท่านั้นค่ะ ในช่วงโปรโมชั่นเปิดตัว 2 สัปดาห์แรกนี้ เรามีบริการจัดส่งฟรีทั่วประเทศ พร้อมรับประกันสินค้า 1 ปีเต็ม! หากมีข้อสงสัยเพิ่มเติมสามารถสอบถามได้เลยนะคะ
                        </div>
                        <button class="copy-btn">
                            <i class="far fa-copy"></i> คัดลอกคำตอบ
                        </button>
                    </div>
                </div>                
                <div class="comment">
                    <div class="comment-header">
                        <div class="avatar">N</div>
                        <div>
                            <div class="user-name">นิตยา เทคโนโลยี</div>
                            <div class="comment-time">คอมเมนต์เมื่อ 45 นาทีที่แล้ว</div>
                        </div>
                    </div>
                    <div class="comment-content">
                        สินค้ามีจำหน่ายที่ร้านด้วยไหม? หรือต้องสั่งออนไลน์เท่านั้น?
                    </div>
                    <div class="ai-response">
                        <div class="response-header">
                            <i class="fas fa-robot"></i>
                            <span>คำตอบแนะนำโดย AI</span>
                        </div>
                        <div class="response-content">
                            สวัสดีค่ะคุณนิตยา 🙌 ตอนนี้สินค้าสามารถสั่งซื้อออนไลน์ได้ที่เว็บไซต์ของเรา www.supertech-store.com ส่วนในร้านค้าจะเริ่มจำหน่ายในอีก 2 สัปดาห์ข้างหน้านะคะ เราจะแจ้งให้ทราบอีกทีนะคะเมื่อสินค้าพร้อมจำหน่ายที่ร้าน!
                        </div>
                        <button class="copy-btn">
                            <i class="far fa-copy"></i> คัดลอกคำตอบ
                        </button>
                    </div>
                </div>                
                <div class="comment">
                    <div class="comment-header">
                        <div class="avatar">T</div>
                        <div>
                            <div class="user-name">ธนวัฒน์ นักรีวิว</div>
                            <div class="comment-time">คอมเมนต์เมื่อ 30 นาทีที่แล้ว</div>
                        </div>
                    </div>
                    <div class="comment-content">
                        ผมสนใจรีวิวสินค้านี้ครับ มีข้อมูลสเปคแบบละเอียดไหมครับ?
                    </div>
                    <div class="ai-response">
                        <div class="response-header">
                            <i class="fas fa-robot"></i>
                            <span>คำตอบแนะนำโดย AI</span>
                        </div>
                        <div class="response-content">
                            สวัสดีค่ะคุณธนวัฒน์ 😊 ขอบคุณที่สนใจสินค้าของเรานะคะ สามารถดูสเปคแบบละเอียดได้ที่ลิงก์นี้เลยค่ะ: [ลิงก์สเปคผลิตภัณฑ์] นอกจากนี้เรายังมีวิดีโอสาธิตการใช้งานที่ช่อง YouTube ของเราด้วยนะคะ หากมีข้อสงสัยเพิ่มเติมยินดีตอบคำถามตลอดเวลาค่ะ!
                        </div>
                        <button class="copy-btn">
                            <i class="far fa-copy"></i> คัดลอกคำตอบ
                        </button>
                    </div>
                </div>                
                <div class="comment">
                    <div class="comment-header">
                        <div class="avatar">P</div>
                        <div>
                            <div class="user-name">พรทิพย์ ลูกค้าประจำ</div>
                            <div class="comment-time">คอมเมนต์เมื่อ 15 นาทีที่แล้ว</div>
                        </div>
                    </div>
                    <div class="comment-content">
                        ของเก่าที่ซื้อเมื่อเดือนที่แล้วมีปัญหานิดหน่อยค่ะ จะมีบริการอัพเกรดให้ไหม?
                    </div>
                    <div class="ai-response">
                        <div class="response-header">
                            <i class="fas fa-robot"></i>
                            <span>คำตอบแนะนำโดย AI</span>
                        </div>
                        <div class="response-content">
                            สวัสดีค่ะคุณพรทิพย์ 😊 ขอบคุณที่ติดต่อเรานะคะ สำหรับผลิตภัณฑ์รุ่นก่อนหน้านี้ เรามีโปรแกรมอัพเกรดพิเศษสำหรับลูกค้าประจำค่ะ กรุณาส่งข้อความส่วนตัว (Inbox) มาให้เราพร้อมรายละเอียดปัญหา เราจะจัดทีมงานติดต่อกลับไปภายใน 24 ชั่วโมงเพื่อดูแลให้ค่ะ
                        </div>
                        <button class="copy-btn">
                            <i class="far fa-copy"></i> คัดลอกคำตอบ
                        </button>
                    </div>
                </div>
            </div>
        </div>        
        <div class="footer">
            <p>© 2023 AI Facebook Comment Assistant | สร้างคำตอบคอมเมนต์อัจฉริยะด้วยเทคโนโลยี AI</p>
        </div>
    </div>
    <script>
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
            
