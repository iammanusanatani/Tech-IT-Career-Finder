/* ─── STATE ─────────────────────────────────────────── */
let lang = 'hinglish';
let cur = 0;
let scores = { dev: 0, qa: 0, ds: 0, cyber: 0, pm: 0 };
let locked = false;

/* ─── TRANSLATIONS ──────────────────────────────────── */
const T = {
    hinglish: {
        badge: 'Free Career Test',
        t1: 'Sirf 10 Sawalon Mein Pata Karo',
        t2: 'Ki Tumhare Liye Kaun Si Tech & IT Job Best Hai!',
        sub: 'Personality aur skills ke basis par tumhara perfect IT career reveal hoga — 100% free, no registration!',
        meta: '10 Questions • 2 Minute Mein Result • Top Matches',
        f1t: '10 Sawaal', f1s: 'Personality & Skills',
        f2t: 'Fast Result', f2s: '2 Minute Mein',
        f3t: 'Accurate', f3s: 'Top 3 Jobs',
        f4t: 'Salary Info', f4s: 'Expected Pay',
        f5t: 'Skills Guide', f5s: 'Kya Seekhna Hoga',
        f6t: 'Free Test', f6s: 'Koi Fees Nahi',
        start: 'Quiz Shuru Karo',
        qOf: 'Question {a} / {b}',
        retry: 'Dubara Try Karo',
        resLbl: 'Tumhara Ideal Career',
        matchTitle: 'Top Career Matches',
        lSkills: '💡 Seekhni Padengi Skills',
        lSalary: '💰 Expected Salary',
        lPath: '🗺️ Career Path',
        lScope: '📈 Job Market',
    },
    english: {
        badge: 'Free Career Test',
        t1: 'Find Out In Just 10 Questions',
        t2: 'Which Tech & IT Job Is Best For You!',
        sub: 'Based on your personality and skills, discover your perfect IT career — 100% free, no registration!',
        meta: '10 Questions • Result in 2 Minutes • Top Matches',
        f1t: '10 Questions', f1s: 'Personality & Skills',
        f2t: 'Fast Result', f2s: 'In 2 Minutes',
        f3t: 'Accurate', f3s: 'Top 3 Jobs',
        f4t: 'Salary Info', f4s: 'Expected Pay',
        f5t: 'Skills Guide', f5s: 'What To Learn',
        f6t: 'Free Test', f6s: 'No Fees At All',
        start: 'Start Quiz',
        qOf: 'Question {a} of {b}',
        retry: 'Retake Quiz',
        resLbl: 'Your Ideal Career',
        matchTitle: 'Top Career Matches',
        lSkills: '💡 Key Skills to Learn',
        lSalary: '💰 Expected Salary',
        lPath: '🗺️ Career Path',
        lScope: '📈 Job Market',
    }
};

