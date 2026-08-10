import React, { useState, useEffect } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: "", college: "", branch: "", bio: "", skills: "", github: "", linkedin: ""
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        college: user.college || "",
        branch: user.branch || "",
        bio: user.bio || "",
        skills: (user.skills || []).join(", "),
        github: user.github || "",
        linkedin: user.linkedin || ""
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, skills: form.skills.split(",").map(s => s.trim()).filter(Boolean) };
    const res = await api.put("/api/users/profile", payload);
    setUser(res.data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="profile-page">
      <h1>Your profile</h1>
      <p className="muted">This is what other students see when they discover you.</p>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Full name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>College</label>
        <input name="college" value={form.college} onChange={handleChange} />

        <label>Branch</label>
        <input name="branch" value={form.branch} onChange={handleChange} />

        <label>Bio</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="What do you build? What are you looking for in a team?" />

        <label>Skills (comma separated)</label>
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, Figma, ML" />

        <label>GitHub URL</label>
        <input name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/yourname" />

        <label>LinkedIn URL</label>
        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourname" />

        <button className="btn-primary" type="submit">Save changes</button>
        {saved && <span className="save-confirm">Saved ✓</span>}
      </form>
    </div>
  );
}
