import React, { useEffect, useState } from "react";

const API = "/api";

async function api(path, options = {}) {
  const token = localStorage.getItem("daysync_token");

  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

/* ---------------- LOGIN ---------------- */

function Login({ onLogin }) {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const endpoint =
        mode === "login" ? "/auth/login" : "/auth/signup";

      const body =
        mode === "login"
          ? {
              email: form.email,
              password: form.password,
            }
          : form;

      const result = await api(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });

      localStorage.setItem(
        "daysync_token",
        result.data.token
      );

      localStorage.setItem(
        "daysync_user",
        JSON.stringify(result.data.user)
      );

      onLogin(result.data.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #1e3a5f, #020617 45%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(15,23,42,0.9)",
          border: "1px solid rgba(148,163,184,0.2)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg,#38bdf8,#6366f1)",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
            }}
          >
            DS
          </div>

          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
              DAY<span style={{ color: "#38bdf8" }}>SYNC</span>
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "11px",
                letterSpacing: "2px",
              }}
            >
              AI MORNING OS
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              color: "#38bdf8",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            ADAPTIVE INTELLIGENCE
          </div>

          <h1
            style={{
              fontSize: "36px",
              lineHeight: 1.1,
              margin: "0 0 15px",
            }}
          >
            Your morning,
            <br />
            intelligently adapted.
          </h1>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: 1.7,
            }}
          >
            DaySync builds a realistic morning plan around
            your sleep, calendar, commute, weather and
            priorities.
          </p>
        </div>

        <form onSubmit={submit}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              required
              style={inputStyle}
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) =>
              setForm({
                ...form,
                password: event.target.value,
              })
            }
            required
            minLength={8}
            style={inputStyle}
          />

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "12px",
              padding: "15px",
              background:
                "linear-gradient(135deg,#38bdf8,#6366f1)",
              color: "white",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Enter DaySync →"
              : "Create my DaySync →"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(
              mode === "login" ? "signup" : "login"
            );
            setError("");
          }}
          style={{
            width: "100%",
            marginTop: "18px",
            background: "transparent",
            border: "none",
            color: "#38bdf8",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}

/* ---------------- DASHBOARD ---------------- */

function Dashboard({ user, onLogout }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function loadMorning() {
    try {
      setLoading(true);
      setError("");

      const result = await api("/morning/today");

      setData(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMorning();
  }, []);

  async function taskAction(id, action) {
    try {
      setBusy(true);

      await api(`/morning/tasks/${id}/${action}`, {
        method: "POST",
        body: JSON.stringify({}),
      });

      await loadMorning();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function recalculate() {
    try {
      setBusy(true);

      await api("/morning/recalculate", {
        method: "POST",
        body: JSON.stringify({}),
      });

      await loadMorning();
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    localStorage.removeItem("daysync_token");
    localStorage.removeItem("daysync_user");

    onLogout();
  }

  const tasks = data?.tasks || [];

  const completed = tasks.filter(
    (task) =>
      task.status === "COMPLETED" ||
      task.completed === true
  ).length;

  const mode =
    data?.plan?.mode ||
    data?.session?.mode ||
    "NORMAL";

  const available =
    data?.plan?.availableMinutes ??
    data?.session?.available_minutes ??
    0;

  const departure =
    data?.plan?.departure?.time ||
    data?.session?.departure_target;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f8fafc",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          height: "72px",
          borderBottom:
            "1px solid rgba(148,163,184,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#38bdf8,#6366f1)",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
            }}
          >
            DS
          </div>

          <strong style={{ fontSize: "19px" }}>
            DAY<span style={{ color: "#38bdf8" }}>SYNC</span>
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <span style={{ color: "#94a3b8" }}>
            {user?.name || "User"}
          </span>

          <button
            onClick={logout}
            style={smallButton}
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* CONTENT */}

      <section
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "55px 25px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            marginBottom: "35px",
          }}
        >
          <div>
            <div style={eyebrow}>
              TODAY'S OPERATING PLAN
            </div>

            <h1
              style={{
                fontSize: "42px",
                margin: "8px 0",
              }}
            >
              Good morning,{" "}
              {user?.name?.split(" ")[0] || "there"}.
            </h1>

            <p style={{ color: "#94a3b8" }}>
              Your morning has been dynamically adapted
              to today's context.
            </p>
          </div>

          <button
            onClick={recalculate}
            disabled={busy}
            style={secondaryButton}
          >
            ↻ Recalculate
          </button>
        </header>

        {error && (
          <div
            style={{
              padding: "15px",
              marginBottom: "25px",
              borderRadius: "12px",
              background: "rgba(239,68,68,.1)",
              border:
                "1px solid rgba(239,68,68,.25)",
              color: "#fca5a5",
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              color: "#94a3b8",
            }}
          >
            Building your personalized morning...
          </div>
        ) : (
          <>
            {/* STATS */}

            <section
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(200px,1fr))",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <Stat
                title="MODE"
                value={mode}
                subtitle="Adaptive plan"
              />

              <Stat
                title="AVAILABLE"
                value={`${available} min`}
                subtitle="Morning window"
              />

              <Stat
                title="DEPARTURE"
                value={formatTime(departure)}
                subtitle="Target departure"
              />

              <Stat
                title="PROGRESS"
                value={`${completed}/${tasks.length}`}
                subtitle="Tasks completed"
              />
            </section>

            {/* MAIN GRID */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0,2fr) minmax(300px,1fr)",
                gap: "20px",
              }}
            >
              {/* TASKS */}

              <section style={panelStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <div style={eyebrow}>
                      MORNING TIMELINE
                    </div>

                    <h2 style={{ margin: "6px 0" }}>
                      Today's plan
                    </h2>
                  </div>

                  <span style={{ color: "#64748b" }}>
                    {tasks.length} tasks
                  </span>
                </div>

                {tasks.length === 0 ? (
                  <p style={{ color: "#64748b" }}>
                    No morning tasks have been generated yet.
                  </p>
                ) : (
                  tasks.map((task, index) => {
                    const done =
                      task.status === "COMPLETED" ||
                      task.completed === true;

                    return (
                      <div
                        key={
                          task.id ||
                          task.sourceTaskId ||
                          index
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          padding: "18px 0",
                          borderTop:
                            "1px solid rgba(148,163,184,.1)",
                          opacity: done ? 0.55 : 1,
                        }}
                      >
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            background: done
                              ? "#16a34a"
                              : "rgba(56,189,248,.12)",
                            color: done
                              ? "white"
                              : "#38bdf8",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {done ? "✓" : index + 1}
                        </div>

                        <div style={{ flex: 1 }}>
                          <strong>
                            {task.name}
                          </strong>

                          <div
                            style={{
                              color: "#64748b",
                              fontSize: "13px",
                              marginTop: "5px",
                            }}
                          >
                            {task.category ||
                              "Routine"}{" "}
                            ·{" "}
                            {task.durationMinutes || 0}{" "}
                            min
                          </div>

                          {task.reason && (
                            <div
                              style={{
                                color: "#94a3b8",
                                fontSize: "12px",
                                marginTop: "5px",
                              }}
                            >
                              {task.reason}
                            </div>
                          )}
                        </div>

                        {!done && task.id && (
                          <button
                            onClick={() =>
                              taskAction(
                                task.id,
                                "complete"
                              )
                            }
                            disabled={busy}
                            style={completeButton}
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </section>

              {/* SIDEBAR */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <section style={panelStyle}>
                  <div style={eyebrow}>
                    LIVE CONTEXT
                  </div>

                  <h2>What DaySync sees</h2>

                  <Context
                    icon="🌤️"
                    title="Weather"
                    text={
                      data?.weather
                        ? "Weather context available"
                        : "No weather data"
                    }
                  />

                  <Context
                    icon="🚗"
                    title="Commute"
                    text={
                      data?.traffic
                        ? `${
                            data.traffic
                              .currentEstimatedMinutes ||
                            "—"
                          } min estimated`
                        : "No traffic data"
                    }
                  />

                  <Context
                    icon="📅"
                    title="Calendar"
                    text={`${data?.calendar?.length || 0} commitments considered`}
                  />
                </section>

                <section style={panelStyle}>
                  <div style={eyebrow}>
                    MORNING DNA
                  </div>

                  <h2>Your adaptive intelligence</h2>

                  <p
                    style={{
                      color: "#94a3b8",
                      lineHeight: 1.7,
                    }}
                  >
                    DaySync learns from your routines,
                    timing, sleep and completion patterns
                    to make future mornings more realistic.
                  </p>
                </section>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ title, value, subtitle }) {
  return (
    <div style={panelStyle}>
      <div style={eyebrow}>{title}</div>

      <div
        style={{
          fontSize: "27px",
          fontWeight: 800,
          margin: "10px 0 4px",
        }}
      >
        {value}
      </div>

      <small style={{ color: "#64748b" }}>
        {subtitle}
      </small>
    </div>
  );
}

function Context({ icon, title, text }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        alignItems: "center",
        padding: "15px 0",
        borderTop:
          "1px solid rgba(148,163,184,.1)",
      }}
    >
      <span style={{ fontSize: "24px" }}>
        {icon}
      </span>

      <div>
        <strong>{title}</strong>

        <div
          style={{
            color: "#64748b",
            fontSize: "13px",
            marginTop: "4px",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "#020617",
  border: "1px solid #334155",
  color: "white",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "14px",
  outline: "none",
  fontSize: "14px",
};

const panelStyle = {
  background: "rgba(15,23,42,.72)",
  border: "1px solid rgba(148,163,184,.12)",
  borderRadius: "18px",
  padding: "24px",
};

const eyebrow = {
  color: "#38bdf8",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "2px",
};

const smallButton = {
  background: "transparent",
  border: "1px solid #334155",
  color: "#cbd5e1",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryButton = {
  background: "#0f172a",
  border: "1px solid #334155",
  color: "#e2e8f0",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const completeButton = {
  background: "#0ea5e9",
  border: "none",
  color: "white",
  padding: "9px 13px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 700,
};

function formatTime(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("daysync_user");
    return saved ? JSON.parse(saved) : null;
  });

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Dashboard
      user={user}
      onLogout={() => setUser(null)}
    />
  );
}