/* ─── QUESTIONS ─────────────────────────────────────── */
const Qs = [
    {
        hi: 'Jab tumhare saamne ek broken code aata hai, tum kya feel karte ho?',
        en: 'When you see broken code, what do you feel?',
        opts: [
            { hi: 'Excited — puzzle solve karna mujhe achha lagta hai!', en: 'Excited — I absolutely love solving puzzles!', v: { dev: 3, qa: 2, ds: 1, cyber: 1, pm: 0 } },
            { hi: 'Frustrated, par galti dhundh leta/leti hun aakhir mein', en: 'Frustrated, but I always find the bug eventually', v: { dev: 2, qa: 3, ds: 1, cyber: 2, pm: 0 } },
            { hi: 'Curious — kya koi security breach toh nahi hua?', en: 'Curious — could this be a security breach?', v: { dev: 1, qa: 1, ds: 1, cyber: 3, pm: 0 } },
            { hi: 'Seedha developer ko assign karta/karti hun fix karne ke liye', en: "I'd assign it to the right developer to fix", v: { dev: 0, qa: 1, ds: 0, cyber: 0, pm: 3 } },
        ]
    },
    {
        hi: 'Apna free time tum kaise spend karna prefer karte ho?',
        en: 'How do you prefer to spend your free time?',
        opts: [
            { hi: 'Apps ya games test/explore karna pasand hai', en: 'Testing or exploring apps and games', v: { dev: 1, qa: 3, ds: 1, cyber: 1, pm: 1 } },
            { hi: 'Hacking, cybersecurity ya tech news padhna', en: 'Reading about hacking or cybersecurity news', v: { dev: 0, qa: 0, ds: 1, cyber: 3, pm: 0 } },
            { hi: 'Kuch banana — app, website, ya side project', en: 'Building something — an app, website or project', v: { dev: 3, qa: 1, ds: 1, cyber: 1, pm: 0 } },
            { hi: 'Data dekhna aur patterns samajhna bahut interesting lagta hai', en: 'Analyzing data and finding interesting patterns', v: { dev: 0, qa: 1, ds: 3, cyber: 0, pm: 1 } },
        ]
    },
    {
        hi: 'School ya college mein tumhara sabse favorite subject kaunsa tha?',
        en: 'What was your favorite subject in school or college?',
        opts: [
            { hi: 'Maths / Statistics', en: 'Maths / Statistics', v: { dev: 1, qa: 1, ds: 3, cyber: 2, pm: 0 } },
            { hi: 'Computer Science / Programming', en: 'Computer Science / Programming', v: { dev: 3, qa: 2, ds: 2, cyber: 2, pm: 0 } },
            { hi: 'Physics / Electronics / Networking', en: 'Physics / Electronics / Networking', v: { dev: 1, qa: 1, ds: 0, cyber: 3, pm: 0 } },
            { hi: 'Business / Management / Communication', en: 'Business / Management / Communication', v: { dev: 0, qa: 0, ds: 1, cyber: 0, pm: 3 } },
        ]
    },
    {
        hi: 'Agar tum ek app banana shuru karo toh tumhara pehla thought kya hoga?',
        en: 'If you were building an app, what would you think about first?',
        opts: [
            { hi: 'Features — is app mein kya kya functionality hogi', en: 'Features — what functionality will it have', v: { dev: 3, qa: 1, ds: 0, cyber: 0, pm: 2 } },
            { hi: 'Bugs — ye cheezein kahan galat ho sakti hain', en: 'Bugs — where could this go wrong', v: { dev: 1, qa: 3, ds: 0, cyber: 1, pm: 0 } },
            { hi: 'Security — koi hack toh nahi kar sakta isko', en: 'Security — can someone hack into this?', v: { dev: 1, qa: 1, ds: 0, cyber: 3, pm: 0 } },
            { hi: 'Users — unhe kya chahiye aur kya experience milega', en: 'Users — what experience will they get', v: { dev: 1, qa: 1, ds: 2, cyber: 0, pm: 3 } },
        ]
    },
    {
        hi: 'Tumhara kaam karne ka style kaisa hai sabse zyada?',
        en: "What best describes your working style?",
        opts: [
            { hi: 'Akele — deep focus mein concentrate karke kaam karna', en: 'Alone — I prefer deep, focused solo work', v: { dev: 3, qa: 2, ds: 3, cyber: 3, pm: 0 } },
            { hi: 'Team ke saath — milke collaborate karna aur ideas share karna', en: 'With a team — I love collaborating and brainstorming', v: { dev: 1, qa: 2, ds: 1, cyber: 0, pm: 3 } },
            { hi: 'Detail-oriented — har ek cheez carefully check karna', en: 'Detail-oriented — I double-check everything', v: { dev: 1, qa: 3, ds: 2, cyber: 2, pm: 1 } },
            { hi: 'Leadership — doosron ko guide aur direct karna', en: 'Leadership — guiding and directing others', v: { dev: 0, qa: 0, ds: 0, cyber: 0, pm: 3 } },
        ]
    },
    {
        hi: 'Excel ya spreadsheet use karte waqt tum kya prefer karte ho?',
        en: 'When using Excel or spreadsheets, you prefer:',
        opts: [
            { hi: 'Formulas, macros aur automation — manually kuch nahi', en: 'Formulas and automation — no manual work ever', v: { dev: 3, qa: 2, ds: 2, cyber: 1, pm: 0 } },
            { hi: 'Charts aur graphs — data ko visually represent karna', en: 'Charts and graphs — visualizing data clearly', v: { dev: 0, qa: 1, ds: 3, cyber: 0, pm: 1 } },
            { hi: 'Accuracy verify karna — data bilkul correct hona chahiye', en: 'Verifying accuracy — all data must be correct', v: { dev: 0, qa: 3, ds: 2, cyber: 1, pm: 1 } },
            { hi: 'Project tracking — timelines, milestones aur progress', en: 'Project tracking — timelines and milestones', v: { dev: 0, qa: 0, ds: 0, cyber: 0, pm: 3 } },
        ]
    },
    {
        hi: 'Ek din tumhare phone mein ek unknown app automatically install ho jata hai. Tum kya karoge?',
        en: 'An unknown app suddenly appears on your phone. What do you do?',
        opts: [
            { hi: 'Turant delete — bilkul suspicious lag raha hai yaar', en: 'Delete it immediately — very suspicious', v: { dev: 0, qa: 1, ds: 0, cyber: 2, pm: 0 } },
            { hi: 'Investigate karta/karti hun — kaise aaya, kisne install kiya', en: "Investigate — how did it get here and who installed it", v: { dev: 2, qa: 2, ds: 1, cyber: 3, pm: 0 } },
            { hi: 'Permissions aur source carefully check karta/karti hun', en: 'Carefully check its permissions and source', v: { dev: 1, qa: 3, ds: 1, cyber: 2, pm: 0 } },
            { hi: 'IT ya support team ko immediately report karta/karti hun', en: 'Report it to the IT or support team immediately', v: { dev: 0, qa: 0, ds: 0, cyber: 1, pm: 2 } },
        ]
    },
    {
        hi: 'Numbers aur data ke baare mein tumhara kya feel hai sach mein?',
        en: 'How do you honestly feel about numbers and data?',
        opts: [
            { hi: 'Love it — data se patterns nikalna mera actual hobby hai', en: 'Love it — finding patterns in data is my hobby', v: { dev: 1, qa: 1, ds: 3, cyber: 1, pm: 0 } },
            { hi: 'Theek hai — zaroorat ho toh use kar leta/leti hun', en: 'OK with it — I use it when necessary', v: { dev: 2, qa: 2, ds: 1, cyber: 1, pm: 2 } },
            { hi: 'Prefer nahi karta/karti — creative kaam zyada pasand hai', en: 'Not my thing — I prefer creative work', v: { dev: 2, qa: 1, ds: 0, cyber: 1, pm: 1 } },
            { hi: 'Business metrics aur KPIs mein bahut interest hai mujhe', en: 'Very interested in business metrics and KPIs', v: { dev: 0, qa: 0, ds: 2, cyber: 0, pm: 3 } },
        ]
    },
    {
        hi: 'Salary vs Job Satisfaction — tumhare liye kaunsi cheez zyada matter karti hai?',
        en: 'Salary vs Job Satisfaction — which matters more to you?',
        opts: [
            { hi: 'Dono chahiye — passion bhi aur achhi salary bhi!', en: 'Both! I want passion and great pay together', v: { dev: 2, qa: 2, ds: 2, cyber: 2, pm: 2 } },
            { hi: 'Jo kaam mein maza aaye — salary baad mein aayegi', en: "Enjoyment first — salary will follow with growth", v: { dev: 3, qa: 2, ds: 3, cyber: 2, pm: 1 } },
            { hi: 'High salary hi meri priority number one hai abhi', en: 'High salary is my number one priority right now', v: { dev: 1, qa: 0, ds: 2, cyber: 3, pm: 2 } },
            { hi: 'Growth, impact aur leadership opportunity chahiye', en: 'Growth, impact and leadership opportunity', v: { dev: 0, qa: 0, ds: 0, cyber: 0, pm: 3 } },
        ]
    },
    {
        hi: 'Agar tumhe ek naya skill seekhna ho toh tum kaunsa choose karoge?',
        en: 'If you had to learn one new skill, which would you pick?',
        opts: [
            { hi: 'Programming language — Python ya JavaScript banana seekhna', en: 'A programming language — Python or JavaScript', v: { dev: 3, qa: 1, ds: 2, cyber: 1, pm: 0 } },
            { hi: 'Ethical hacking ya penetration testing — systems hack karna', en: 'Ethical hacking / penetration testing', v: { dev: 0, qa: 0, ds: 0, cyber: 3, pm: 0 } },
            { hi: 'Machine Learning ya Data Science — AI banana seekhna', en: 'Machine Learning / Data Science / AI', v: { dev: 1, qa: 0, ds: 3, cyber: 0, pm: 0 } },
            { hi: 'Project Management — PMP, Agile ya Scrum certification', en: 'Project Management — PMP, Agile, or Scrum cert', v: { dev: 0, qa: 1, ds: 0, cyber: 0, pm: 3 } },
        ]
    },
];

