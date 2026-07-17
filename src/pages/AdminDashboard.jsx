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
  getContact, saveContact
} from '../backend/db';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from 'react-icons/fa';

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

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading Symbiote OS...</div>;

  const sidebarTabs = [
    { id: 'intro', label: 'Introduction' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '2px solid var(--accent-red)', width: '90%', maxWidth: '500px', boxShadow: '0 0 30px rgba(226, 54, 54, 0.2)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#fff', fontFamily: 'var(--font-heading)' }}>{modalConfig.title}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              modalConfig.onSave(data);
              setModalConfig(null);
            }}>
              {modalConfig.fields.map(f => (
                <div key={f.name} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea name={f.name} defaultValue={modalConfig.initialData?.[f.name] || ''} required={f.required !== false} style={{ width: '100%', padding: '0.75rem', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '100px', fontFamily: 'inherit' }} />
                  ) : f.type === 'checkbox' ? (
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <input type="checkbox" name={f.name} defaultChecked={modalConfig.initialData?.[f.name] || false} /> 
                       <span style={{ fontSize: '0.9rem', color: '#888' }}>Yes</span>
                     </div>
                  ) : (
                    <input type={f.type || 'text'} name={f.name} defaultValue={modalConfig.initialData?.[f.name] || ''} required={f.required !== false} style={{ width: '100%', padding: '0.75rem', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" onClick={() => setModalConfig(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
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
                { name: 'appLink', label: 'App URL (Optional)', required: false }
              ], null, (data) => {
                const updated = [...experience, { id: Date.now().toString(), ...data, points: [], isLeft: experience.length % 2 === 0 }];
                setExperience(updated); saveExperience(updated);
              });
            }}>+ Add Experience</button>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {experience.map((exp, index) => (
                <div key={exp.id} style={{ background: '#111', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-blue)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {renderActionButtons(setExperience, saveExperience, experience, exp, index)}
                      <strong>{exp.role} - {exp.company}</strong>
                    </div>
                    <div>
                      <button onClick={() => {
                        openModal('Edit Experience', [
                          { name: 'role', label: 'Role' },
                          { name: 'company', label: 'Company' },
                          { name: 'link', label: 'Company URL (Optional)', required: false },
                          { name: 'appLink', label: 'App URL (Optional)', required: false }
                        ], exp, (data) => {
                          const updated = experience.map(i => i.id === exp.id ? { ...i, ...data } : i);
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
                { name: 'title', label: 'Degree / Title' },
                { name: 'dir', label: 'Institution' },
                { name: 'status', label: 'Status (comma separated)' }
              ], null, (data) => {
                const updated = [...education, { id: Date.now().toString(), title: data.title, dir: data.dir, status: data.status.split(',').map(s=>s.trim()) }];
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
                        <strong>{edu.title} - {edu.dir}</strong>
                        <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>{edu.status.join(', ')}</p>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => {
                        openModal('Edit Education', [
                          { name: 'title', label: 'Degree / Title' },
                          { name: 'dir', label: 'Institution' },
                          { name: 'status', label: 'Status (comma separated)' }
                        ], { ...edu, status: edu.status.join(', ') }, (data) => {
                          const updated = education.map(i => i.id === edu.id ? { ...i, title: data.title, dir: data.dir, status: data.status.split(',').map(s=>s.trim()) } : i);
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
