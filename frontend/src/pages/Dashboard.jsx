import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

function profileCompleteness(user) {
  if (!user) return 0;
  const fields = [user.college, user.branch, user.bio, user.skills?.length > 0, user.github, user.linkedin];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export default function Dashboard() {
  const { user } = useAuth();
  const [connections, setConnections] = useState({ incoming: [], sent: [], friends: [] });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    api.get("/api/connections").then(res => setConnections(res.data)).catch(() => {});
    api.get("/api/users/discover").then(res => setSuggestions(res.data.slice(0, 3))).catch(() => {});
  }, []);

  const completeness = profileCompleteness(user);

  return (
    <div className="dashboard">
      <h1>Welcome back, {user?.name?.split(" ")[0]}</h1>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Profile strength</h3>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${completeness}%` }} /></div>
          <p className="muted">{completeness}% complete</p>
          {completeness < 100 && <Link to="/profile" className="btn-secondary-sm">Finish your profile</Link>}
        </div>

        <div className="card">
          <h3>Connection activity</h3>
          <div className="stat-row">
            <div><span className="stat-num">{connections.incoming.length}</span><span className="stat-label">Pending</span></div>
            <div><span className="stat-num">{connections.friends.length}</span><span className="stat-label">Teammates</span></div>
            <div><span className="stat-num">{connections.sent.length}</span><span className="stat-label">Sent</span></div>
          </div>
          <Link to="/connections" className="btn-secondary-sm">View all</Link>
        </div>

        <div className="card card-wide">
          <h3>Suggested for you</h3>
          {suggestions.length === 0 ? (
            <p className="muted">No suggestions yet — check back once more students join.</p>
          ) : (
            <div className="suggestion-list">
              {suggestions.map(s => (
                <div key={s._id} className="suggestion-item">
                  <div>
                    <strong>{s.name}</strong>
                    <p className="muted">{s.college || "College not set"}</p>
                    <div className="tag-row">
                      {(s.skills || []).slice(0, 3).map(sk => <span key={sk} className="skill-pill-sm">{sk}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/discover" className="btn-secondary-sm">Discover more</Link>
        </div>
      </div>
    </div>
  );
}