/* ─── CAREER DATA ───────────────────────────────────── */
const CAREERS = {
    dev: {
        title: 'Software Developer / Full Stack Engineer', emoji: '💻',
        color: '#00d4ff', glow: 'rgba(0,212,255,.3)',
        hi: 'Tum ek natural builder ho! Code likhna, apps banana, problems solve karna — ye tumhara zone hai. Frontend, Backend, ya Full Stack — bahut saare exciting raste hain aage badhne ke liye!',
        en: "You're a natural builder! Writing code, creating apps, solving complex problems — that's your zone. Frontend, Backend, or Full Stack — many exciting paths await!",
        skills: ['JavaScript / Python / Java', 'React / Node.js / Next.js', 'Database (SQL + MongoDB)', 'Git, GitHub & DevOps basics'],
        salary: '₹4L – ₹25L+ / year',
        pathHi: 'BCA/B.Tech → Internship → Junior Dev → Senior Dev → Tech Lead',
        pathEn: 'BCA/B.Tech → Internship → Junior Dev → Senior Dev → Tech Lead',
        scopeHi: '🔥 Bahut zyada — literally har company ko developers chahiye',
        scopeEn: '🔥 Extremely high — literally every company needs developers',
    },
    qa: {
        title: 'QA Engineer / Software Tester', emoji: '🔍',
        color: '#a78bfa', glow: 'rgba(167,139,250,.3)',
        hi: 'Tum detail-oriented aur systematic ho! QA Engineers ensure karte hain ki koi bhi software release se pehle bilkul perfect kaam kare. Ye underrated par bahut valuable aur stable career hai.',
        en: "You're detail-oriented and systematic! QA Engineers ensure software works perfectly before every release. This is underrated but extremely valuable and stable.",
        skills: ['Manual & Automation Testing', 'Selenium / Cypress / Playwright', 'Bug Reporting (JIRA, Bugzilla)', 'Agile / Scrum methodologies'],
        salary: '₹3.5L – ₹18L+ / year',
        pathHi: 'BCA/B.Tech → ISTQB Cert → Junior QA → QA Lead → QA Manager',
        pathEn: 'BCA/B.Tech → ISTQB Cert → Junior QA → QA Lead → QA Manager',
        scopeHi: '✅ Stable demand — fintech, healthcare, e-commerce mein khas demand',
        scopeEn: '✅ Stable demand — especially strong in fintech, healthcare, e-commerce',
    },
    ds: {
        title: 'Data Scientist / Data Analyst', emoji: '📊',
        color: '#34d399', glow: 'rgba(52,211,153,.3)',
        hi: 'Numbers aur patterns tumhara obsession hai! Tum raw data se meaningful stories nikaalte ho. AI/ML boom ke saath ye field explosive growth mein hai — sahi time hai entry karne ka!',
        en: "Numbers and patterns are your obsession! You extract meaningful stories from raw data. With the AI/ML boom, this field is in explosive growth — perfect time to enter!",
        skills: ['Python / R programming', 'Machine Learning & AI', 'SQL + Tableau / Power BI', 'Statistics & Probability'],
        salary: '₹5L – ₹30L+ / year',
        pathHi: 'B.Tech/BSc → Python + ML Courses → Data Analyst → Data Scientist → ML Engineer',
        pathEn: 'B.Tech/BSc → Python + ML Courses → Data Analyst → Data Scientist → ML Engineer',
        scopeHi: '🚀 Fastest growing — AI ki wajah se demand 10x ho rahi hai rapidly',
        scopeEn: '🚀 Fastest growing field — demand is 10x higher due to the AI revolution',
    },
    cyber: {
        title: 'Cybersecurity Analyst / Ethical Hacker', emoji: '🛡️',
        color: '#f97316', glow: 'rgba(249,115,22,.3)',
        hi: 'Tum ek digital detective ho! Systems ko secure karna, hackers ko rokna aur vulnerabilities dhundna — ye tumhara calling hai. Ethical hacking ek thrilling aur high-paying career path hai!',
        en: "You're a digital detective! Securing systems, stopping hackers, finding vulnerabilities — that's your calling. Ethical hacking is a thrilling, high-paying career!",
        skills: ['Network Security fundamentals', 'Kali Linux / Metasploit / Burp Suite', 'CEH / CISSP / CompTIA Security+', 'Penetration Testing & VAPT'],
        salary: '₹5L – ₹35L+ / year',
        pathHi: 'B.Tech → CEH Cert → SOC Analyst → Senior Security Engineer → CISO',
        pathEn: 'B.Tech → CEH Cert → SOC Analyst → Senior Security Engineer → CISO',
        scopeHi: '🔐 Critical demand — cyber attacks tezi se badh rahe hain globally',
        scopeEn: '🔐 Critical demand — cyber attacks are rising rapidly worldwide',
    },
    pm: {
        title: 'Product Manager / IT Project Manager', emoji: '📋',
        color: '#fbbf24', glow: 'rgba(251,191,36,.3)',
        hi: 'Tum ek natural leader ho! Team lead karna, strategy banana, users ki zaroorat samajhna aur decisions lena — ye tumhara gift hai. PM role mein technical + business dono skills kaam aati hain!',
        en: "You're a natural leader! Leading teams, building strategy, understanding users and making key decisions — that's your gift. The PM role blends technical and business skills!",
        skills: ['Agile / Scrum / Kanban', 'Product Roadmapping & Strategy', 'Stakeholder Management', 'JIRA / Notion / Figma / Miro'],
        salary: '₹6L – ₹40L+ / year',
        pathHi: 'Any Degree → MBA/PMP Cert → Associate PM → PM → Senior PM → VP Product',
        pathEn: 'Any Degree → MBA/PMP Cert → Associate PM → PM → Senior PM → VP Product',
        scopeHi: '⭐ Very high — har product company mein ye ek critical role hai',
        scopeEn: '⭐ Very high — a critical role in every single product company',
    }
};

