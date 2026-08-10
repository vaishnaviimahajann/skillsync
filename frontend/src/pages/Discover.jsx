import React, { useEffect, useState } from "react";
import api from "../api.js";

export default function Discover() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [sentIds, setSentIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/users/discover", { params: { search, skill } });
      setUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const sendRequest = async (receiverId) => {
    try {
      await api.post("/api/connections/send", { receiverId });
      setSentIds(prev => new Set(prev).add(receiverId));
    } catch (err) {
      alert(err.response?.data?.msg || "Could not send request");
    }
  };

  return (
    <div className="discover">
      <h1>Discover teammates</h1>
      <form className="discover-search" onSubmit={handleSearch}>
        <input placeholder="Search by name or college" value={search} onChange={e => setSearch(e.target.value)} />
        <input placeholder="Filter by skill, e.g. React" value={skill} onChange={e => setSkill(e.target.value)} />
        <button className="btn-primary-sm" type="submit">Search</button>
      </form>

      {loading ? (
        <p className="muted">Loading students…</p>
      ) : users.length === 0 ? (
        <p className="muted">No students match that search yet.</p>
      ) : (
        <div className="discover-grid">
          {users.map(u => (
            <div key={u._id} className="discover-card">
              <h3>{u.name}</h3>
              <p className="muted">{u.college || "College not set"} {u.branch ? `· ${u.branch}` : ""}</p>
              {u.bio && <p className="bio-preview">{u.bio}</p>}
              <div className="tag-row">
                {(u.skills || []).map(sk => <span key={sk} className="skill-pill-sm">{sk}</span>)}
              </div>
              <button
                className="btn-secondary-sm"
                disabled={sentIds.has(u._id)}
                onClick={() => sendRequest(u._id)}
              >
                {sentIds.has(u._id) ? "Request sent" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
