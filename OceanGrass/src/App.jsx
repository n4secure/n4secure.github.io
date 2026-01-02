import React, { useState, useEffect, useRef } from 'react';
import {
    Users, Fish, Leaf, Droplet, Thermometer, AlertTriangle,
    Search, Heart, Anchor, BarChart2, BookOpen, CheckCircle,
    ArrowRight, Award, MapPin, Share2, X, ExternalLink, Turtle, FileText, User,
    PlayCircle, Video, Download, Beaker, Waves, Sprout
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// --- Configuration Data ---
const BASE_URL = import.meta.env.BASE_URL;

// 1. รายชื่อสมาชิกในทีม
const TEAM_MEMBERS = [
    {
        id: 1,
        name: "นายวทัญญู ทองโอ",
        role: "ผู้จัดทำโครงงาน",
        img: `${BASE_URL}images/team1.jpg`
    },
    {
        id: 2,
        name: "นายปภังกรณ์ นวลเดช",
        role: "ผู้จัดทำโครงงาน",
        img: `${BASE_URL}images/team2.jpg`
    },
    {
        id: 3,
        name: "นายณัฏท์ชนนท์ บุนนาค เกียรติ์มนตรี",
        role: "ผู้จัดทำโครงงาน",
        img: `${BASE_URL}images/team3.jpg`
    },
];

// 2. อาจารย์ที่ปรึกษา
const ADVISORS = [
    { id: 1, name: "นายธนกร ลวดลายดี", role: "ครูที่ปรึกษาโครงงาน" }
];

// 3. ข้อมูลงานวิจัย (สำหรับหน้างานวิจัย)
const RESEARCH_DETAILS = [
    {
        id: 1,
        icon: "🧪",
        title: "เพาะเลี้ยงเนื้อเยื่อ (Tissue Culture)",
        shortDesc: "นวัตกรรมกู้ชีพหญ้าทะเลจาก 1 เมล็ด สู่ 300 ต้น",
        source: "The Cloud / คณะประมง ม.เกษตรศาสตร์",
        fullContent: (
            <div className="space-y-4">
                <p><strong className="text-teal-700">ปัญหา:</strong> การนำหญ้าทะเลจากธรรมชาติมาปลูกฟื้นฟูมักมีอัตรารอดต่ำและเป็นการรบกวนแหล่งหญ้าเดิม</p>
                <p><strong className="text-teal-700">ทางออก:</strong> ทีมวิจัยจากคณะประมง มหาวิทยาลัยเกษตรศาสตร์ นำโดย รศ.ชัชรี แก้วสุรลิขิต ประสบความสำเร็จในการพัฒนาเทคนิค <strong>"เพาะเลี้ยงเนื้อเยื่อหญ้าชะเงาใบยาว" (Enhalus acoroides)</strong></p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>สามารถกระตุ้นเมล็ดเพียง 1 เมล็ด ให้แตกยอดใหม่ได้ถึง <strong>300 ยอด</strong></li>
                    <li>ลดการเก็บหาพันธุ์จากธรรมชาติ</li>
                    <li>เพิ่มโอกาสรอดเมื่อนำไปปลูกในแปลงอนุบาล</li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm">
                    💡 <strong>เกร็ดความรู้:</strong> นี่คือความหวังใหม่ในการฟื้นฟูหญ้าทะเลที่กำลังวิกฤตจากการเปลี่ยนแปลงสภาพภูมิอากาศ
                </div>
            </div>
        ),
        tags: ["Innovation", "Conservation", "Lab"]
    },
    {
        id: 2,
        icon: "🛰️",
        title: "Drone & Sentinel-2 Satellite",
        shortDesc: "ดวงตาจากท้องฟ้า: ติดตามสุขภาพหญ้าทะเลแม่นยำสูง",
        source: "Burapha Science Journal / GISTDA",
        fullContent: (
            <div className="space-y-4">
                <p><strong className="text-blue-700">เทคโนโลยี:</strong> การบูรณาการระหว่างภาพถ่ายดาวเทียม Sentinel-2 และภาพถ่ายจากโดรน (UAV) เพื่อสำรวจแนวหญ้าทะเล</p>
                <p><strong className="text-blue-700">พื้นที่ศึกษา:</strong> อ่าวขาม อุทยานแห่งชาติหาดเจ้าไหม และพื้นที่ภาคตะวันออก (จ.ตราด)</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li><strong>Remote Sensing:</strong> ใช้คลื่นแสงเพื่อจำแนกชนิดและความหนาแน่นของหญ้าทะเล</li>
                    <li><strong>Real-time Monitoring:</strong> ติดตามการฟอกขาวหรือการตายของหญ้าทะเลจากปรากฏการณ์ Marine Heatwaves ได้อย่างรวดเร็ว</li>
                    <li><strong>Assessment:</strong> ประเมินอัตรารอดของแปลงปลูกฟื้นฟูได้โดยไม่ต้องลงเดินสำรวจทุกจุด ลดการเหยียบย่ำ</li>
                </ul>
            </div>
        ),
        tags: ["Technology", "Mapping", "Monitoring"]
    },
    {
        id: 3,
        icon: "👥",
        title: "Community Action (ชุมชนเข้มแข็ง)",
        shortDesc: "พลังชุมชน: โมเดลความสำเร็จจากตรังและตราด",
        source: "มูลนิธิสุทธิรัตน์ อยู่วิทยา / เครือข่ายชุมชน",
        fullContent: (
            <div className="space-y-4">
                <p><strong className="text-green-700">โมเดลความสำเร็จ:</strong> การอนุรักษ์ที่ยั่งยืนที่สุดคือการให้ "ชุมชน" เป็นเจ้าของ</p>
                <p><strong className="text-green-700">กรณีศึกษา:</strong> บ้านพรุจูด จ.ตรัง และ ชุมชนชายฝั่ง จ.ตราด</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li><strong>Citizen Science:</strong> ชาวบ้านช่วยกันเก็บข้อมูล สังเกตการเปลี่ยนแปลงของหญ้าทะเลและพะยูน</li>
                    <li><strong>Active Restoration:</strong> ร่วมกันปลูกซ่อมแซมในพื้นที่เสื่อมโทรม และเฝ้าระวังการทำประมงผิดกฎหมาย</li>
                    <li><strong>Blue Carbon Credit:</strong> ผลักดันให้เกิดการประเมินคาร์บอนเครดิตเพื่อสร้างรายได้กลับคืนสู่ชุมชนผู้ดูแลป่าในน้ำ</li>
                </ul>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-sm">
                    🤝 <strong>ผลลัพธ์:</strong> แหล่งหญ้าทะเลฟื้นตัว พะยูนกลับมา และชุมชนมีรายได้จากการท่องเที่ยวเชิงนิเวศ
                </div>
            </div>
        ),
        tags: ["Community", "Social", "Sustainable"]
    }
];

// --- Components ---

const Nav = ({ activeSection, setActiveSection }) => {
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Seagrass Guardians',
                    text: 'มาร่วมเป็นผู้พิทักษ์หญ้าทะเลไทยกันเถอะ!',
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                const btn = document.getElementById('nav-share-icon');
                if (btn) {
                    btn.style.color = '#10b981';
                    setTimeout(() => btn.style.color = '', 1000);
                }
                alert('คัดลอกลิงก์เรียบร้อยแล้ว!');
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
    };

    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
                <div
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setActiveSection('home')}
                >
                    <img
                        src="https://rayongwit.ac.th/wp-content/uploads/2023/04/cropped-Logo-%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A-%E0%B8%A3%E0%B8%A3-V3.png"
                        alt="โรงเรียนระยองวิทยาคม"
                        className="h-10 w-auto object-contain"
                    />
                    <div className="h-8 w-px bg-gray-300 mx-1 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                        <Leaf className="w-8 h-8 text-teal-600" />
                        <div className="flex flex-col justify-center leading-none font-bold">
                            <span className="text-teal-600 text-base tracking-wide">Seagrass</span>
                            <span className="text-blue-600 text-base tracking-wide">Guardians</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-6">
                        {[
                            { id: 'importance', label: 'ความสำคัญ' },
                            { id: 'crisis', label: 'วิกฤต' },
                            { id: 'research', label: 'งานวิจัย' },
                            { id: 'quiz', label: 'เกมตอบคำถาม' },
                            { id: 'about', label: 'เกี่ยวกับพวกเรา' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`text-sm font-medium transition-all px-3 py-1 rounded-full ${activeSection === item.id
                                    ? 'bg-teal-100 text-teal-700'
                                    : 'text-gray-500 hover:text-teal-500 hover:bg-teal-50'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleShare}
                        className="p-2 rounded-full hover:bg-teal-50 text-gray-500 hover:text-teal-600 transition-colors"
                        title="แชร์หน้านี้"
                    >
                        <Share2 id="nav-share-icon" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ onStart }) => (
    <div className="relative min-h-screen flex items-center justify-center wave-bg overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-teal-300 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 z-10 text-white fade-in">
            <img
                src="https://rayongwit.ac.th/wp-content/uploads/2023/04/cropped-Logo-%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A-%E0%B8%A3%E0%B8%A3-V3.png"
                alt="โรงเรียนระยองวิทยาคม"
                className="h-28 w-auto mx-auto mb-6 drop-shadow-lg"
            />
            <div className="inline-block px-4 py-1 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-teal-100 text-sm font-medium">
                ภารกิจกู้ชีพหญ้าทะเลไทย
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
                หญ้าทะเล... <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-green-300">ฮีโร่ตัวจริง</span> ที่กำลังหายไป
            </h1>
            <p className="text-lg md:text-2xl mb-8 font-light max-w-2xl mx-auto text-blue-50">
                แหล่งกักเก็บ "Blue Carbon" ที่ทรงพลังยิ่งกว่าป่าดงดิบ และบ้านหลังสุดท้ายของพะยูนไทย
            </p>
            <button
                onClick={onStart}
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-teal-50 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
                สำรวจโลกใต้ทะเล <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 opacity-90 max-w-2xl mx-auto">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <p className="text-3xl font-bold">160,000+</p>
                    <p className="text-xs md:text-sm text-blue-100">ไร่ พื้นที่ศักยภาพในไทย</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <p className="text-3xl font-bold">13</p>
                    <p className="text-xs md:text-sm text-blue-100">ชนิดพันธุ์ที่พบ</p>
                </div>
                <div className="col-span-2 md:col-span-1 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <p className="text-3xl font-bold">10 เท่า</p>
                    <p className="text-xs md:text-sm text-blue-100">เก็บคาร์บอนดีกว่าป่าบก</p>
                </div>
            </div>
        </div>

        <div className="absolute bottom-0 w-full flex justify-between pointer-events-none px-4 md:px-20 overflow-hidden">
            <svg width="100" height="200" className="seagrass-sway text-teal-800 opacity-40 fill-current" style={{ animationDelay: '0s' }}>
                <path d="M10,200 Q30,100 10,0 Q-10,100 10,200 Z" />
            </svg>
            <svg width="120" height="250" className="seagrass-sway text-teal-700 opacity-50 fill-current hidden md:block" style={{ animationDelay: '1s' }}>
                <path d="M20,250 Q50,120 20,0 Q-10,120 20,250 Z" />
            </svg>
            <svg width="80" height="180" className="seagrass-sway text-green-800 opacity-40 fill-current" style={{ animationDelay: '0.5s' }}>
                <path d="M10,180 Q30,90 10,0 Q-10,90 10,180 Z" />
            </svg>
            <svg width="110" height="220" className="seagrass-sway text-teal-900 opacity-30 fill-current" style={{ animationDelay: '1.5s' }}>
                <path d="M15,220 Q40,110 15,0 Q-15,110 15,220 Z" />
            </svg>
        </div>
    </div>
);

const Importance = () => {
    const [carbonInput, setCarbonInput] = useState(10);
    const [forestEquivalent, setForestEquivalent] = useState(0);

    useEffect(() => {
        setForestEquivalent((carbonInput * 8.5).toFixed(1));
    }, [carbonInput]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-20 animate-fade-in">
            <div className="text-center mb-16">
                <span className="text-teal-600 font-semibold tracking-wider text-sm uppercase">Ecosystem Services</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">ทำไมหญ้าทะเลถึงสำคัญ?</h2>
                <div className="w-20 h-1 bg-teal-500 mx-auto rounded"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-teal-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-10 -mt-10 z-0"></div>

                    <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2 relative z-10">
                        <Leaf className="w-6 h-6 text-teal-600" />
                        เครื่องคำนวณ Blue Carbon
                    </h3>
                    <p className="text-gray-600 mb-8 relative z-10 text-sm">
                        หญ้าทะเลช่วยกักเก็บคาร์บอนลงสู่ดิน (Sediment) ได้อย่างมีประสิทธิภาพ ลองดูว่าถ้าเราช่วยกันปลูกหญ้าทะเลเพิ่มขึ้น จะช่วยโลกได้แค่ไหน
                    </p>

                    <div className="bg-slate-50 p-6 rounded-2xl relative z-10 border border-slate-200">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-gray-700">พื้นที่หญ้าทะเล (ไร่)</label>
                            <span className="text-teal-600 font-bold">{carbonInput} ไร่</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={carbonInput}
                            onChange={(e) => setCarbonInput(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mb-6"
                        />

                        <div className="flex items-center justify-between gap-4">
                            <div className="text-center flex-1">
                                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-2">
                                    <p className="text-3xl font-bold text-teal-600">{carbonInput}</p>
                                </div>
                                <p className="text-xs text-gray-500">พื้นที่ (ไร่)</p>
                            </div>
                            <div className="text-gray-400 font-bold text-xl">≈</div>
                            <div className="text-center flex-1">
                                <div className="bg-blue-600 p-3 rounded-lg shadow-md shadow-blue-200 mb-2">
                                    <p className="text-3xl font-bold text-white">{forestEquivalent}</p>
                                </div>
                                <p className="text-xs text-gray-500">ตันคาร์บอน/ปี*</p>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-4 text-center">*ค่าประมาณการเปรียบเทียบเชิงอุปมา (อ้างอิง: Blue Carbon Society)</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all cursor-default">
                        <div className="bg-orange-100 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                            <Heart className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800">บ้านของ "พะยูน"</h4>
                            <p className="text-gray-600 text-sm mt-1">
                                พะยูนกินหญ้าทะเลวันละ 30-40 กิโลกรัม หากไม่มีหญ้า พะยูนก็สูญพันธุ์ (โดยเฉพาะหญ้าใบมะกรูดและหญ้าคาทะเล)
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all cursor-default">
                        <div className="bg-teal-100 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                            <Turtle className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800">แหล่งอาหารของ "เต่าทะเล"</h4>
                            <p className="text-gray-600 text-sm mt-1">
                                "เต่าตนุ" เป็นเต่าทะเลชนิดเดียวที่กินพืชเป็นอาหารหลัก โดยเฉพาะหญ้าทะเลและสาหร่าย การมีอยู่ของหญ้าทะเลจึงสำคัญต่อการรอดชีวิต
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all cursor-default">
                        <div className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                            <Fish className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800">อนุบาลสัตว์น้ำเศรษฐกิจ</h4>
                            <p className="text-gray-600 text-sm mt-1">
                                เป็นที่หลบภัยให้ลูกกุ้ง ลูกปูม้า และปลาเศรษฐกิจ สร้างรายได้ให้พี่น้องชาวประมงพื้นบ้าน
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all cursor-default">
                        <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                            <Anchor className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800">ลดการกัดเซาะชายฝั่ง</h4>
                            <p className="text-gray-600 text-sm mt-1">
                                รากและเหง้าที่สานกันแน่นช่วยยึดหน้าดิน ป้องกันตะกอนฟุ้งกระจาย และลดความแรงของคลื่น
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Crisis = () => {
    const data = [
        { name: '2564', dugongDeaths: 10, seagrassHealth: 80 },
        { name: '2565', dugongDeaths: 12, seagrassHealth: 75 },
        { name: '2566', dugongDeaths: 18, seagrassHealth: 60 },
        { name: '2567', dugongDeaths: 25, seagrassHealth: 45 },
    ];

    return (
        <div className="bg-red-50 py-20 px-4 border-y border-red-100">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-red-200">
                        Crisis Report
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">วิกฤต "ทะเลเดือด" หญ้าตาย พะยูนสูญพันธุ์?</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        ปี 2567 เป็นปีที่น่าเศร้า... พะยูนไทยตายเพิ่มขึ้นกว่า 30% ซึ่งสัมพันธ์โดยตรงกับการหายไปของแหล่งหญ้าทะเลในภาคใต้และภาคตะวันออก
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 mb-12">
                    <div className="md:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-gray-500" />
                            แนวโน้มความสัมพันธ์ (ปี 2564-2567)
                        </h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" tick={{ fill: '#666' }} />
                                    <YAxis yAxisId="left" orientation="left" stroke="#ef4444" label={{ value: 'พะยูนตาย (ตัว)', angle: -90, position: 'insideLeft', fill: '#ef4444' }} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" label={{ value: 'หญ้าทะเลสมบูรณ์ (%)', angle: 90, position: 'insideRight', fill: '#10b981' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar yAxisId="left" dataKey="dugongDeaths" name="พะยูนตาย (ตัว)" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar yAxisId="right" dataKey="seagrassHealth" name="ความสมบูรณ์หญ้าทะเล (%)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 text-center">*ข้อมูลจำลองแนวโน้มจากรายงานสถานการณ์จริง</p>
                    </div>

                    <div className="md:col-span-5 space-y-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-orange-600 flex gap-2 items-center">
                                <Thermometer className="w-5 h-5" />
                                Marine Heatwaves
                            </h4>
                            <p className="text-gray-600 text-sm mt-2">
                                "คลื่นความร้อนในทะเล" ทำให้อุณหภูมิน้ำสูงผิดปกติ หญ้าทะเลเกิดความเครียด ใบเปื่อยยุ่ย และตายลง (พบมากในอ่าวไทยตอนบนและอันดามัน)
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-yellow-600 flex gap-2 items-center">
                                <Droplet className="w-5 h-5" />
                                ตะกอนทับถม
                            </h4>
                            <p className="text-gray-600 text-sm mt-2">
                                การพัฒนาชายฝั่งและการเปลี่ยนแปลงทิศทางน้ำ ทำให้ตะกอนดินจำนวนมากไหลลงมากลบใบหญ้า จนสังเคราะห์แสงไม่ได้
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-gray-500 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-gray-600 flex gap-2 items-center">
                                <AlertTriangle className="w-5 h-5" />
                                กิจกรรมมนุษย์
                            </h4>
                            <p className="text-gray-600 text-sm mt-2">
                                การเดินเรือในน้ำตื้น การทิ้งสมอ และน้ำเสียจากชุมชน คือปัจจัยเร่งที่ทำให้หญ้าทะเลฟื้นตัวไม่ทัน
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Research = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="max-w-6xl mx-auto px-4 py-20 bg-gradient-to-b from-white to-blue-50">
            <div className="text-center mb-16">
                <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase">Thai Innovation</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">แสงสว่างแห่งความหวัง: งานวิจัยไทย</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    เราไม่ได้นิ่งเฉย... นักวิทยาศาสตร์ไทยกำลังเร่งศึกษาวิจัยและใช้นวัตกรรมเพื่อกู้คืนระบบนิเวศ
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {RESEARCH_DETAILS.map((item) => {
                    let bgClass = "";
                    let iconBgClass = "";
                    let btnClass = "";

                    if (item.id === 1) { // Tissue Culture
                        bgClass = "bg-teal-50"; iconBgClass = "bg-teal-100"; btnClass = "text-teal-600 bg-white";
                    } else if (item.id === 2) { // Drone
                        bgClass = "bg-blue-50"; iconBgClass = "bg-blue-100"; btnClass = "text-blue-600 bg-white";
                    } else { // Community
                        bgClass = "bg-green-50"; iconBgClass = "bg-green-100"; btnClass = "text-green-600 bg-white";
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group relative w-full text-left transition-all duration-300 hover:-translate-y-2 focus:outline-none"
                        >
                            {/* Card Content */}
                            <div className={`rounded-[32px] p-1 shadow-lg group-hover:shadow-2xl bg-white h-full border-2 border-transparent group-hover:border-teal-100`}>
                                <div className={`${bgClass} rounded-[28px] p-8 h-full flex flex-col`}>
                                    <div className={`w-16 h-16 ${iconBgClass} rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-sm`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-700 transition-colors">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                                        {item.shortDesc}
                                    </p>

                                    <div className="border-t border-black/5 pt-6 mt-auto flex justify-between items-center">
                                        <span className="text-xs font-bold bg-white/80 px-3 py-1.5 rounded-lg text-gray-500 backdrop-blur-sm">
                                            {item.source.split('/')[0]}
                                        </span>
                                        <div className={`p-2.5 rounded-full shadow-sm transition-transform group-hover:scale-110 ${btnClass}`}>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Modal for Research Details */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
                        onClick={() => setSelectedItem(null)}
                    ></div>
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl p-6 md:p-10 animate-fade-in border border-teal-100">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-500"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-start gap-5 mb-8">
                            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner shrink-0">
                                {selectedItem.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{selectedItem.title}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                                    <BookOpen className="w-4 h-4" /> แหล่งข้อมูล: {selectedItem.source}
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-lg prose-teal max-w-none text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl mb-6">
                            {selectedItem.fullContent}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {selectedItem.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-gray-100 text-center">
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="px-10 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                ปิดหน้าต่าง
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const AboutUs = () => {
    const researchPapers = [
        "หญ้าทะเลและคาร์บอนสีน้ำเงินในภาคตะวันออกของไทย",
        "รายงานสถานภาพการศึกษาวิจัยและการพัฒนาระบบข้อมูลทรัพยากรหญ้าทะเลในประเทศไทย",
        "โครงการฟื้นฟูหญ้าทะเลแบบบูรณาการทุกภาคส่วน",
        "ผลของปัจจัยสิ่งแวดล้อมที่มีต่อการปลูกหญ้าทะเลในจังหวัดตรัง",
        "รายงานวิจัยฉบับสมบูรณ์ โครงการวิจัยการสะสมคาร์บอน"
    ];

    // Video Intersection Observer Logic
    const videoRef = useRef(null);
    const [playVideo, setPlayVideo] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPlayVideo(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-20 animate-fade-in">
            <div className="text-center mb-16">
                <span className="text-teal-600 font-semibold tracking-wider text-sm uppercase">Our Team & Project</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">เกี่ยวกับพวกเรา</h2>
                <div className="w-20 h-1 bg-teal-500 mx-auto rounded"></div>
            </div>

            {/* Team Section */}
            <div className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-teal-100 p-2 rounded-lg">
                        <Users className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">ทีมงานผู้จัดทำโครงงาน</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {TEAM_MEMBERS.map((member) => (
                        <div key={member.id} className="group bg-white p-8 rounded-[24px] shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-28 h-28 bg-gray-50 rounded-full mb-6 overflow-hidden border-4 border-teal-50 group-hover:border-teal-200 transition-colors relative">
                                {member.img ? (
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://api.dicebear.com/9.x/micah/svg?seed=${member.id}&baseColor=f9c9b6&mouth=smile`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-teal-300 bg-teal-50">
                                        <User className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h4>
                            <p className="text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full">{member.role}</p>
                        </div>
                    ))}
                </div>

                {/* Advisors Section */}
                {ADVISORS.length > 0 && (
                    <div className="max-w-2xl mx-auto mb-16">
                        <h4 className="text-lg font-bold text-gray-600 mb-6 text-center">ครูที่ปรึกษาโครงงาน</h4>
                        <div className="grid gap-4 justify-center">
                            {ADVISORS.map((advisor) => (
                                <div key={advisor.id} className="bg-white px-8 py-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-gray-800">{advisor.name}</p>
                                        <p className="text-xs text-gray-500">{advisor.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Video Highlight Section (Use Image as Link) */}
            <div className="mb-20" ref={videoRef}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-red-100 p-2 rounded-lg">
                        <Video className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">บันทึกภาพกิจกรรม (Highlight)</h3>
                </div>

                <div className="relative w-full max-w-4xl mx-auto group">
                    <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative hover:shadow-3xl transition-shadow duration-300">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/qoup7WQDpws?start=23&rel=0"
                            title="สำรวจระบบนิเวศหญ้าทะเล"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-4">
                        *รับชมวิดีโอไฮไลท์การสำรวจ (เริ่มนาทีที่ 0:23)
                    </p>
                </div>
            </div>

            {/* Project Details Section */}
            <div className="bg-slate-50 p-8 md:p-12 rounded-[32px] border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">โครงงานของเรา</h3>
                </div>

                {/* Project Overview with Highlights and Gallery */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="mb-8">
                        <h4 className="text-2xl font-bold text-teal-800 mb-4">
                            "กระถางปลูกหญ้าทะเลจากซิติน" (Seagrass planting pots from Chitin)
                        </h4>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            <strong>บทคัดย่อ:</strong> โครงงานนี้มีวัตถุประสงค์เพื่อพัฒนานวัตกรรมทางวิศวกรรมในการส่งเสริมการเจริญเติบโตของหญ้าทะเล
                            และเพิ่มประสิทธิภาพในการกักเก็บคาร์บอน โดยเน้นการออกแบบวัสดุที่เป็นมิตรต่อสิ่งแวดล้อม ต้นทุนต่ำ
                            และสามารถย่อยสลายได้ในธรรมชาติ ทางคณะผู้จัดทำได้ออกแบบและผลิตกระถางจาก <strong>Chitosan</strong>
                            ซึ่งเป็นพอลิเมอร์ธรรมชาติที่ได้จากเปลือกกุ้งและปู มีคุณสมบัติย่อยสลายได้ง่ายและปลอดภัยต่อสิ่งมีชีวิตทางทะเล
                        </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                <Beaker className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-gray-800 mb-2">วัสดุธรรมชาติ</h5>
                            <p className="text-sm text-gray-600">ผลิตจากไคโตซาน (Chitosan) สกัดจากเปลือกกุ้ง-ปู ย่อยสลายได้ 100%</p>
                        </div>
                        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                                <Waves className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-gray-800 mb-2">ต้านทานกระแสน้ำ</h5>
                            <p className="text-sm text-gray-600">ออกแบบรูปทรงทางวิศวกรรมให้ยึดเกาะหน้าดิน ลดการชะล้างจากคลื่น</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                <Sprout className="w-6 h-6" />
                            </div>
                            <h5 className="font-bold text-gray-800 mb-2">ฟื้นฟูระบบนิเวศ</h5>
                            <p className="text-sm text-gray-600">ช่วยให้รากหญ้าทะเลเติบโตแข็งแรง เพิ่มพื้นที่กักเก็บ Blue Carbon</p>
                        </div>
                    </div>

                    {/* Project Gallery */}
                    <div className="mb-10">
                        <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" /> ภาพการดำเนินงาน
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Image 1: กระถางชานอ้อย */}
                            <div className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <img
                                    src={`${BASE_URL}images/work1.png`}
                                    alt="กระถางชานอ้อย"
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x800/eef2ff/3b82f6?text=Sugar+Cane+Pot"; }}
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                    <span className="text-white text-sm font-medium">กระถางชานอ้อย</span>
                                </div>
                            </div>

                            {/* Image 2: สัมภาษณ์นักวิจัย */}
                            <div className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <img
                                    src={`${BASE_URL}images/work2.png`}
                                    alt="สัมภาษณ์นักวิจัย"
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x800/f0fdf4/16a34a?text=Research+Interview"; }}
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                    <span className="text-white text-sm font-medium">สัมภาษณ์นักวิจัย</span>
                                </div>
                            </div>

                            {/* Image 3: ดูหน้างาน */}
                            <div className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <img
                                    src={`${BASE_URL}images/work3.png`}
                                    alt="ดูหน้างาน"
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x800/fff7ed/ea580c?text=Site+Visit"; }}
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                    <span className="text-white text-sm font-medium">ดูหน้างาน</span>
                                </div>
                            </div>

                            {/* Image 4: สัมผัสหญ้าทะเล */}
                            <div className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <img
                                    src={`${BASE_URL}images/work4.JPG`}
                                    alt="สัมผัสหญ้าทะเล"
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x800/f0f9ff/0ea5e9?text=Seagrass+Touch"; }}
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                    <span className="text-white text-sm font-medium">สัมผัสหญ้าทะเล</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4 border-t border-gray-100">
                        <a
                            href="https://drive.google.com/file/d/1qeeQE--gDEg77n9ziQYHQ5JUt8m6IOKz/view?usp=drive_link"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition shadow-lg hover:shadow-teal-200/50"
                        >
                            <ExternalLink className="w-5 h-5" />
                            อ่านรายงานฉบับสมบูรณ์ (Google Drive)
                        </a>
                    </div>
                </div>

                {/* Research Papers List (Moved here) */}
                <div className="mt-12 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">แหล่งข้อมูลอ้างอิงและงานวิจัย</h3>
                    </div>
                    <div className="grid gap-4">
                        {researchPapers.map((paper, index) => (
                            <a href="#" key={index} className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4 hover:shadow-md hover:border-blue-300 transition-all">
                                <div className="bg-red-50 p-3 rounded-xl text-red-500 shrink-0 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-lg leading-tight group-hover:text-blue-700 transition-colors">{paper}</h4>
                                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">PDF</span>
                                        <span>เอกสารประกอบการศึกษา</span>
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [shareBtnText, setShareBtnText] = useState('แชร์คะแนน');

    const questions = [
        {
            questionText: 'ทำไมเราจึงเรียกหญ้าทะเลว่าเป็น "Blue Carbon"?',
            answerOptions: [
                { answerText: 'เพราะมีใบสีฟ้าสวยงาม', isCorrect: false },
                { answerText: 'เพราะเติบโตได้ดีในน้ำลึก', isCorrect: false },
                { answerText: 'เพราะกักเก็บคาร์บอนในทะเลได้ปริมาณมหาศาล', isCorrect: true },
                { answerText: 'เพราะเป็นอาหารของวาฬสีน้ำเงิน', isCorrect: false },
            ],
        },
        {
            questionText: 'สาเหตุหลักที่ทำให้หญ้าทะเลตายเป็นวงกว้างในปี 2567 คือ?',
            answerOptions: [
                { answerText: 'ภาวะโลกร้อนและคลื่นความร้อนในทะเล (Marine Heatwaves)', isCorrect: true },
                { answerText: 'ปลาฉลามกินหญ้ามากเกินไป', isCorrect: false },
                { answerText: 'ฝนตกหนักเกินไป', isCorrect: false },
                { answerText: 'นักท่องเที่ยวเก็บไปทำอาหาร', isCorrect: false },
            ],
        },
        {
            questionText: 'จังหวัดใดในภาคตะวันออกที่มีแหล่งหญ้าทะเลและพะยูนอาศัยอยู่?',
            answerOptions: [
                { answerText: 'เชียงใหม่', isCorrect: false },
                { answerText: 'ตราด', isCorrect: true },
                { answerText: 'พระนครศรีอยุธยา', isCorrect: false },
                { answerText: 'กาญจนบุรี', isCorrect: false },
            ],
        },
        {
            questionText: 'หญ้าทะเลชนิดใดที่เป็นอาหารโปรดของพะยูน?',
            answerOptions: [
                { answerText: 'สาหร่ายหางกระรอก', isCorrect: false },
                { answerText: 'หญ้าใบมะกรูด', isCorrect: true },
                { answerText: 'ผักตบชวา', isCorrect: false },
                { answerText: 'ปะการังอ่อน', isCorrect: false },
            ],
        }
    ];

    const handleShareScore = async () => {
        const textToShare = `ฉันทำคะแนน Seagrass Quiz ได้ ${score}/${questions.length} คะแนน! มาช่วยกันอนุรักษ์หญ้าทะเลไทยกันนะ`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Seagrass Quiz Score',
                    text: textToShare,
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(`${textToShare} ${window.location.href}`);
                setShareBtnText('คัดลอกแล้ว!');
                setTimeout(() => setShareBtnText('แชร์คะแนน'), 2000);
            }
        } catch (err) {
            console.error('Share failed', err);
        }
    };

    const handleAnswerOptionClick = (isCorrect) => {
        setSelectedAnswer(isCorrect);
        if (isCorrect) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(null);
            } else {
                setShowScore(true);
            }
        }, 1200);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswer(null);
        setShareBtnText('แชร์คะแนน');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-24">
            <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border-4 border-teal-50 relative">
                <div className="bg-teal-600 p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <h2 className="text-3xl font-bold flex items-center justify-center gap-3 relative z-10">
                        <BookOpen className="w-8 h-8" />
                        Seagrass Quiz
                    </h2>
                    <p className="text-teal-100 mt-2 relative z-10">ทดสอบความรู้ผู้พิทักษ์หญ้าทะเล</p>
                </div>

                <div className="p-8 md:p-12">
                    {showScore ? (
                        <div className="text-center py-6 animate-fade-in">
                            <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-teal-50 rounded-full">
                                {score === questions.length ? (
                                    <Award className="w-12 h-12 text-teal-600 animate-bounce" />
                                ) : (
                                    <Leaf className="w-12 h-12 text-teal-600" />
                                )}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">
                                คุณทำได้ {score} / {questions.length} คะแนน!
                            </h3>
                            <p className="text-gray-600 mb-8 text-lg">
                                {score === questions.length
                                    ? "สุดยอด! คุณคือผู้พิทักษ์หญ้าทะเลตัวจริง 🌟"
                                    : "เก่งมาก! ลองศึกษาเพิ่มอีกนิด แล้วมาช่วยกันอนุรักษ์นะ"}
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <button
                                    onClick={resetQuiz}
                                    className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition shadow-lg hover:shadow-teal-200/50"
                                >
                                    เล่นอีกครั้ง
                                </button>
                                <button
                                    onClick={handleShareScore}
                                    className="flex items-center justify-center gap-2 bg-white text-teal-600 border-2 border-teal-100 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition shadow-md"
                                >
                                    <Share2 className="w-5 h-5" />
                                    {shareBtnText}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center text-sm font-medium text-gray-400 mb-8">
                                <span>คำถามที่ {currentQuestion + 1} จาก {questions.length}</span>
                                <div className="flex gap-1">
                                    {questions.map((_, idx) => (
                                        <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentQuestion ? 'bg-teal-500' : 'bg-gray-200'}`}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8 min-h-[80px]">
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                                    {questions[currentQuestion].questionText}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {questions[currentQuestion].answerOptions.map((answerOption, index) => {
                                    let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all font-medium text-gray-600 hover:border-teal-400 hover:bg-teal-50";

                                    if (selectedAnswer !== null) {
                                        if (answerOption.isCorrect) {
                                            btnClass = "w-full text-left p-5 rounded-xl border-2 bg-green-100 border-green-500 text-green-800 font-bold relative";
                                        } else if (selectedAnswer === false && !answerOption.isCorrect) {
                                            btnClass = "w-full text-left p-5 rounded-xl border-2 border-gray-100 opacity-50 cursor-not-allowed";
                                        } else {
                                            btnClass = "w-full text-left p-5 rounded-xl border-2 border-gray-100 opacity-50 cursor-not-allowed";
                                        }
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                            disabled={selectedAnswer !== null}
                                            className={btnClass}
                                        >
                                            <div className="flex justify-between items-center">
                                                {answerOption.answerText}
                                                {selectedAnswer !== null && answerOption.isCorrect && (
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="bg-slate-800 text-slate-300 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8 flex flex-col items-center">
                <img
                    src="https://rayongwit.ac.th/wp-content/uploads/2023/04/cropped-Logo-%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A-%E0%B8%A3%E0%B8%A3-V3.png"
                    alt="โรงเรียนระยองวิทยาคม"
                    className="h-24 w-auto mb-4 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />

                <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-10 h-10 text-teal-400" />
                    <h3 className="text-2xl font-bold text-white">Seagrass Guardians</h3>
                </div>
                <p className="text-slate-400">โครงการสื่อสารความรู้วิทยาศาสตร์ทางทะเล</p>
                <p className="text-slate-500 text-sm mt-1">โรงเรียนระยองวิทยาคม</p>
            </div>

            <p className="text-lg font-medium text-white mb-6">"การอนุรักษ์หญ้าทะเล คือการต่อลมหายใจให้พะยูน และลดโลกร้อนให้พวกเราทุกคน"</p>

            <div className="flex flex-wrap justify-center gap-3 text-sm mb-10">
                <span className="bg-slate-700 px-3 py-1 rounded-full text-teal-300">#SaveDugong</span>
                <span className="bg-slate-700 px-3 py-1 rounded-full text-blue-300">#BlueCarbon</span>
                <span className="bg-slate-700 px-3 py-1 rounded-full text-green-300">#SeagrassThailand</span>
            </div>

            <div className="border-t border-slate-700 pt-8 text-xs text-slate-500 space-y-2">
                <p>อ้างอิงข้อมูลจาก:</p>
                <p>รายงานสถานภาพหญ้าทะเล กรมทรัพยากรทางทะเลและชายฝั่ง (ทช.)</p>
                <p>งานวิจัยคณะประมง ม.เกษตรศาสตร์ (โครงการเพาะเลี้ยงเนื้อเยื่อ)</p>
                <p>บทความ The Cloud และ ข้อมูลวิจัย Blue Carbon จาก ม.บูรพา</p>
            </div>
        </div>
    </footer>
)

export default function App() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeSection]);

    const renderSection = () => {
        switch (activeSection) {
            case 'home': return <Hero onStart={() => setActiveSection('importance')} />;
            case 'importance': return <Importance />;
            case 'crisis': return <Crisis />;
            case 'research': return <Research />;
            case 'quiz': return <Quiz />;
            case 'about': return <AboutUs />;
            default: return <Hero />;
        }
    };

    return (
        <div className="font-sans text-gray-900 min-h-screen flex flex-col bg-[#f0f9ff]">
            <style>{`
                .wave-bg {
                    background: linear-gradient(180deg, #0ea5e9 0%, #0369a1 100%);
                }
                .seagrass-sway {
                    animation: sway 3s infinite ease-in-out alternate;
                    transform-origin: bottom center;
                }
                @keyframes sway {
                    0% { transform: rotate(5deg); }
                    100% { transform: rotate(-5deg); }
                }
                .fade-in {
                    animation: fadeIn 1s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {activeSection !== 'home' && (
                <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
            )}

            <main className="flex-grow">
                {renderSection()}
            </main>

            {activeSection !== 'home' && <Footer />}
        </div>
    );
}