const BAR_COLORS = { dev: '#00d4ff', qa: '#a78bfa', ds: '#34d399', cyber: '#f97316', pm: '#fbbf24' };
const BAR_NAMES = { dev: 'Developer', qa: 'QA Eng.', ds: 'Data Sci.', cyber: 'Cybersec', pm: 'Product Mgr' };

/* ─── HELPERS ───────────────────────────────────────── */
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    el.classList.add('active');
    // scroll to top on screen change
    const wrap = el.querySelector('.scroll-wrap');
    if (wrap) wrap.scrollTop = 0;
}

function t(key) { return T[lang][key]; }

/* ─── LANGUAGE SWITCH ───────────────────────────────── */
function setLang(l, btn) {
    lang = l;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const t = T[l];
    document.getElementById('hBadge').textContent = t.badge;
    document.getElementById('hT1').textContent = t.t1;
    document.getElementById('hT2').textContent = t.t2;
    document.getElementById('hSub').textContent = t.sub;
    document.getElementById('hMeta').textContent = t.meta;
    ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].forEach(k => {
        document.getElementById(k + 't').textContent = t[k + 't'];
        document.getElementById(k + 's').textContent = t[k + 's'];
    });
    document.getElementById('startBtn').textContent = t.start;
}

/* ─── QUIZ LOGIC ────────────────────────────────────── */
function startQuiz() {
    cur = 0;
    scores = { dev: 0, qa: 0, ds: 0, cyber: 0, pm: 0 };
    locked = false;
    showScreen('quizScreen');
    renderQ();
}

