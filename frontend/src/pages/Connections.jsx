import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const TABS = ["incoming", "sent", "friends"];

export default function Connections() {
  const [data, setData] = useState({ incoming: [], sent: [], friends: [] });
  const [tab, setTab] = useState("incoming");
  const { user } = useAuth();

  const fetchConnections = () => {
    api.get("/api/connections").then(res => setData(res.data)).catch(() => {});
  };

  useEffect(() => { fetchConnections(); }, []);

  const respond = async (id, status) => {
    await api.put(`/api/connections/${id}`, { status });
    fetchConnections();
  };

  const otherPerson = (conn) => {
    if (tab === "friends") {
      return conn.sender?._id === user?.id ? conn.receiver : conn.sender;
    }
    return tab === "incoming" ? conn.sender : conn.receiver;
  };

  const list = data[tab] || [];

  return (
    <div className="connections">
      <h1>Connections</h1>
      <div className="tabs">
        {TABS.map(t => (
          <button key={t} className={`tab ${tab === t ? "tab-active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)} <span className="tab-count">{data[t]?.length || 0}</span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="muted">Nothing here yet.</p>
      ) : (
        <div className="connections-list">
          {list.map(conn => {
            const person = otherPerson(conn);
            if (!person) return null;
            return (
              <div key={conn._id} className="connection-item">
                <div>
                  <strong>{person.name}</strong>
                  <p className="muted">{person.college || "College not set"}</p>
                </div>
                <div className="connection-actions">
                  {tab === "incoming" && (
                    <>
                      <button className="btn-primary-sm" onClick={() => respond(conn._id, "accepted")}>Accept</button>
                      <button className="btn-ghost-sm" onClick={() => respond(conn._id, "rejected")}>Decline</button>
                    </>
                  )}
                  {tab === "sent" && <span className="status-pill">Pending</span>}
                  {tab === "friends" && <Link to={`/chat/${person._id}`} className="btn-secondary-sm">Message</Link>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
