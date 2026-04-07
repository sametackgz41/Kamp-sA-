import { useState } from 'react';
import { createPortal } from 'react-dom';
import { initialJobs, initialNotes, initialTalkPosts, initialAnnouncements, guideRoadmaps } from './data/mockData';
import './index.css';

// ==================== SVGs ====================
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Briefcase: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Book: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Map: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>,
  School: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>,
  LogOut: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  ExternalLink: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  Star: ({ filled }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#FBBF24" : "none"} stroke={filled ? "#FBBF24" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

// ==================== AUTH COMPONENT ====================
function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('ogrenci');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [department, setDepartment] = useState('YBS');
  const [gradYear, setGradYear] = useState('');
  const [gradDoc, setGradDoc] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark'));

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    if(newDark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || (!isLogin && !name)) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    const isSchoolEmail = email.endsWith('@ogr.uludag.edu.tr');

    if (role === 'ogrenci' || role === 'yonetici') {
      if (!isSchoolEmail) {
        setError('Öğrenci ve Yönetici kayıtları sadece @ogr.uludag.edu.tr adresi ile yapılabilir.');
        return;
      }
    } else if (role === 'mezun') {
      if (isSchoolEmail) {
        setError('Mezunlar okul e-postası kullanamaz. Lütfen kişisel e-posta adresinizi girin.');
        return;
      }
      if (!isLogin && !gradYear) {
        setError('Lütfen mezuniyet yılınızı seçin.');
        return;
      }
      if (!isLogin && !gradDoc) {
        setError('Lütfen mezuniyet belgenizi yükleyin.');
        return;
      }
    }

    const userRoleStr = role === 'ogrenci' ? 'Öğrenci' : role === 'mezun' ? 'Mezun' : 'Yönetici';
    const finalName = isLogin && !name ? `Kullanıcı (${userRoleStr})` : name;
    
    const deptNames = { 'YBS': 'Yönetim Bilişim Sistemleri', 'UTİ': 'Uluslararası Ticaret ve İşletmecilik', 'İŞLETME': 'İşletme' };
    onLogin({
      name: finalName,
      email,
      role,
      roleString: userRoleStr,
      department: (role === 'ogrenci' || role === 'yonetici') ? deptNames[department] || department : 'Mezun',
      departmentCode: department,
      phone: '+90 555 123 45 67',
      communities: ['UYBİST'],
      committees: ['ARGE Komitesi'],
      gradYear: role === 'mezun' ? gradYear : null,
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', position: 'relative' }}>
      <button 
        onClick={toggleTheme}
        className="animate-fade-in"
        style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '24px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'all 0.2s', zIndex: 10, outline: 'none' }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '16px' }}><Icons.School /></div>
          <h1 style={{ color: 'var(--primary)', fontSize: '24px', fontWeight: 'bold' }}>KampüsAğ</h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <button className={`chip ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(null); }}>Giriş Yap</button>
          <button className={`chip ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(null); }}>Kayıt Ol</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Rolünüz</label>
            <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ogrenci">Öğrenci</option>
              <option value="mezun">Mezun</option>
              <option value="yonetici">Yönetici</option>
            </select>
          </div>

          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Ad Soyad</label>
              <input type="text" className="input-field" placeholder="Adınız Soyadınız" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          {!isLogin && (role === 'ogrenci' || role === 'yonetici') && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Bölümünüz *</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { code: 'YBS', label: 'Yönetim Bilişim Sistemleri' },
                  { code: 'UTİ', label: 'Uluslararası Ticaret ve İşletmecilik' },
                  { code: 'İŞLETME', label: 'İşletme' }
                ].map(dept => (
                  <button 
                    type="button" 
                    key={dept.code} 
                    onClick={() => setDepartment(dept.code)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: department === dept.code ? 'bold' : '500',
                      backgroundColor: department === dept.code ? 'var(--primary)' : 'var(--background)',
                      color: department === dept.code ? 'white' : 'var(--text-main)',
                      border: department === dept.code ? '2px solid var(--primary)' : '2px solid var(--border)',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLogin && role === 'mezun' && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Mezuniyet Yılı *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map(y => (
                  <button
                    type="button"
                    key={y}
                    onClick={() => setGradYear(String(y))}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: gradYear === String(y) ? 'bold' : '500',
                      backgroundColor: gradYear === String(y) ? 'var(--primary)' : 'var(--background)',
                      color: gradYear === String(y) ? 'white' : 'var(--text-main)',
                      border: gradYear === String(y) ? '2px solid var(--primary)' : '2px solid var(--border)',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLogin && role === 'mezun' && (
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Mezuniyet Belgesi *</label>
              <input type="file" className="input-field" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setGradDoc(e.target.files[0])} />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>PDF, JPG veya PNG formatında mezuniyet belgenizi yükleyin.</p>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>E-Posta Adresi</label>
            <input type="email" className="input-field" placeholder={role === 'mezun' ? "Kişisel E-Postanız" : "Okul E-Postanız (numara@ogr.uludag.edu.tr)"} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>Şifre</label>
            <input type="password" className="input-field" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <div className="error-box animate-fade-in">{error}</div>}

          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==================== PROFILE MODAL COMPONENT ====================
function ProfileModal({ user, onClose, onLogout, userEvents, setUserEvents, userJobs, setUserJobs, announcements, jobs }) {
  const studentNo = user.email.includes('@') ? user.email.split('@')[0] : 'Bilinmiyor';

  const appliedJobsList = jobs.filter(j => userJobs.includes(j.id));
  const joinedEventsList = announcements.filter(e => userEvents.find(ue => ue.id === e.id));

  const toggleEventJoin = (id) => {
    setUserEvents(userEvents.filter(ue => ue.id !== id));
  };
  
  const toggleJobApply = (id) => {
    setUserJobs(userJobs.filter(jId => jId !== id));
  };

  const rateEvent = (id, rating) => {
    setUserEvents(userEvents.map(ue => ue.id === id ? { ...ue, rating } : ue));
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>Profilim</h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><Icons.X /></button>
        </div>

        {/* Identity & Basic Info */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
          <div className="avatar" style={{ width: '64px', height: '64px', fontSize: '24px' }}>{user.name[0].toUpperCase()}</div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{user.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{user.roleString} • {user.department}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>Öğrenci No: <strong>{studentNo}</strong></p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {user.communities.map((c, i) => (
            <span key={i} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#2563EB', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
              👥 {c}
            </span>
          ))}
          {user.committees.map((c, i) => (
            <span key={i} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
              ⚙️ {c}
            </span>
          ))}
        </div>

        {/* Contact Info */}
        <div style={{ padding: '16px', backgroundColor: 'var(--input-bg)', borderRadius: '12px', marginBottom: '24px' }}>
          <h4 style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '12px' }}>İletişim Bilgileri</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>
            📞 {user.phone}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
            📧 {user.email}
          </div>
        </div>

        {/* Kayıtlı Etkinlikler */}
        <h4 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px', color: 'var(--primary)' }}>Kayıtlı Etkinlikler</h4>
        {joinedEventsList.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>Kayıtlı etkinliğiniz bulunmuyor.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {joinedEventsList.map(e => {
              const eventRecord = userEvents.find(ue => ue.id === e.id);
              return (
                <div key={e.id} style={{ border: '1px solid var(--border)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{e.title}</span>
                    <button onClick={() => toggleEventJoin(e.id)} style={{ color: 'var(--danger)', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icons.Trash /> İptal Et
                    </button>
                  </div>
                  {/* Rating System */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '8px' }}>Puanınız:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => rateEvent(e.id, star)}>
                        <Icons.Star filled={eventRecord.rating >= star} />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Staj ve İş Başvurularım */}
        <h4 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px', color: 'var(--primary)' }}>Staj & İş Başvurularım</h4>
        {appliedJobsList.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>Henüz bir staja başvurmadınız.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {appliedJobsList.map(j => (
              <div key={j.id} style={{ border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{j.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{j.company}</div>
                </div>
                <button onClick={() => toggleJobApply(j.id)} style={{ color: 'var(--danger)', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icons.Trash /> İptal Et
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Çıkış Yap */}
        <button 
          className="btn-primary" 
          style={{ backgroundColor: '#FEE2E2', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto' }}
          onClick={onLogout}
        >
          <Icons.LogOut /> Çıkış Yap
        </button>
      </div>
    </div>
  );
}

// ==================== TABS ====================

function DuyurularTab({ user, userEvents, setUserEvents, announcements, setAnnouncements }) {
  const [filterDept, setFilterDept] = useState('TÜMÜ');
  const [filterComm, setFilterComm] = useState('TÜMÜ');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', department: 'YBS', committee: 'ORGANİZASYON' });
  const [toast, setToast] = useState(null);

  const filtered = announcements.filter(item => {
    const matchDept = filterDept === 'TÜMÜ' || item.department === filterDept || item.department === 'TÜMÜ';
    const matchComm = filterComm === 'TÜMÜ' || item.committee === filterComm;
    return matchDept && matchComm;
  });

  const isJoined = (id) => !!userEvents.find(e => e.id === id);

  const toggleJoin = (id) => {
    if (isJoined(id)) {
      setUserEvents(userEvents.filter(e => e.id !== id));
    } else {
      setUserEvents([...userEvents, { id, rating: 0 }]);
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.description) {
      setToast({ msg: 'Lütfen tüm alanları doldurun.', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    const created = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      department: newEvent.department,
      committee: newEvent.committee,
      participants: 0,
      createdBy: user.name
    };
    setAnnouncements([created, ...announcements]);
    setShowCreateModal(false);
    setNewEvent({ title: '', date: '', description: '', department: 'YBS', committee: 'ORGANİZASYON' });
    setToast({ msg: 'Etkinlik/Duyuru başarıyla oluşturuldu!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Bu duyuruyu silmek istediğinize emin misiniz?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
      setToast({ msg: 'Duyuru silindi.', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ color: 'var(--primary)' }}>Duyurular ve Etkinlikler</h2>
        {user.role === 'yonetici' && (
          <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'auto', padding: '10px 20px' }}>
            <Icons.Plus /> Yeni Oluştur
          </button>
        )}
      </div>
      
      <div className="card" style={{ marginBottom: '20px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Filtrele</h4>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>BÖLÜM:</label>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
            {['TÜMÜ', 'YBS', 'UTİ', 'İŞLETME'].map(dept => (
              <button 
                key={dept} 
                onClick={() => setFilterDept(dept)}
                className={`chip ${filterDept === dept ? 'active' : ''}`}
                style={{ padding: '4px 12px', fontSize: '12px' }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>KOMİTE:</label>
          <select className="input-field" style={{ padding: '8px', fontSize: '13px', marginTop: '4px' }} value={filterComm} onChange={e => setFilterComm(e.target.value)}>
            <option value="TÜMÜ">Tümü</option>
            <option value="ORGANİZASYON">Organizasyon</option>
            <option value="ARGE">Ar-Ge</option>
            <option value="SOSYAL MEDYA">Sosyal Medya</option>
            <option value="SOSYAL SORUMLULUK">Sosyal Sorumluluk</option>
            <option value="SPONSORLUK">Sponsorluk</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Bu kriterlere uygun duyuru bulunamadı.</p>}
        {filtered.map(event => (
          <div key={event.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)', flex: 1 }}>{event.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{event.date}</span>
                {user.role === 'yonetici' && (
                  <button onClick={() => handleDeleteEvent(event.id)} style={{ color: 'var(--danger)', padding: '4px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.1)' }}>
                    <Icons.Trash />
                  </button>
                )}
              </div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>{event.description}</p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span style={{ backgroundColor: 'rgba(26,54,93,0.1)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{event.department}</span>
              <span style={{ backgroundColor: 'var(--background)', color: '#4B5563', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{event.committee}</span>
              {event.createdBy && (
                <span style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#059669', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>✍️ {event.createdBy}</span>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>👥 {event.participants + (isJoined(event.id) ? 1 : 0)} Katılımcı</span>
              <button 
                onClick={() => toggleJoin(event.id)}
                style={{ backgroundColor: isJoined(event.id) ? 'var(--success)' : 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}
              >
                {isJoined(event.id) ? (user.role === 'mezun' ? 'Misafirsin ✓' : 'Kaydoldun ✓') : (user.role === 'mezun' ? 'Misafir Ol' : 'Kayıt Ol')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Yönetici: Yeni Duyuru/Etkinlik Oluşturma Modalı */}
      {showCreateModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>📢 Yeni Duyuru / Etkinlik</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ color: 'var(--text-muted)' }}><Icons.X /></button>
            </div>
            
            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Başlık *</label>
                <input type="text" className="input-field" placeholder="Örn: Yapay Zeka Konferansı" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Tarih *</label>
                <input type="text" className="input-field" placeholder="Örn: 15 Haziran 2026" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Açıklama *</label>
                <textarea className="input-field" rows="3" placeholder="Etkinlik detaylarını yazın..." value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} style={{ resize: 'none' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Bölüm</label>
                  <select className="input-field" value={newEvent.department} onChange={e => setNewEvent({...newEvent, department: e.target.value})}>
                    <option value="YBS">YBS</option>
                    <option value="UTİ">UTİ</option>
                    <option value="İŞLETME">İşletme</option>
                    <option value="TÜMÜ">Tümü (Ortak)</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Komite</label>
                  <select className="input-field" value={newEvent.committee} onChange={e => setNewEvent({...newEvent, committee: e.target.value})}>
                    <option value="ORGANİZASYON">Organizasyon</option>
                    <option value="ARGE">Ar-Ge</option>
                    <option value="SOSYAL MEDYA">Sosyal Medya</option>
                    <option value="SOSYAL SORUMLULUK">Sosyal Sorumluluk</option>
                    <option value="SPONSORLUK">Sponsorluk</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Oluştur ve Yayınla</button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {toast && createPortal(
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444', color: 'white', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10000, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>,
        document.body
      )}
    </div>
  );
}

function StatsAndJobsTab({ user, userJobs, setUserJobs, jobs, setJobs }) {
  const [expandedId, setExpandedId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '', type: 'Staj', description: '', requirements: '' });
  const [toast, setToast] = useState(null);

  const toggleApply = (e, id) => {
    e.stopPropagation();
    if (userJobs.includes(id)) {
      setUserJobs(userJobs.filter(j => j !== id));
    } else {
      setUserJobs([...userJobs, id]);
    }
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company || !newJob.location || !newJob.description) {
      setToast({ msg: 'Lütfen tüm zorunlu alanları doldurun.', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    const reqArray = newJob.requirements.split(',').map(r => r.trim()).filter(Boolean);
    const created = {
      id: Date.now(),
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      type: newJob.type,
      description: newJob.description,
      requirements: reqArray.length > 0 ? reqArray : ['Belirtilmemiş'],
      createdBy: user.name
    };
    setJobs([created, ...jobs]);
    setShowCreateModal(false);
    setNewJob({ title: '', company: '', location: '', type: 'Staj', description: '', requirements: '' });
    setToast({ msg: 'Staj/İş ilanı başarıyla oluşturuldu!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteJob = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      setJobs(jobs.filter(j => j.id !== id));
      setToast({ msg: 'İlan silindi.', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--primary)' }}>Staj ve Başvurular</h2>
        {user.role === 'yonetici' && (
          <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'auto', padding: '10px 20px' }}>
            <Icons.Plus /> Yeni İlan Ekle
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {jobs.map(job => (
          <div key={job.id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--background)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Icons.Briefcase />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {user.role === 'yonetici' && (
                      <button onClick={(e) => handleDeleteJob(e, job.id)} style={{ color: 'var(--danger)', padding: '4px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.1)' }}>
                        <Icons.Trash />
                      </button>
                    )}
                    <button 
                      onClick={(e) => toggleApply(e, job.id)}
                      style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', backgroundColor: userJobs.includes(job.id) ? 'var(--success)' : 'var(--background)', color: userJobs.includes(job.id) ? 'white' : 'var(--text-main)', border: '1px solid #D1D5DB' }}
                    >
                      {userJobs.includes(job.id) ? 'Başvuruldu ✓' : 'Başvur'}
                    </button>
                  </div>
                </div>
                <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px', marginTop: '4px' }}>{job.company}</p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>📍 {job.location}</span>
                  <span style={{ backgroundColor: 'rgba(26,54,93,0.1)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>{job.type}</span>
                  {job.createdBy && (
                    <span style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#059669', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>✍️ {job.createdBy}</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Extended Info */}
            {expandedId === job.id && (
              <div className="animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Genel Nitelikler ve İş Tanımı</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px' }}>{job.description}</p>
                
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Gereksinimler</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Yönetici: Yeni Staj/İş İlanı Oluşturma Modalı */}
      {showCreateModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>💼 Yeni Staj / İş İlanı</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ color: 'var(--text-muted)' }}><Icons.X /></button>
            </div>
            
            <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Pozisyon Adı *</label>
                <input type="text" className="input-field" placeholder="Örn: Frontend Geliştirici Stajyeri" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Şirket *</label>
                  <input type="text" className="input-field" placeholder="Örn: TechCorp A.Ş." value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Konum *</label>
                  <input type="text" className="input-field" placeholder="Örn: İstanbul" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Çalışma Türü</label>
                <select className="input-field" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                  <option value="Staj">Staj</option>
                  <option value="Tam Zamanlı">Tam Zamanlı</option>
                  <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                  <option value="Uzaktan">Uzaktan</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>İş Tanımı *</label>
                <textarea className="input-field" rows="3" placeholder="Pozisyon ve görevler hakkında detaylı bilgi..." value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} style={{ resize: 'none' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Gereksinimler <span style={{ fontSize: '11px' }}>(virgülle ayırın)</span></label>
                <input type="text" className="input-field" placeholder="Örn: React, Node.js, İngilizce" value={newJob.requirements} onChange={e => setNewJob({...newJob, requirements: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>İlanı Yayınla</button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {toast && createPortal(
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444', color: 'white', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10000, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>,
        document.body
      )}
    </div>
  );
}

function RehberTab({ user, roadmaps, setRoadmaps }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoadmap, setNewRoadmap] = useState({ title: '', pathTitle: '', techs: '', desc: '' });
  const [toast, setToast] = useState(null);

  // AI States
  const [aiMessages, setAiMessages] = useState([{role: 'ai', text: 'Merhaba! Kariyer hedeflerin ve yol haritaların hakkında bana ne istersen sorabilirsin.'}]);
  const [aiInput, setAiInput] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if(!aiInput.trim() || isAILoading) return;
    
    const userMsg = {role: 'user', text: aiInput};
    setAiMessages(prev => [...prev, userMsg]);
    setAiInput('');
    setIsAILoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setAiMessages(prev => [...prev, {role: 'ai', text: '⚠️ [SİSTEM ŞİFRESİ EKSİK]: Lütfen sistem yöneticilerinden (veya panelden) Gemini API şifrenizi ekleyin.'}]);
        setIsAILoading(false);
        return;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Senin adın "Luminia AI". Sen KampüsAğ platformunda üniversite öğrencilerine yardım eden profesyonel bir Akademi ve Kariyer Koçusun. Lütfen sorulan soruya kendi adını ve kimliğini bilerek samimi, arkadaşça ve oldukça öz (en fazla 2 kısa paragraf) şekilde yanıt ver. Soru: ${userMsg.text}`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        let replyText = data.candidates[0].content.parts[0].text;
        replyText = replyText.replace(/\*/g, ''); // Temizleme
        setAiMessages(prev => [...prev, {role: 'ai', text: replyText}]);
      } else {
        setAiMessages(prev => [...prev, {role: 'ai', text: 'Üzgünüm, şu an bağlantı kuramıyorum.'}]);
      }
    } catch (err) {
      setAiMessages(prev => [...prev, {role: 'ai', text: 'Ağ hatası veya bağlantı sorunu oluştu.'}]);
    }
    
    setIsAILoading(false);
  };

  const handleCreateRoadmap = (e) => {
    e.preventDefault();
    if(!newRoadmap.title || !newRoadmap.pathTitle) {
      setToast({ msg: 'Lütfen zorunlu alanları doldurun', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    
    const newEntry = {
      id: Date.now().toString(),
      title: newRoadmap.title,
      paths: [{
        pathTitle: newRoadmap.pathTitle,
        techs: newRoadmap.techs.split(',').map(t => t.trim()).filter(t => t),
        desc: newRoadmap.desc
      }]
    };
    
    setRoadmaps([newEntry, ...roadmaps]);
    setShowCreateModal(false);
    setNewRoadmap({ title: '', pathTitle: '', techs: '', desc: '' });
    setToast({ msg: 'Kariyer Haritası eklendi!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Kariyer Rehberi (Yol Haritası)</h2>
      
      {/* Inline AI Chat Window */}
      <div className="card" style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden', border: '1px solid var(--border)', height: '350px', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '15px' }}>✨ Luminia AI</span>
          <span style={{ fontSize: '12px', opacity: 0.9 }}>Size yardım etmek için burada</span>
        </div>
        
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'var(--input-bg)' }}>
          {aiMessages.map((msg, i) => (
            <div key={i} className="animate-fade-in" style={{ alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end', backgroundColor: msg.role === 'ai' ? 'var(--card-bg)' : 'var(--primary)', color: msg.role === 'ai' ? 'var(--text-main)' : 'white', padding: '10px 14px', borderRadius: '12px', maxWidth: '85%', fontSize: '14px', boxShadow: 'var(--shadow-sm)', border: msg.role === 'ai' ? '1px solid var(--border)' : 'none', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
              {msg.text}
            </div>
          ))}
          {isAILoading && (
            <div className="animate-fade-in" style={{ alignSelf: 'flex-start', backgroundColor: 'var(--card-bg)', color: 'var(--text-muted)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontStyle: 'italic', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
              Düşünüyor...
            </div>
          )}
        </div>

        <form onSubmit={handleAISubmit} style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', backgroundColor: 'var(--card-bg)' }}>
          <input type="text" className="input-field" placeholder="Bana danış..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} disabled={isAILoading} style={{ padding: '10px 12px', flex: 1, fontSize: '14px' }} />
          <button type="submit" className="btn-primary" disabled={isAILoading} style={{ padding: '10px 20px', width: 'auto', fontWeight: 'bold' }}>Gönder</button>
        </form>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 'bold' }}>Bölümünüze Özel Kariyer Haritaları</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Bölümünüze özel belirlenen alt kariyer uzantılarını ve gereksinimlerini inceleyin:</p>
        </div>
        {user.role === 'yonetici' && (
          <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'auto', padding: '10px 20px', alignSelf: 'flex-start' }}>
            <Icons.Plus /> Yeni Ekle
          </button>
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {roadmaps.map(group => (
          <div key={group.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <button 
              onClick={() => setActiveAccordion(activeAccordion === group.id ? null : group.id)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: activeAccordion === group.id ? 'var(--hover-bg)' : 'var(--card-bg)' }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--text-main)' }}>{group.title}</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)', transform: activeAccordion === group.id ? 'rotate(45deg)' : 'rotate(0)' }}>
                <Icons.Plus />
              </span>
            </button>
            {activeAccordion === group.id && (
              <div className="animate-fade-in" style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {group.paths.map((path, idx) => (
                  <div key={idx}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '8px' }}>{path.pathTitle}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '8px' }}>{path.desc}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {path.techs.map((tech, ti) => (
                        <span key={ti} style={{ backgroundColor: 'var(--background)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showCreateModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>🗺️ Yeni Kariyer Haritası</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ color: 'var(--text-muted)' }}><Icons.X /></button>
            </div>
            
            <form onSubmit={handleCreateRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Grup/Bölüm Adı *</label>
                <input type="text" className="input-field" placeholder="Örn: Bilgisayar Mühendisliği" value={newRoadmap.title} onChange={e => setNewRoadmap({...newRoadmap, title: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Alt Rota (Alan) Adı *</label>
                <input type="text" className="input-field" placeholder="Örn: Veri Bilimi" value={newRoadmap.pathTitle} onChange={e => setNewRoadmap({...newRoadmap, pathTitle: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Açıklama</label>
                <textarea className="input-field" rows="3" placeholder="Bu kariyer rotası ne yapar? İlerlemek için ne gerekir?" value={newRoadmap.desc} onChange={e => setNewRoadmap({...newRoadmap, desc: e.target.value})} style={{ resize: 'none' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>Gereksinimler/Teknolojiler <span style={{ fontSize: '11px' }}>(virgülle ayırın)</span></label>
                <input type="text" className="input-field" placeholder="Örn: Python, SQL, Makine Öğrenmesi" value={newRoadmap.techs} onChange={e => setNewRoadmap({...newRoadmap, techs: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Haritayı Ekle</button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {toast && createPortal(
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444', color: 'white', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10000, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>,
        document.body
      )}
    </div>
  );
}

function AkademiTab({ user }) {
  const [notes, setNotes] = useState(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [toast, setToast] = useState(null);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if(!newCourse || !newTitle || !newFile) {
      setToast({ msg: 'Lütfen zorunlu alanları doldurun (Dosya dahil)', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const newNote = {
      id: Date.now(),
      title: newTitle,
      course: newCourse,
      uploader: user.name, // Assigning ownership to logged in user
      date: 'Şimdi',
      type: newFile.name.split('.').pop().toUpperCase().substring(0, 4),
      fileUrl: URL.createObjectURL(newFile),
      fileName: newFile.name
    };
    
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
    setNewCourse('');
    setNewTitle('');
    setNewDesc('');
    setNewFile(null);
    
    setToast({ msg: 'Materyal başarıyla yüklendi!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };


  const getFileContent = (note) => {
    return `KampüsAğ - Ders Notu\n\nBaşlık: ${note.title}\nDers: ${note.course}\nYükleyen: ${note.uploader}\nTarih: ${note.date}\n\nBu dosya, KampüsAğ platformu üzerinden indirdiğiniz örnek bir ders notu içeriğidir.`;
  };

  const handleDownload = (note) => {
    if (note.fileUrl) {
      const a = document.createElement('a');
      a.href = note.fileUrl;
      a.download = note.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    const content = getFileContent(note);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/\\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpen = (note) => {
    if (note.fileUrl) {
      window.open(note.fileUrl, '_blank');
      return;
    }
    const content = getFileContent(note);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };
  const handleDelete = (id) => {
    if(window.confirm('Bu notu silmek istediğinize emin misiniz?')) {
      setNotes(notes.filter(n => n.id !== id));
      setToast({ msg: 'Not başarıyla silindi!', type: 'success'});
      setTimeout(() => setToast(null), 3000);
    }
  }

  return (
    <div className="animate-fade-in" style={{ padding: '20px', position: 'relative' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Akademi | Ders Notları</h2>
      <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
        <Icons.Plus /> Yeni Materyal Yükle
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notes.map(note => (
          <div key={note.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ padding: '12px', backgroundColor: note.type === 'PDF' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: note.type === 'PDF' ? '#EF4444' : '#3B82F6', borderRadius: '12px' }}>
                  <Icons.Book />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>{note.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{note.course} • {note.uploader}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{note.date}</span>
                {note.uploader === user.name && (
                  <button onClick={() => handleDelete(note.id)} style={{ color: 'var(--danger)', padding: '4px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.1)' }}>
                    <Icons.Trash />
                  </button>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <button onClick={() => handleDownload(note)} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '13px', fontWeight: 'bold' }}>
                <Icons.Download /> İndir
              </button>
              <button onClick={() => handleOpen(note)} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '13px', fontWeight: 'bold', marginLeft: '12px' }}>
                <Icons.ExternalLink /> Aç (Görüntüle)
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>Yeni Materyal Yükle</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-muted)' }}><Icons.X /></button>
            </div>
            
            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Ders Adı *</label>
                <select className="input-field" value={newCourse} onChange={e => setNewCourse(e.target.value)}>
                  <option value="">-- Ders Seçiniz --</option>
                  <option value="Veri Yapıları">Veri Yapıları</option>
                  <option value="Sistem Analizi ve Tasarımı">Sistem Analizi ve Tasarımı</option>
                  <option value="Pazarlama İlkeleri">Pazarlama İlkeleri</option>
                  <option value="Dış Ticaret İşlemleri">Dış Ticaret İşlemleri</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Başlık *</label>
                <input type="text" className="input-field" placeholder="Örn: 2026 Güz Vize Soruları" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Açıklama</label>
                <textarea className="input-field" rows="2" placeholder="Not içeriği hakkında bilgi..." value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ resize: 'none' }}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>Dosya (Zorunlu) *</label>
                <input type="file" className="input-field" onChange={e => setNewFile(e.target.files[0])} />
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>* Sistem destekli bir tarayıcıda seçtiğiniz dosyayı "İndir" veya "Aç" dediğinizde gerçeğini döndürür.</p>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Yükle</button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {toast && createPortal(
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444', color: 'white', padding: '12px 24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10000, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>,
        document.body
      )}
    </div>
  );
}

function MezunTalkTab({ user }) {
  const [posts, setPosts] = useState(initialTalkPosts);
  const [newContent, setNewContent] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  const handlePost = () => {
    if (!newContent.trim()) return;
    const post = {
      id: Date.now(),
      authorName: user.name,
      authorTitle: 'Yeni Mezun / ' + user.department,
      content: newContent,
      likes: 0,
      likedBy: [],
      comments: []
    };
    setPosts([post, ...posts]);
    setNewContent('');
  };

  const toggleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        const hasLiked = p.likedBy.includes(user.name);
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          likedBy: hasLiked ? p.likedBy.filter(name => name !== user.name) : [...p.likedBy, user.name]
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: Date.now(), author: user.name, content: text }]
        };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleDeleteComment = (postId, commentId) => {
    if(window.confirm('Bu yorumunuzu silmek istiyor musunuz?')){
      setPosts(posts.map(p => {
        if(p.id === postId) {
          return {
            ...p,
            comments: p.comments.filter(c => c.id !== commentId)
          }
        }
        return p;
      }));
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>MezunTalk</h2>
      
      {user.role === 'mezun' && (
        <div className="card" style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea 
            className="input-field" 
            rows="3" 
            placeholder="Sektörel deneyimlerinizi mezun ağıyla paylaşın..." 
            value={newContent} 
            onChange={e => setNewContent(e.target.value)}
            style={{ resize: 'none' }}
          />
          <button className="btn-primary" style={{ alignSelf: 'flex-end', width: 'auto' }} onClick={handlePost}>Gönder</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '30px' }}>
        {posts.map(post => {
          const hasLiked = post.likedBy.includes(user.name);
          const showComments = activeCommentPost === post.id;

          return (
            <div key={post.id} className="card">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <div className="avatar">{post.authorName[0].toUpperCase()}</div>
                <div>
                  <h4 style={{ fontWeight: 'bold' }}>{post.authorName}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{post.authorTitle}</p>
                </div>
              </div>
              <p style={{ lineHeight: '1.6', fontSize: '15px' }}>{post.content}</p>
              
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => toggleLike(post.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: hasLiked ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 'bold' }}
                >
                  {hasLiked ? '👍 Beğendin' : '👍 Beğen'} ({post.likes})
                </button>
                <button 
                  onClick={() => setActiveCommentPost(showComments ? null : post.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: showComments ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '500' }}
                >
                  💬 Yorum Yap ({post.comments.length})
                </button>
              </div>

              {/* Comments Section */}
              {showComments && (
                <div className="animate-fade-in" style={{ marginTop: '16px', padding: '16px', backgroundColor: 'var(--input-bg)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Yorumunuzu yazın..." 
                      style={{ padding: '8px 12px' }}
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    />
                    <button 
                      className="btn-primary" 
                      style={{ width: 'auto', padding: '8px 16px', fontSize: '14px' }}
                      onClick={() => handleAddComment(post.id)}
                    >
                      Yayınla
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {post.comments.length === 0 && <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Henüz yorum yapılmamış. İlk yorumu sen yap!</p>}
                    {post.comments.map(c => (
                      <div key={c.id} style={{ display: 'flex', gap: '8px' }}>
                        <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '12px', flexShrink: 0 }}>{c.author[0]}</div>
                        <div style={{ backgroundColor: 'var(--card-bg)', padding: '10px 12px', borderRadius: '12px', border: '1px solid var(--border)', width: '100%', position: 'relative' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{c.author}</span>
                            {c.author === user.name && (
                              <button onClick={() => handleDeleteComment(post.id, c.id)} style={{ color: 'var(--danger)' }}>
                                <Icons.Trash />
                              </button>
                            )}
                          </div>
                          <span style={{ fontSize: '14px' }}>{c.content}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}

// ==================== SETTINGS MODAL ====================
function SettingsModal({ user, onClose }) {
  const [activeTab, setActiveTab] = useState('genel');
  const [notifications, setNotifications] = useState({ push: true, email: false, sms: false });
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark'));

  const toggleTheme = (dark) => {
    setIsDarkMode(dark);
    if(dark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  };

  return (
    <div className="modal-overlay animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--input-bg)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Settings /> Ayarlar
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><Icons.X /></button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
          <div style={{ width: '100%', maxWidth: '180px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            {['Genel', 'Güvenlik', 'Bildirimler', 'Görünüm'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                style={{ textAlign: 'left', padding: '16px', fontWeight: '500', backgroundColor: activeTab === tab.toLowerCase() ? 'var(--hover-bg)' : 'var(--card-bg)', borderLeft: activeTab === tab.toLowerCase() ? '4px solid var(--primary)' : '4px solid transparent', color: activeTab === tab.toLowerCase() ? 'var(--primary)' : 'var(--text-main)', borderBottom: '1px solid var(--border)' }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, padding: '24px', minHeight: '350px' }}>
            {activeTab === 'genel' && (
              <div className="animate-fade-in">
                <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: 'var(--primary)', fontSize: '18px' }}>Genel Hesap Bilgileri</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Görünen Ad</label>
                    <input type="text" className="input-field" value={user.name} disabled style={{ backgroundColor: 'var(--background)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Okul E-Postası</label>
                    <input type="email" className="input-field" value={user.email} disabled style={{ backgroundColor: 'var(--background)' }} />
                  </div>
                  <button className="btn-primary" style={{ backgroundColor: 'var(--danger)', marginTop: '24px', width: 'auto', alignSelf: 'flex-start' }} onClick={() => confirm('Hesabınızı kalıcı olarak silmek istediğinize emin misiniz?')}>Hesabımı Sil</button>
                </div>
              </div>
            )}

            {activeTab === 'güvenlik' && (
              <div className="animate-fade-in">
                <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: 'var(--primary)', fontSize: '18px' }}>Şifre Değiştirme</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input type="password" className="input-field" placeholder="Mevcut Şifreniz" />
                  <input type="password" className="input-field" placeholder="Yeni Şifre" />
                  <input type="password" className="input-field" placeholder="Yeni Şifre (Tekrar)" />
                  <button className="btn-primary" style={{ width: 'auto', alignSelf: 'flex-start' }} onClick={() => alert('Şifre başarıyla güncellendi.')}>Şifreyi Güncelle</button>
                </div>
              </div>
            )}

            {activeTab === 'bildirimler' && (
              <div className="animate-fade-in">
                <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: 'var(--primary)', fontSize: '18px' }}>Bildirim Tercihleri</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { key: 'push', label: 'Cihaz İçi Push Bildirimleri' },
                    { key: 'email', label: 'E-Posta Düzenli Bülten' },
                    { key: 'sms', label: 'Duyurular İçin SMS Bildirimleri' }
                  ].map(item => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                      <button 
                        onClick={() => setNotifications(prev => ({...prev, [item.key]: !prev[item.key]}))}
                        style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: notifications[item.key] ? 'var(--primary)' : '#D1D5DB', position: 'relative', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }}
                      >
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--card-bg)', position: 'absolute', top: '2px', left: notifications[item.key] ? '22px' : '2px', transition: 'left 0.2s' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'görünüm' && (
              <div className="animate-fade-in">
                <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: 'var(--primary)', fontSize: '18px' }}>Tema Ayarları</h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button onClick={() => toggleTheme(false)} style={{ flex: 1, padding: '24px', borderRadius: '12px', border: !isDarkMode ? '2px solid var(--primary)' : '2px solid var(--border)', backgroundColor: !isDarkMode ? 'rgba(26,54,93,0.05)' : '#F9FAFB', color: '#1F2937', fontWeight: 'bold', transition: 'all 0.2s' }}>Aydınlık Tema</button>
                  <button onClick={() => toggleTheme(true)} style={{ flex: 1, padding: '24px', borderRadius: '12px', border: isDarkMode ? '2px solid var(--primary)' : '2px solid var(--border)', backgroundColor: isDarkMode ? '#1F2937' : '#111827', color: '#F9FAFB', fontWeight: 'bold', transition: 'all 0.2s' }}>Karanlık Tema</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN LAYOUT ====================
export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('duyurular');

  const [userEvents, setUserEvents] = useState([]); 
  const [userJobs, setUserJobs] = useState([]); 
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [jobs, setJobs] = useState(initialJobs);
  const [roadmaps, setRoadmaps] = useState(guideRoadmaps);
  
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  const tabs = [
    { id: 'duyurular', label: 'Duyurular', icon: <Icons.Home /> },
    { id: 'kariyer', label: 'Staj/Kariyer', icon: <Icons.Briefcase /> },
    { id: 'rehber', label: 'Rehber', icon: <Icons.Map /> },
    { id: 'akademi', label: 'Akademi', icon: <Icons.School /> },
    { id: 'talk', label: 'MezunTalk', icon: <Icons.Message /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'duyurular': return <DuyurularTab user={user} userEvents={userEvents} setUserEvents={setUserEvents} announcements={announcements} setAnnouncements={setAnnouncements} />;
      case 'kariyer': return <StatsAndJobsTab user={user} userJobs={userJobs} setUserJobs={setUserJobs} jobs={jobs} setJobs={setJobs} />;
      case 'rehber': return <RehberTab user={user} roadmaps={roadmaps} setRoadmaps={setRoadmaps} />;
      case 'akademi': return <AkademiTab user={user} />;
      case 'talk': return <MezunTalkTab user={user} />;
      default: return <DuyurularTab user={user} userEvents={userEvents} setUserEvents={setUserEvents} announcements={announcements} setAnnouncements={setAnnouncements} />;
    }
  };

  return (
    <div className="app-container animate-fade-in">
      <aside style={{
        width: '260px', backgroundColor: 'var(--card-bg)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '24px', height: '100vh', position: 'sticky', top: 0
      }} className="desktop-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ color: 'var(--primary)' }}><Icons.School /></div>
          <h2 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '20px' }}>KampüsAğ</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <div 
            onClick={() => setShowProfile(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(26,54,93,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="avatar">{user.name[0].toUpperCase()}</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-main)' }}>{user.name}</div>
              <div style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '500' }}>Kişisel Profilim</div>
            </div>
          </div>
          <button 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 'bold', width: '100%', padding: '10px', backgroundColor: 'transparent', borderRadius: '8px', border: '1px solid var(--border)' }}
            onClick={() => setShowSettings(true)}
          >
            <Icons.Settings /> Menü & Ayarlar
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="mobile-header" style={{
          backgroundColor: 'var(--card-bg)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ color: 'var(--primary)' }}><Icons.School /></div>
            <h2 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '18px' }}>KampüsAğ</h2>
          </div>
          <button onClick={() => setShowSettings(true)} style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)' }}>
            <Icons.Settings />
          </button>
        </header>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {renderContent()}
          </div>
        </div>

        <nav className="mobile-bottom-nav" style={{
          backgroundColor: 'var(--card-bg)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-around', padding: '8px 4px', zIndex: 50
        }}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              {tab.icon}
              <span style={{ fontSize: '10px', fontWeight: activeTab === tab.id ? 'bold' : 'normal', textAlign: 'center' }}>
                {tab.label.replace(' / ', '\n')}
              </span>
            </button>
          ))}
        </nav>
      </main>

      {showProfile && (
        <ProfileModal 
          user={user} 
          onClose={() => setShowProfile(false)} 
          onLogout={() => { setShowProfile(false); setUser(null); }}
          userEvents={userEvents} setUserEvents={setUserEvents}
          userJobs={userJobs} setUserJobs={setUserJobs}
          announcements={announcements}
          jobs={jobs}
        />
      )}

      {showSettings && (
        <SettingsModal 
          user={user} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      <style>{`
        .desktop-sidebar { display: flex !important; }
        .mobile-header { display: none !important; }
        .mobile-bottom-nav { display: none !important; }

        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .mobile-bottom-nav { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