function renderQ() {
    const q = Qs[cur];
    const pct = Math.round((cur / Qs.length) * 100);

    document.getElementById('qNum').textContent = t('qOf').replace('{a}', cur + 1).replace('{b}', Qs.length);
    document.getElementById('qPct').textContent = pct + '%';
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('qLbl').textContent = 'Q' + (cur + 1);
    document.getElementById('qTxt').textContent = lang === 'hinglish' ? q.hi : q.en;

    const wrap = document.getElementById('optsWrap');
    wrap.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.opts.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.innerHTML =
            `<span class="opt-letter">${letters[i]}</span>` +
            `<span>${lang === 'hinglish' ? o.hi : o.en}</span>`;
        btn.onclick = () => pick(o, btn);
        wrap.appendChild(btn);
    });

    // re-trigger animation
    ['qCard', 'optsWrap'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('anim');
        void el.offsetWidth;
        el.classList.add('anim');
    });
}

function pick(opt, btn) {
    if (locked) return;
    locked = true;
    btn.classList.add('sel');
    document.querySelectorAll('.opt').forEach(b => b.classList.add('done'));
    Object.keys(opt.v).forEach(k => scores[k] += opt.v[k]);

    setTimeout(() => {
        locked = false;
        if (cur + 1 < Qs.length) {
            cur++;
            renderQ();
        } else {
            showResult();
        }
    }, 520);
}

