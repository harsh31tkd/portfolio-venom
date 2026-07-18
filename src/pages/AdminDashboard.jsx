import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeBackground } from '@imgly/background-removal';
import {
  getExperience, saveExperience,
  getCompanyProjects, saveCompanyProjects,
  getPersonalProjects, savePersonalProjects,
  getCertificates, saveCertificates,
  getEducation, saveEducation,
  getIntro, saveIntro,
  getQuickLinks, saveQuickLinks,
  getContact, saveContact,
  getEducationSkills, saveEducationSkills,
  getEducationImage, saveEducationImage
} from '../backend/db';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from 'react-icons/fa';

export const calculateDuration = (fromDate, toDate, isCurrent) => {
  if (!fromDate) return '';
  const start = new Date(fromDate);
  const end = isCurrent || !toDate ? new Date() : new Date(toDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  months += 1; // Inclusive of current month
  
  if (months <= 0) return '';
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  let result = [];
  if (years > 0) result.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (remainingMonths > 0) result.push(`${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`);
  
  return result.join(' ');
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const DynamicModal = ({ config, onClose }) => {
  const [formData, setFormData] = useState(config.initialData || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    config.onSave(formData);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '2px solid var(--accent-red)', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 0 30px rgba(226, 54, 54, 0.2)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>{config.title}</h2>
        <form onSubmit={handleSubmit}>
          {config.fields.filter(f => !f.condition || f.condition(formData)).map(f => (
            <div key={f.name} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea name={f.name} value={formData[f.name] || ''} onChange={handleChange} required={f.required !== false} style={{ width: '100%', padding: '0.75rem', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '100px', fontFamily: 'inherit' }} />
              ) : f.type === 'checkbox' ? (
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <input type="checkbox" name={f.name} checked={!!formData[f.name]} onChange={handleChange} /> 
                   <span style={{ fontSize: '0.9rem', color: '#888' }}>Yes</span>
                 </div>
              ) : f.type === 'select' ? (
                <select name={f.name} value={formData[f.name] || ''} onChange={handleChange} required={f.required !== false} style={{ width: '100%', padding: '0.75rem', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}>
                  <option value="" disabled>Select an option</option>
                  {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input 
                  type={f.type || 'text'} 
                  name={f.name} 
                  value={formData[f.name] || ''} 
                  onChange={handleChange} 
                  required={f.required !== false} 
                  style={{ width: '100%', padding: '0.75rem', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} 
                  onClick={(e) => {
                    if (f.type === 'date' || f.type === 'month') {
                      try {
                        e.target.showPicker();
                      } catch (err) {
                        // Ignore if not supported
                      }
                    }
                  }}
                />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DraggableSkillPreview = ({ skills, setSkills, saveSkills, imageSrc }) => {
  const [draggingId, setDraggingId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handlePointerDown = (e, id) => {
    e.preventDefault();
    setDraggingId(id);
  };

  useEffect(() => {
    if (!draggingId) return;

    const handlePointerMove = (e) => {
      const container = document.getElementById('skill-preview-container');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      let x = ((e.clientX - rect.left) / rect.width) * 100;
      let y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Clamp values
      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      setSkills(prev => prev.map(s => s.id === draggingId ? { ...s, x, y } : s));
    };

    const handlePointerUp = () => {
      setDraggingId(null);
      // Save to localStorage when drag ends
      setSkills(prev => {
        saveSkills(prev);
        return prev;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingId, setSkills, saveSkills]);

  return (
    <div 
      id="skill-preview-container"
      style={{ 
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        width: isFullscreen ? '100vw' : '100%', 
        maxWidth: isFullscreen ? 'none' : '600px', 
        height: isFullscreen ? '100vh' : '500px', 
        margin: isFullscreen ? 0 : '0 auto',
        border: isFullscreen ? 'none' : '2px dashed #444',
        borderRadius: isFullscreen ? '0' : '8px',
        overflow: 'hidden',
        background: '#050505',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        touchAction: 'none',
        zIndex: isFullscreen ? 99999 : 1
      }}
    >
      <button 
        onClick={() => setIsFullscreen(!isFullscreen)}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 100000,
          background: 'var(--accent-red)',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {isFullscreen ? 'Exit Full Screen' : 'Full Screen Editor'}
      </button>

      {/* Background Image */}
      <img 
        src={imageSrc || '/image.png'} 
        alt="Education Preview" 
        style={{ 
          width: '100%', 
          maxWidth: isFullscreen ? '600px' : '400px', 
          objectFit: 'contain', 
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0.8
        }} 
      />

      {/* Skills */}
      {skills.map((skill) => (
        <div
          key={skill.id}
          onPointerDown={(e) => handlePointerDown(e, skill.id)}
          style={{
            position: 'absolute',
            left: skill.x !== undefined ? `${skill.x}%` : '50%',
            top: skill.y !== undefined ? `${skill.y}%` : '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: skill.zIndex || 50,
            background: draggingId === skill.id ? '#a855f7' : '#4ade80',
            color: '#000',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            cursor: draggingId === skill.id ? 'grabbing' : 'grab',
            userSelect: 'none',
            fontWeight: 'bold',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            transition: draggingId === skill.id ? 'none' : 'background 0.2s',
            fontFamily: 'monospace'
          }}
        >
          {`<${skill.name} />`}
        </div>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [bgLoading, setBgLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // State for all data
  const [experience, setExperience] = useState([]);
  const [companyProjects, setCompanyProjects] = useState([]);
  const [personalProjects, setPersonalProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [education, setEducation] = useState([]);
  const [intro, setIntro] = useState({ title: '', subtitle: '', bio: '' });
  const [quickLinks, setQuickLinks] = useState([]);
  const [contact, setContact] = useState([]);
  const [educationSkills, setEducationSkills] = useState([]);
  const [educationImage, setEducationImage] = useState(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('venom_auth_token')) {
      navigate('/admin');
      return;
    }
    // Load all data
    setExperience(getExperience());
    setCompanyProjects(getCompanyProjects());
    setPersonalProjects(getPersonalProjects());
    setCertificates(getCertificates());
    setEducation(getEducation());
    setIntro(getIntro());
    setQuickLinks(getQuickLinks());
    setContact(getContact());
    setEducationSkills(getEducationSkills());
    setEducationImage(getEducationImage());
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('venom_auth_token');
    navigate('/');
  };

  // Helper to open modal
  const openModal = (title, fields, initialData, onSave) => {
    setModalConfig({ title, fields, initialData, onSave });
  };

  // Generic move handler
  const handleMove = (setter, saver, state, index, direction) => {
    const updated = [...state];
    if (direction === 'up' && index > 0) {
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    } else if (direction === 'down' && index < state.length - 1) {
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    }
    setter(updated);
    saver(updated);
  };

  // Generic delete handler
  const handleDelete = (setter, saver, state, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const updated = state.filter(i => i.id !== id);
    setter(updated);
    saver(updated);
  };

  // Intro edit handler
  const handleIntroChange = (e, field) => {
    const newIntro = { ...intro, [field]: e.target.value };
    setIntro(newIntro);
    saveIntro(newIntro);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setBgLoading(true);
    try {
      // Remove background
      const blob = await removeBackground(file);
      
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        
        // Resize image to prevent localStorage quota issues
        const img = new Image();
        img.src = base64data;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Max dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const resizedBase64 = canvas.toDataURL('image/png', 0.8);
          
          const newIntro = { ...intro, bgImage: resizedBase64 };
          setIntro(newIntro);
          saveIntro(newIntro);
          setBgLoading(false);
        };
      };
    } catch (err) {
      console.error("Background removal failed:", err);
      alert("Failed to process image. Try a smaller file.");
      setBgLoading(false);
    }
  };

  const handleEducationImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setBgLoading(true);
    try {
      const blob = await removeBackground(file);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        const img = new Image();
        img.src = base64data;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const resizedBase64 = canvas.toDataURL('image/webp', 0.8);
          setEducationImage(resizedBase64);
          saveEducationImage(resizedBase64);
          setBgLoading(false);
        };
      };
    } catch (err) {
      console.error("Background removal failed:", err);
      alert("Failed to process image. Try a smaller file.");
      setBgLoading(false);
    }
  };

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading Symbiote OS...</div>;

  const sidebarTabs = [
    { id: 'intro', label: 'Introduction' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills & Graphics' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'links', label: 'Links & Contact' }
  ];

  const renderActionButtons = (setter, saver, state, item, index) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <button onClick={() => handleMove(setter, saver, state, index, 'up')} disabled={index === 0} style={{ background: 'none', border: 'none', color: index === 0 ? '#444' : '#fff', cursor: index === 0 ? 'not-allowed' : 'pointer' }} title="Move Up"><FaArrowUp /></button>
      <button onClick={() => handleMove(setter, saver, state, index, 'down')} disabled={index === state.length - 1} style={{ background: 'none', border: 'none', color: index === state.length - 1 ? '#444' : '#fff', cursor: index === state.length - 1 ? 'not-allowed' : 'pointer' }} title="Move Down"><FaArrowDown /></button>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
      
      {/* Modal Overlay */}
      {modalConfig && (
        <DynamicModal config={modalConfig} onClose={() => setModalConfig(null)} />
      )}

      {/* Sidebar */}
      <div style={{ 
        width: isSidebarOpen ? '250px' : '0px', 
        overflow: 'hidden',
        transition: 'width 0.3s',
        backgroundColor: '#111',
        borderRight: '2px solid var(--accent-red)',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '2rem 1rem', borderBottom: '1px solid #333' }}>
          <h2 style={{ fontFamily: 'var(--font-comic)', color: 'var(--accent-red)', fontSize: '1.5rem', textAlign: 'center' }}>Control Center</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {sidebarTabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(226, 54, 54, 0.2)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === tab.id ? '4px solid var(--accent-red)' : '4px solid transparent',
                color: activeTab === tab.id ? 'var(--accent-red)' : '#ccc',
                padding: '1rem',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: '0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ padding: '1rem' }}>
          <button onClick={handleLogout} className="btn-secondary" style={{ width: '100%' }}>Disconnect</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        
        {/* Topbar */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', marginRight: '1rem' }}
          >
            <GiHamburgerMenu size={30} />
          </button>
          <h1 style={{ fontFamily: 'var(--font-venom)', fontSize: '2.5rem', color: '#a855f7' }}>
            {sidebarTabs.find(t => t.id === activeTab)?.label}
          </h1>
        </div>

        {/* --- INTRO TAB --- */}
        {activeTab === 'intro' && (
          <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Edit Home Introduction</h3>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Title (e.g. HARSH)</label>
              <input type="text" value={intro.title} onChange={e => handleIntroChange(e, 'title')} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#000', color: '#fff', border: '1px solid #444' }} />

              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Subtitle</label>
              <input type="text" value={intro.subtitle} onChange={e => handleIntroChange(e, 'subtitle')} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#000', color: '#fff', border: '1px solid #444' }} />

              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Bio (Use emojis freely)</label>
              <textarea value={intro.bio} onChange={e => handleIntroChange(e, 'bio')} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#000', color: '#fff', border: '1px solid #444', minHeight: '150px' }} />
            </div>

            <div style={{ borderTop: '1px solid #333', paddingTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Background Image (Auto-Remove BG)</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={bgLoading} style={{ display: 'block', marginBottom: '1rem' }} />
              {bgLoading && <p style={{ color: '#eab308' }}>Processing image and removing background... (This might take a few seconds)</p>}
              {intro.bgImage && !bgLoading && (
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                  <img src={intro.bgImage} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <button onClick={() => {
                    const newIntro = { ...intro, bgImage: null };
                    setIntro(newIntro);
                    saveIntro(newIntro);
                  }} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaTrash /> Remove Background Image</button>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid #333', paddingTop: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-red)' }}>Dynamic Buttons</h3>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#ccc', borderLeft: '4px solid #a855f7' }}>
                <strong style={{ color: '#fff' }}>Internal Link:</strong> Navigates to a page within this website instantly (e.g., <code>/contact</code>, <code>/experience</code>).<br/>
                <strong style={{ color: '#fff' }}>External Link:</strong> Opens a completely different website or file in a new browser tab (e.g., <code>https://your-resume.pdf</code>, <code>https://github.com</code>).
              </div>
              <button className="btn-primary" style={{ marginBottom: '1rem' }} onClick={() => {
                openModal('Add Button', [
                  { name: 'label', label: 'Button Label (e.g. View Projects)' },
                  { name: 'link', label: 'Link URL or Path' },
                  { name: 'isExternal', label: 'Is External Link?', type: 'checkbox' }
                ], null, (data) => {
                  const newBtn = { id: Date.now().toString(), label: data.label, link: data.link, isExternal: data.isExternal === 'on' };
                  const newIntro = { ...intro, buttons: [...(intro.buttons || []), newBtn] };
                  setIntro(newIntro);
                  saveIntro(newIntro);
                });
              }}>+ Add Button</button>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {(intro.buttons || []).map((btn, index) => (
                  <div key={btn.id} style={{ background: '#222', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{btn.label}</strong> <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: '0.5rem' }}>({btn.link})</span>
                      <div style={{ color: btn.isExternal ? '#eab308' : '#4ade80', fontSize: '0.8rem', marginTop: '0.25rem' }}>{btn.isExternal ? 'External Link' : 'Internal Link'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {renderActionButtons(
                        (updatedBtns) => { const newIntro = { ...intro, buttons: updatedBtns }; setIntro(newIntro); saveIntro(newIntro); },
                        () => {}, 
                        intro.buttons || [], 
                        btn, 
                        index
                      )}
                      <button onClick={() => {
                        openModal('Edit Button', [
                          { name: 'label', label: 'Button Label (e.g. View Projects)' },
                          { name: 'link', label: 'Link URL or Path' },
                          { name: 'isExternal', label: 'Is External Link?', type: 'checkbox' }
                        ], btn, (data) => {
                          const updatedBtns = intro.buttons.map(i => i.id === btn.id ? { ...i, label: data.label, link: data.link, isExternal: data.isExternal === 'on' } : i);
                          const newIntro = { ...intro, buttons: updatedBtns };
                          setIntro(newIntro);
                          saveIntro(newIntro);
                        });
                      }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer' }} title="Edit"><FaEdit /></button>
                      <button onClick={() => {
                        handleDelete(
                          (updatedBtns) => { const newIntro = { ...intro, buttons: updatedBtns }; setIntro(newIntro); saveIntro(newIntro); },
                          () => {},
                          intro.buttons || [],
                          btn.id
                        );
                      }} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- EXPERIENCE TAB --- */}
        {activeTab === 'experience' && (
          <div>
            <button className="btn-primary" style={{ marginBottom: '1rem' }} onClick={() => {
              openModal('Add Experience', [
                { name: 'role', label: 'Role' },
                { name: 'company', label: 'Company' },
                { name: 'link', label: 'Company URL (Optional)', required: false },
                { name: 'appLink', label: 'App URL (Optional)', required: false },
                { name: 'fromDate', label: 'From Date', type: 'date' },
                { name: 'isCurrent', label: 'Currently working here?', type: 'checkbox' },
                { name: 'toDate', label: 'To Date', type: 'date', required: false, condition: data => !data?.isCurrent },
                { name: 'description', label: 'Description (Bullet Points - one per line)', type: 'textarea' }
              ], null, (data) => {
                const points = (data.description || '').split('\n').filter(p => p.trim() !== '');
                const updated = [...experience, { id: Date.now().toString(), ...data, points, isLeft: experience.length % 2 === 0 }];
                setExperience(updated); saveExperience(updated);
              });
            }}>+ Add Experience</button>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {experience.map((exp, index) => (
                <div key={exp.id} style={{ background: '#111', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      {renderActionButtons(setExperience, saveExperience, experience, exp, index)}
                      <div>
                        <strong>{exp.role} - {exp.company}</strong>
                        <p style={{ color: '#888', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
                          {formatDate(exp.fromDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.toDate)} 
                          {exp.fromDate && <span style={{ color: '#a855f7', marginLeft: '0.5rem' }}>({calculateDuration(exp.fromDate, exp.toDate, exp.isCurrent)})</span>}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => {
                        const initialData = { ...exp, description: exp.points?.join('\n') || '' };
                        openModal('Edit Experience', [
                          { name: 'role', label: 'Role' },
                          { name: 'company', label: 'Company' },
                          { name: 'link', label: 'Company URL (Optional)', required: false },
                          { name: 'appLink', label: 'App URL (Optional)', required: false },
                          { name: 'fromDate', label: 'From Date', type: 'date' },
                          { name: 'isCurrent', label: 'Currently working here?', type: 'checkbox' },
                          { name: 'toDate', label: 'To Date', type: 'date', required: false, condition: data => !data?.isCurrent },
                          { name: 'description', label: 'Description (Bullet Points - one per line)', type: 'textarea' }
                        ], initialData, (data) => {
                          const points = (data.description || '').split('\n').filter(p => p.trim() !== '');
                          const updated = experience.map(i => i.id === exp.id ? { ...i, ...data, points } : i);
                          setExperience(updated); saveExperience(updated);
                        });
                      }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }} title="Edit"><FaEdit /></button>
                      <button onClick={() => handleDelete(setExperience, saveExperience, experience, exp.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }} title="Delete"><FaTrash /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- EDUCATION TAB --- */}
        {activeTab === 'education' && (
          <div>
            <button className="btn-primary" style={{ marginBottom: '1rem' }} onClick={() => {
              openModal('Add Education', [
                { name: 'degreeLevel', label: 'Degree Level', type: 'select', options: ['10th', '12th', 'Bachelors', 'Masters', 'PhD', 'Other'] },
                { name: 'degreeName', label: 'Degree Name (e.g. BCA, B.Tech)', condition: data => ['Bachelors', 'Masters', 'Other'].includes(data?.degreeLevel) },
                { name: 'fieldOfStudy', label: 'Field of Study / Specialization', condition: data => ['Bachelors', 'Masters', 'Other'].includes(data?.degreeLevel) },
                { name: 'phdStatus', label: 'Ph.D Status', type: 'select', options: ['Completed', 'Submitted', 'Pursuing'], condition: data => data?.degreeLevel === 'PhD' },
                { name: 'phdThesis', label: 'Thesis Title', condition: data => data?.degreeLevel === 'PhD' },
                { name: 'phdResearchArea', label: 'Research Area', condition: data => data?.degreeLevel === 'PhD' },
                { name: 'institution', label: 'Institution / College / University' },
                { name: 'board', label: 'Board', required: false, condition: data => ['10th', '12th'].includes(data?.degreeLevel) },
                { name: 'pursuing', label: 'Currently Pursuing?', type: 'checkbox' },
                { name: 'fromTo', label: 'Completed At / From-To (e.g. 2020 - 2024)', condition: data => !data?.pursuing },
                { name: 'startingYear', label: 'Starting Year', condition: data => data?.pursuing },
                { name: 'yearOfPassing', label: 'Expected Completion Year', condition: data => data?.pursuing },
                { name: 'percentage', label: 'Percentage / CGPA', condition: data => !data?.pursuing },
                { name: 'description', label: 'Description', type: 'textarea' }
              ], { degreeLevel: 'Bachelors' }, (data) => {
                const updated = [...education, { id: Date.now().toString(), ...data }];
                setEducation(updated); saveEducation(updated);
              });
            }}>+ Add Education</button>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {education.map((edu, index) => (
                <div key={edu.id} style={{ background: '#111', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {renderActionButtons(setEducation, saveEducation, education, edu, index)}
                      <div>
                        <strong>{edu.degreeLevel === 'PhD' ? `PhD in ${edu.phdResearchArea || ''}` : edu.degreeName || edu.degreeLevel} - {edu.institution}</strong>
                        <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
                          {edu.pursuing ? `${edu.startingYear || ''} - Present` : edu.fromTo} • {edu.percentage} {edu.pursuing && '(Pursuing)'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => {
                        openModal('Edit Education', [
                          { name: 'degreeLevel', label: 'Degree Level', type: 'select', options: ['10th', '12th', 'Bachelors', 'Masters', 'PhD', 'Other'] },
                          { name: 'degreeName', label: 'Degree Name (e.g. BCA, B.Tech)', condition: data => ['Bachelors', 'Masters', 'Other'].includes(data?.degreeLevel) },
                          { name: 'fieldOfStudy', label: 'Field of Study / Specialization', condition: data => ['Bachelors', 'Masters', 'Other'].includes(data?.degreeLevel) },
                          { name: 'phdStatus', label: 'Ph.D Status', type: 'select', options: ['Completed', 'Submitted', 'Pursuing'], condition: data => data?.degreeLevel === 'PhD' },
                          { name: 'phdThesis', label: 'Thesis Title', condition: data => data?.degreeLevel === 'PhD' },
                          { name: 'phdResearchArea', label: 'Research Area', condition: data => data?.degreeLevel === 'PhD' },
                          { name: 'institution', label: 'Institution / College / University' },
                          { name: 'board', label: 'Board', required: false, condition: data => ['10th', '12th'].includes(data?.degreeLevel) },
                          { name: 'pursuing', label: 'Currently Pursuing?', type: 'checkbox' },
                          { name: 'fromTo', label: 'Completed At / From-To (e.g. 2020 - 2024)', condition: data => !data?.pursuing },
                          { name: 'startingYear', label: 'Starting Year', condition: data => data?.pursuing },
                          { name: 'yearOfPassing', label: 'Expected Completion Year', condition: data => data?.pursuing },
                          { name: 'percentage', label: 'Percentage / CGPA', condition: data => !data?.pursuing },
                          { name: 'description', label: 'Description', type: 'textarea' }
                        ], edu, (data) => {
                          const updated = education.map(i => i.id === edu.id ? { ...i, ...data } : i);
                          setEducation(updated); saveEducation(updated);
                        });
                      }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }} title="Edit"><FaEdit /></button>
                      <button onClick={() => handleDelete(setEducation, saveEducation, education, edu.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }} title="Delete"><FaTrash /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SKILLS & GRAPHICS TAB --- */}
        {activeTab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Education Background Image</h3>
              <p style={{ color: '#888', marginBottom: '1rem' }}>Upload an image. The background will be removed automatically.</p>
              <input type="file" accept="image/*" onChange={handleEducationImageUpload} disabled={bgLoading} style={{ display: 'block', marginBottom: '1rem' }} />
              {bgLoading && <p style={{ color: '#eab308' }}>Processing image and removing background... (This might take a few seconds)</p>}
              
              {educationImage && !bgLoading && (
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                  <img src={educationImage} alt="Education Preview" style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <button onClick={() => {
                    setEducationImage(null);
                    saveEducationImage(null);
                  }} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaTrash /> Remove Custom Image</button>
                </div>
              )}
            </div>

            <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Visual Skill Positioning</h3>
              <p style={{ color: '#888', marginBottom: '1rem' }}>Drag the skills to position them around the image. Click the edit button below to change Z-Index.</p>
              
              <DraggableSkillPreview 
                skills={educationSkills} 
                setSkills={setEducationSkills} 
                saveSkills={saveEducationSkills} 
                imageSrc={educationImage} 
              />
            </div>

            <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Orbiting Skills</h3>
              <button className="btn-primary" style={{ marginBottom: '1rem' }} onClick={() => {
                openModal('Add Skill', [
                  { name: 'name', label: 'Skill Name (e.g. React.js)' },
                  { name: 'zIndexOption', label: 'Z-Index Position', type: 'select', options: ['Behind Image', 'Over Image'] }
                ], { zIndexOption: 'Over Image' }, (data) => {
                  const zIndex = data.zIndexOption === 'Behind Image' ? 1 : 50;
                  const updated = [...educationSkills, { id: Date.now().toString(), name: data.name, zIndex }];
                  setEducationSkills(updated); saveEducationSkills(updated);
                });
              }}>+ Add Skill</button>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {educationSkills.map((skill, index) => (
                  <div key={skill.id} style={{ background: '#222', padding: '0.5rem 1rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #4ade80' }}>
                    <strong style={{ color: '#fff' }}>{skill.name}</strong>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => {
                        openModal('Edit Skill', [
                          { name: 'name', label: 'Skill Name' },
                          { name: 'zIndexOption', label: 'Z-Index Position', type: 'select', options: ['Behind Image', 'Over Image'] }
                        ], { ...skill, zIndexOption: skill.zIndex === 1 ? 'Behind Image' : 'Over Image' }, (data) => {
                          const zIndex = data.zIndexOption === 'Behind Image' ? 1 : 50;
                          const updated = educationSkills.map(s => s.id === skill.id ? { ...s, name: data.name, zIndex } : s);
                          setEducationSkills(updated); saveEducationSkills(updated);
                        });
                      }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer' }}><FaEdit /></button>
                      <button onClick={() => handleDelete(setEducationSkills, saveEducationSkills, educationSkills, skill.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Company Projects</h3>
              <button className="btn-primary" style={{ marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => {
                openModal('Add Company Project', [
                  { name: 'title', label: 'Title' },
                  { name: 'tech', label: 'Tech Stack' },
                  { name: 'desc', label: 'Description', type: 'textarea' }
                ], null, (data) => {
                  const updated = [...companyProjects, { id: Date.now().toString(), ...data }];
                  setCompanyProjects(updated); saveCompanyProjects(updated);
                });
              }}>+ Add Company Project</button>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {companyProjects.map((p, index) => (
                  <div key={p.id} style={{ background: '#111', padding: '1rem', border: '1px solid #333' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {renderActionButtons(setCompanyProjects, saveCompanyProjects, companyProjects, p, index)}
                        <strong>{p.title}</strong> 
                      </div>
                      <div>
                        <button onClick={() => {
                          openModal('Edit Company Project', [
                            { name: 'title', label: 'Title' },
                            { name: 'tech', label: 'Tech Stack' },
                            { name: 'desc', label: 'Description', type: 'textarea' }
                          ], p, (data) => {
                            const updated = companyProjects.map(i => i.id === p.id ? { ...i, ...data } : i);
                            setCompanyProjects(updated); saveCompanyProjects(updated);
                          });
                        }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}><FaEdit /></button>
                        <button onClick={() => handleDelete(setCompanyProjects, saveCompanyProjects, companyProjects, p.id)} style={{ color:'red', background:'none', border:'none', cursor: 'pointer' }}><FaTrash /></button>
                      </div>
                    </div>
                    <small style={{ color: '#888', display: 'block', marginTop: '0.5rem' }}>{p.tech}</small>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Personal Projects</h3>
              <button className="btn-secondary" style={{ marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => {
                openModal('Add Personal Project', [
                  { name: 'title', label: 'Title' },
                  { name: 'tech', label: 'Tech Stack' },
                  { name: 'desc', label: 'Description', type: 'textarea' }
                ], null, (data) => {
                  const updated = [...personalProjects, { id: Date.now().toString(), ...data }];
                  setPersonalProjects(updated); savePersonalProjects(updated);
                });
              }}>+ Add Personal Project</button>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {personalProjects.map((p, index) => (
                  <div key={p.id} style={{ background: '#111', padding: '1rem', border: '1px solid #333' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {renderActionButtons(setPersonalProjects, savePersonalProjects, personalProjects, p, index)}
                        <strong>{p.title}</strong> 
                      </div>
                      <div>
                        <button onClick={() => {
                          openModal('Edit Personal Project', [
                            { name: 'title', label: 'Title' },
                            { name: 'tech', label: 'Tech Stack' },
                            { name: 'desc', label: 'Description', type: 'textarea' }
                          ], p, (data) => {
                            const updated = personalProjects.map(i => i.id === p.id ? { ...i, ...data } : i);
                            setPersonalProjects(updated); savePersonalProjects(updated);
                          });
                        }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}><FaEdit /></button>
                        <button onClick={() => handleDelete(setPersonalProjects, savePersonalProjects, personalProjects, p.id)} style={{ color:'red', background:'none', border:'none', cursor: 'pointer' }}><FaTrash /></button>
                      </div>
                    </div>
                    <small style={{ color: '#888', display: 'block', marginTop: '0.5rem' }}>{p.tech}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CERTIFICATES TAB --- */}
        {activeTab === 'certificates' && (
          <div>
            <button className="btn-primary" style={{ marginBottom: '1rem' }} onClick={() => {
              openModal('Add Certificate', [
                { name: 'title', label: 'Title' },
                { name: 'date', label: 'Date' },
                { name: 'type', label: 'Type (jpg/pdf)' },
                { name: 'fileUrl', label: 'File URL / Path' }
              ], null, (data) => {
                const updated = [...certificates, { id: Date.now().toString(), ...data }];
                setCertificates(updated); saveCertificates(updated);
              });
            }}>+ Add Certificate</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {certificates.map((cert, index) => (
                <div key={cert.id} style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      {renderActionButtons(setCertificates, saveCertificates, certificates, cert, index)}
                      <div>
                        <strong>{cert.title}</strong>
                        <p style={{ color: '#888', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>{cert.date} • {cert.type}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => {
                        openModal('Edit Certificate', [
                          { name: 'title', label: 'Title' },
                          { name: 'date', label: 'Date' },
                          { name: 'type', label: 'Type (jpg/pdf)' },
                          { name: 'fileUrl', label: 'File URL / Path' }
                        ], cert, (data) => {
                          const updated = certificates.map(i => i.id === cert.id ? { ...i, ...data } : i);
                          setCertificates(updated); saveCertificates(updated);
                        });
                      }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer' }}><FaEdit /></button>
                      <button onClick={() => handleDelete(setCertificates, saveCertificates, certificates, cert.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- LINKS & CONTACT TAB --- */}
        {activeTab === 'links' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Quick Links (Links Page)</h3>
              <button className="btn-primary" style={{ marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => {
                openModal('Add Quick Link', [
                  { name: 'title', label: 'Title' },
                  { name: 'url', label: 'URL' },
                  { name: 'type', label: 'Type (internal/external)' },
                  { name: 'highlight', label: 'Highlight?', type: 'checkbox' }
                ], null, (data) => {
                  const updated = [...quickLinks, { id: Date.now().toString(), ...data, highlight: !!data.highlight }];
                  setQuickLinks(updated); saveQuickLinks(updated);
                });
              }}>+ Add Quick Link</button>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {quickLinks.map((link, index) => (
                  <div key={link.id} style={{ background: '#111', padding: '1rem', border: `1px solid ${link.highlight ? 'var(--accent-red)' : '#333'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {renderActionButtons(setQuickLinks, saveQuickLinks, quickLinks, link, index)}
                        <strong>{link.title}</strong>
                      </div>
                      <div>
                        <button onClick={() => {
                          openModal('Edit Quick Link', [
                            { name: 'title', label: 'Title' },
                            { name: 'url', label: 'URL' },
                            { name: 'type', label: 'Type (internal/external)' },
                            { name: 'highlight', label: 'Highlight?', type: 'checkbox' }
                          ], link, (data) => {
                            const updated = quickLinks.map(i => i.id === link.id ? { ...i, ...data, highlight: !!data.highlight } : i);
                            setQuickLinks(updated); saveQuickLinks(updated);
                          });
                        }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}><FaEdit /></button>
                        <button onClick={() => handleDelete(setQuickLinks, saveQuickLinks, quickLinks, link.id)} style={{ color:'red', background:'none', border:'none', cursor: 'pointer' }}><FaTrash /></button>
                      </div>
                    </div>
                    <small style={{ color: '#888', display: 'block', marginTop: '0.5rem' }}>{link.url} ({link.type})</small>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem', color: '#0077b5' }}>Socials / Connect</h3>
              <button className="btn-secondary" style={{ marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => {
                openModal('Add Social Link', [
                  { name: 'name', label: 'Platform Name' },
                  { name: 'value', label: 'Handle / Value' },
                  { name: 'link', label: 'URL Link' },
                  { name: 'iconType', label: 'Icon (e.g. FaGithub)' },
                  { name: 'color', label: 'Brand Color (e.g. #ff0000)' }
                ], null, (data) => {
                  const updated = [...contact, { id: Date.now().toString(), ...data }];
                  setContact(updated); saveContact(updated);
                });
              }}>+ Add Social Link</button>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {contact.map((c, index) => (
                  <div key={c.id} style={{ background: '#111', padding: '1rem', border: '1px solid #333' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {renderActionButtons(setContact, saveContact, contact, c, index)}
                        <strong>{c.name}</strong>
                      </div>
                      <div>
                        <button onClick={() => {
                          openModal('Edit Social Link', [
                            { name: 'name', label: 'Platform Name' },
                            { name: 'value', label: 'Handle / Value' },
                            { name: 'link', label: 'URL Link' },
                            { name: 'iconType', label: 'Icon (e.g. FaGithub)' },
                            { name: 'color', label: 'Brand Color (e.g. #ff0000)' }
                          ], c, (data) => {
                            const updated = contact.map(i => i.id === c.id ? { ...i, ...data } : i);
                            setContact(updated); saveContact(updated);
                          });
                        }} style={{ color: '#4ade80', background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}><FaEdit /></button>
                        <button onClick={() => handleDelete(setContact, saveContact, contact, c.id)} style={{ color:'red', background:'none', border:'none', cursor: 'pointer' }}><FaTrash /></button>
                      </div>
                    </div>
                    <small style={{ color: '#888', display: 'block', marginTop: '0.5rem' }}>{c.link}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
