document.addEventListener('DOMContentLoaded',()=>{
  // Landing Page
  const getStartedBtn = document.getElementById('get-started-btn');
  const landing = document.getElementById('landing');
  const appContainer = document.getElementById('app-container');
  
  if(getStartedBtn){
    getStartedBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      landing.classList.add('hidden');
      appContainer.classList.remove('hidden');
      setTimeout(()=>{ if(window._pw_start) window._pw_start(); }, 100);
    });
  }

  // Particles
  (function(){
    const canvas = document.getElementById('bg-particles');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w=0, h=0;
    const particles = [];
    function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
    window.addEventListener('resize',resize);
    resize();
    for(let i=0;i<25;i++){
      particles.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*1.2+0.4, vx:(Math.random()-0.5)*0.06, vy:(Math.random()-0.5)*0.06, alpha:0.04+Math.random()*0.08});
    }
    let running=true;
    function draw(){
      if(!running) return;
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<-10) p.x=w+10; if(p.x>w+10) p.x=-10;
        if(p.y<-10) p.y=h+10; if(p.y>h+10) p.y=-10;
        ctx.beginPath();
        ctx.globalAlpha=p.alpha;
        ctx.fillStyle='#ffffff';
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha=1;
      requestAnimationFrame(draw);
    }
    window._pw_start = ()=>{ running=true; requestAnimationFrame(draw); };
    window._pw_stop = ()=>{ running=false; };
    requestAnimationFrame(draw);
  })();

  // DOM Elements
  const numSubjectsInput = document.getElementById('num-subjects');
  const syncSubjectsBtn = document.getElementById('sync-subjects');
  const hoursInput = document.getElementById('available-hours');
  const subjectsList = document.getElementById('subjects-list');
  const addSubjectBtn = document.getElementById('add-subject');
  const generateBtn = document.getElementById('generate-plan');
  const planOutput = document.getElementById('plan-output');

  const timerEl = document.getElementById('timer');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const sessionCountEl = document.getElementById('session-count');
  const focusInput = document.getElementById('focus-minutes');
  const breakInput = document.getElementById('break-minutes');
  const phaseEl = document.getElementById('timer-phase');

  const navTimetable = document.getElementById('nav-timetable');
  const navPomodoro = document.getElementById('nav-pomodoro');
  const plannerCard = document.getElementById('planner');
  const pomodoroCard = document.getElementById('focus-timer');

  // Utility
  function todayKey(){ return new Date().toISOString().slice(0,10); }

  // Pomodoro Timer
  let remaining = 25*60;
  let timerId = null;
  let currentPhase = 'focus';

  function pauseTimer(){
    if(timerId){ clearInterval(timerId); timerId=null; }
    document.body.classList.remove('calm-mode');
    if(window._pw_stop) window._pw_stop();
  }

  function resetTimer(){
    pauseTimer();
    currentPhase='focus';
    const f = Math.max(1, parseInt(focusInput.value||25, 10));
    remaining = f*60;
    renderTime();
  }

  function tick(){
    remaining--;
    if(remaining<=0){
      clearInterval(timerId);
      timerId=null;
      onTimerComplete();
      return;
    }
    renderTime();
  }

  function renderTime(){
    const m = Math.floor(remaining/60);
    const s = remaining%60;
    timerEl.style.opacity='0';
    setTimeout(()=>{
      timerEl.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      timerEl.style.opacity='1';
      if(phaseEl) phaseEl.textContent = currentPhase==='focus' ? 'Focus' : 'Break';
    }, 80);
  }

  function startTimer(){
    if(timerId){ clearInterval(timerId); timerId=null; }
    if(currentPhase==='focus'){
      const f = Math.max(1, parseInt(focusInput.value||25, 10));
      remaining = f*60;
      document.body.classList.add('calm-mode');
      if(window._pw_start) window._pw_start();
    } else {
      const b = Math.max(1, parseInt(breakInput.value||5, 10));
      remaining = b*60;
    }
    timerId = setInterval(tick, 1000);
    renderTime();
  }

  function loadSessions(){
    const data = JSON.parse(localStorage.getItem('pw_sessions')||'{}');
    return data[todayKey()]||0;
  }

  function saveSessions(n){
    const data = JSON.parse(localStorage.getItem('pw_sessions')||'{}');
    data[todayKey()]=n;
    localStorage.setItem('pw_sessions', JSON.stringify(data));
  }

  function updateSessionUI(){
    if(sessionCountEl) sessionCountEl.textContent = loadSessions();
  }

  function onTimerComplete(){
    try{
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type='sine';
      o.frequency.value=880;
      g.gain.value=0.06;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(()=>{ o.stop(); ctx.close(); }, 200);
    }catch(e){}

    if(currentPhase==='focus'){
      const current = loadSessions();
      saveSessions(current+1);
      updateSessionUI();
      currentPhase='break';
      const b = Math.max(1, parseInt(breakInput.value||5, 10));
      remaining = b*60;
      renderTime();
      startTimer();
    } else {
      currentPhase='focus';
      const f = Math.max(1, parseInt(focusInput.value||25, 10));
      remaining = f*60;
      renderTime();
      startTimer();
    }
  }

  updateSessionUI();
  renderTime();

  if(startBtn) startBtn.addEventListener('click', startTimer);
  if(pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
  if(resetBtn) resetBtn.addEventListener('click', resetTimer);

  // Subject Management
  function addSubjectRow(name='', difficulty='Medium'){
    const row = document.createElement('div');
    row.className = 'subject-row';
    
    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Subject name';
    nameInput.value = name;
    nameInput.type = 'text';
    
    const diff = document.createElement('select');
    ['Easy','Medium','Hard'].forEach(v=>{
      const o = document.createElement('option');
      o.text = v;
      if(v===difficulty) o.selected = true;
      diff.appendChild(o);
    });
    
    const rem = document.createElement('button');
    rem.className = 'btn';
    rem.textContent = 'Remove';
    rem.addEventListener('click', (e)=>{
      e.preventDefault();
      row.remove();
    });
    
    row.appendChild(nameInput);
    row.appendChild(diff);
    row.appendChild(rem);
    subjectsList.appendChild(row);
  }

  if(subjectsList && subjectsList.children.length===0){
    addSubjectRow();
    addSubjectRow();
    addSubjectRow();
  }

  if(addSubjectBtn) addSubjectBtn.addEventListener('click', addSubjectRow);

  if(syncSubjectsBtn) syncSubjectsBtn.addEventListener('click',()=>{
    const n = Math.max(1, Math.min(12, parseInt(numSubjectsInput.value||3, 10)));
    const current = subjectsList.querySelectorAll('.subject-row').length;
    if(n > current) for(let i=0; i<n-current; i++) addSubjectRow();
    else if(n < current) for(let i=0; i<current-n; i++) {
      const last = subjectsList.querySelector('.subject-row:last-child');
      if(last) last.remove();
    }
  });

  // Timetable Generation
  function generatePlan(){
    const hours = parseFloat(hoursInput.value)||0;
    const availableMinutes = Math.max(0, Math.floor(hours*60));
    const rows = Array.from(subjectsList.querySelectorAll('.subject-row'));
    let subjects = rows.map(r=>({
      name: r.querySelector('input').value.trim()||'Unnamed',
      diff: r.querySelector('select').value,
      weight: r.querySelector('select').value==='Easy'?1: r.querySelector('select').value==='Medium'?2:3
    })).filter(s=>s.name);

    if(subjects.length===0){
      planOutput.innerHTML='<div class="small">Please add at least one subject.</div>';
      return;
    }

    const sumWeight = subjects.reduce((a,s)=> a + s.weight, 0);
    let studyBudget = Math.max(0, Math.floor((availableMinutes * 0.85)));
    subjects.forEach(s=> s.allocated = Math.max(1, Math.round((s.weight / sumWeight) * studyBudget)));

    const schedule = [];
    let lastDiff = null;
    const pool = subjects.map(s=> ({...s}));
    
    while(pool.some(p=> p.allocated>0)){
      let pick = null;
      if(lastDiff==='Hard'){
        pick = pool.find(p=> p.allocated>0 && p.diff!=='Hard');
      }
      if(!pick) pick = pool.find(p=> p.allocated>0);
      if(!pick) break;
      
      const take = Math.min(pick.allocated, 30);
      schedule.push({type:'study', name: pick.name, diff: pick.diff, minutes: take});
      pick.allocated -= take;
      lastDiff = pick.diff;
      schedule.push({type:'break', minutes:5});
    }

    while(schedule.length && schedule[schedule.length-1].type!=='study') schedule.pop();

    planOutput.innerHTML = '';
    if(schedule.length===0){
      planOutput.innerHTML = '<div class="small">No schedule could be generated.</div>';
      return;
    }

    schedule.forEach((item,i)=>{
      const el = document.createElement('div');
      el.className = 'block';
      if(item.type==='study'){
        el.innerHTML = `<strong>${item.name}</strong> <span class="small">(${item.diff})</span> — ${item.minutes}min`;
      } else {
        el.innerHTML = `<em>Break</em> — ${item.minutes}min`;
      }
      planOutput.appendChild(el);
      setTimeout(()=>el.classList.add('show'), 30 + i*60);
    });
  }

  if(generateBtn) generateBtn.addEventListener('click', generatePlan);

  // Section Toggle
  function showSection(section){
    if(section==='timetable'){
      plannerCard.classList.remove('hidden');
      pomodoroCard.classList.add('hidden');
      pauseTimer();
      navTimetable.classList.add('active');
      navPomodoro.classList.remove('active');
    } else {
      pomodoroCard.classList.remove('hidden');
      plannerCard.classList.add('hidden');
      renderTime();
      navPomodoro.classList.add('active');
      navTimetable.classList.remove('active');
    }
  }

  if(navTimetable) navTimetable.addEventListener('click', (e)=>{
    e.preventDefault();
    showSection('timetable');
  });
  
  if(navPomodoro) navPomodoro.addEventListener('click', (e)=>{
    e.preventDefault();
    showSection('pomodoro');
  });

  showSection('timetable');
});