/* ─── RESULT ────────────────────────────────────────── */
function showResult() {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = sorted[0][0];
    const c = CAREERS[top];
    const maxVal = Math.max(...Object.values(scores));

    const barsHTML = sorted.slice(0, 4).map(([k, v]) => {
        const pct = Math.round((v / maxVal) * 100);
        return `
      <div class="bar-row">
        <div class="bar-lbl">${BAR_NAMES[k]}</div>
        <div class="bar-track"><div class="bar-fill" style="width:0%;background:${BAR_COLORS[k]}" data-w="${pct}"></div></div>
        <div class="bar-pct">${pct}%</div>
      </div>`;
    }).join('');

    document.getElementById('resDiv').innerHTML = `
    <div class="res-label">${t('resLbl')}</div>
    <span class="res-emoji">${c.emoji}</span>
    <h1 class="res-title" style="color:${c.color};text-shadow:0 0 28px ${c.glow}">${c.title}</h1>

    <div class="res-desc">${lang === 'hinglish' ? c.hi : c.en}</div>

    <div class="res-grid">
      <div class="res-card">
        <div class="res-card-lbl" style="color:${c.color}">${t('lSkills')}</div>
        <div class="res-card-val">${c.skills.join(' &bull; ')}</div>
      </div>
      <div class="res-card">
        <div class="res-card-lbl" style="color:${c.color}">${t('lSalary')}</div>
        <div class="res-card-val">${c.salary}</div>
      </div>
      <div class="res-card" style="grid-column:1/-1">
        <div class="res-card-lbl" style="color:${c.color}">${t('lPath')}</div>
        <div class="res-card-val">${lang === 'hinglish' ? c.pathHi : c.pathEn}</div>
      </div>
      <div class="res-card" style="grid-column:1/-1">
        <div class="res-card-lbl" style="color:${c.color}">${t('lScope')}</div>
        <div class="res-card-val">${lang === 'hinglish' ? c.scopeHi : c.scopeEn}</div>
      </div>
    </div>

    <div class="match-wrap">
      <div class="match-title">${t('matchTitle')}</div>
      ${barsHTML}
    </div>

    <button class="retry-btn" onclick="goHome()">${t('retry')}</button>
  `;

    showScreen('resultScreen');

    // animate bars after paint
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll('.bar-fill').forEach(el => {
                el.style.width = el.dataset.w + '%';
            });
        }, 200);
    });
}

function goHome() { showScreen('homeScreen'); }