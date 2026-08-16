/**
 * FORGESENSE DESIGN REMINDER — Signal Workshop: offsets, instrument labels,
 * physical machine imagery, and calibrated Teal (#0D8D84) communicate an
 * evidence-led industrial system. Keep amber for anomaly/risk moments.
 */
import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Box,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  CloudCog,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  Play,
  Radio,
  ScanLine,
  ServerCog,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Thermometer,
  Waves,
  Zap,
} from "lucide-react";

type Scenario = "Nominal" | "Watch" | "Inspect";

const pipeline = [
  { id: "01", title: "Sensor data", caption: "Vibration · temp · pressure", icon: Radio },
  { id: "02", title: "Data cleaning", caption: "Gaps · outliers · alignment", icon: ScanLine },
  { id: "03", title: "Feature engineering", caption: "RMS · FFT · rolling stats", icon: SlidersHorizontal },
  { id: "04", title: "ML baseline", caption: "Scikit-learn benchmark", icon: GitBranch },
  { id: "05", title: "Deep learning", caption: "PyTorch + TensorFlow", icon: Layers3 },
  { id: "06", title: "Failure prediction", caption: "Probability + lead time", icon: Activity },
  { id: "07", title: "FastAPI", caption: "Inference endpoint", icon: ServerCog },
  { id: "08", title: "MongoDB", caption: "Telemetry + prediction log", icon: Database },
];

const scenarios: Record<Scenario, { probability: string; lead: string; status: string; message: string; accent: string; tag: string }> = {
  Nominal: {
    probability: "06.8%",
    lead: "No action needed",
    status: "Nominal operating band",
    message: "Vibration and temperature signals remain within the learned normal envelope.",
    accent: "teal",
    tag: "HEALTHY",
  },
  Watch: {
    probability: "34.6%",
    lead: "Monitor next shift",
    status: "Feature drift detected",
    message: "The model sees a rising vibration signature. Increase sampling cadence before maintenance planning.",
    accent: "amber",
    tag: "WATCH",
  },
  Inspect: {
    probability: "78.2%",
    lead: "Inspect within 24 h",
    status: "High-risk failure pattern",
    message: "Frequency-domain features align with historical bearing degradation cases. Route for inspection.",
    accent: "amber",
    tag: "ACTION",
  },
};

function SignalChart({ mode }: { mode: Scenario }) {
  const isInspect = mode === "Inspect";
  const isWatch = mode === "Watch";
  const path = isInspect
    ? "M0 65 C16 35 28 102 44 54 S74 27 92 75 S120 105 138 46 S170 20 188 85 S220 104 242 35 S272 10 294 92 S324 120 346 28 S382 2 404 96"
    : isWatch
      ? "M0 68 C20 54 30 88 50 61 S80 43 98 73 S126 90 148 51 S178 36 198 79 S226 88 247 54 S277 35 298 83 S327 101 349 48 S378 30 404 75"
      : "M0 66 C20 53 32 82 52 62 S82 44 102 68 S132 86 152 57 S182 43 202 72 S232 88 252 56 S282 43 302 70 S332 86 352 58 S382 43 404 68";

  return (
    <svg className="h-[96px] w-full overflow-visible" viewBox="0 0 404 120" aria-label="Sample vibration signal">
      <defs>
        <linearGradient id="signal" x1="0" x2="1">
          <stop offset="0%" stopColor="#0d8d84" stopOpacity="0.25" />
          <stop offset="55%" stopColor={isInspect || isWatch ? "#ff9e42" : "#0d8d84"} stopOpacity="1" />
          <stop offset="100%" stopColor={isInspect ? "#ff9e42" : "#0d8d84"} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {[28, 60, 92].map((y) => <line key={y} x1="0" y1={y} x2="404" y2={y} stroke="rgba(242,239,230,0.09)" strokeDasharray="3 5" />)}
      <path d={path} fill="none" stroke="url(#signal)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="346" cy={isInspect ? 28 : isWatch ? 48 : 58} r="4.5" fill={isInspect || isWatch ? "#ff9e42" : "#0d8d84"} className="signal-point" />
    </svg>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [scenario, setScenario] = useState<Scenario>("Watch");
  const [hasRun, setHasRun] = useState(false);
  const activePipeline = pipeline[activeStep];
  const result = scenarios[scenario];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111615] text-[#f2efe6] selection:bg-[#0d8d84] selection:text-white">
      <header className="site-header">
        <a href="#top" className="brand-lockup" aria-label="ForgeSense home">
          <img src="/manus-storage/forge-logo-mark_d1794638.png" alt="ForgeSense turbine pulse mark" className="brand-mark" />
          <span className="brand-word">FORGESENSE</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {[
            ["Method", "method"],
            ["Architecture", "architecture"],
            ["Model evidence", "evidence"],
            ["Stack", "stack"],
          ].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>
          ))}
        </nav>
        <button onClick={() => scrollTo("demo")} className="header-cta">
          Run a prediction <ArrowDownRight size={15} />
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-art" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow"><span className="pulse-dot" /> Industrial ML proof project</div>
            <h1>Detect the failure pattern <em>before</em> the shift feels it.</h1>
            <p className="hero-lede">ForgeSense turns noisy industrial telemetry into an auditable failure signal—moving from sensor data to a served prediction with an evidence-led ML workflow.</p>
            <div className="hero-actions">
              <button onClick={() => scrollTo("demo")} className="button-primary">Explore model output <ArrowDownRight size={18} /></button>
              <button onClick={() => scrollTo("architecture")} className="button-quiet"><Network size={18} /> Trace the pipeline</button>
            </div>
            <div className="hero-status">
              <div><span className="status-label">Input</span><strong>Multi-sensor time series</strong></div>
              <div><span className="status-label">Inference</span><strong>Baseline + deep learning</strong></div>
              <div><span className="status-label">Output</span><strong>Failure risk & lead time</strong></div>
            </div>
          </div>
          <div className="hero-inspection-stamp">
            <img src="/manus-storage/forge-logo-mark_d1794638.png" alt="" />
            <div><span>ForgeSense</span><strong>Inspection protocol</strong><small>FS / 01 / VERIFIED</small></div>
          </div>
          <div className="hero-sidecard">
            <div className="panel-kicker"><span>Stream / 04</span><span className="online-dot">online</span></div>
            <div className="sidecard-title"><Waves size={20} /> Live telemetry posture</div>
            <div className="mini-signal"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="sidecard-foot"><span>Asset / MX-204</span><span>12 signals</span></div>
          </div>
        </section>

        <section className="marquee-strip" aria-label="Platform capabilities">
          <span><CircleDot size={15} /> Sensor telemetry</span><i />
          <span><CircleDot size={15} /> Feature pipeline</span><i />
          <span><CircleDot size={15} /> ML evaluation</span><i />
          <span><CircleDot size={15} /> Deep learning</span><i />
          <span><CircleDot size={15} /> API-ready inference</span><i />
          <span><CircleDot size={15} /> Prediction logging</span>
        </section>

        <section id="method" className="report-section method-section">
          <div className="section-rail"><span>01</span><span>METHOD</span></div>
          <div className="calibration-ruler dark-ruler"><span>FS-01</span><i /><span>RAW SIGNAL → DECISION</span><i /><span>REV 0.1</span></div>
          <div className="section-intro">
            <div className="eyebrow dark-eyebrow">A failure signal, not a black box</div>
            <h2>A model is only useful when its path to a decision is <em>legible.</em></h2>
          </div>
          <div className="method-layout">
            <div className="method-copy">
              <p>Start with the machine’s condition, not a generic benchmark. The workflow consolidates raw vibration, thermal, pressure, and rotation streams, turns them into stable features, and compares a practical baseline with deep-learning approaches.</p>
              <p>Every layer has a job: clean the signal, make its failure cues observable, score the model against an interpretable baseline, then publish a prediction that operations can act on.</p>
              <button className="text-cta" onClick={() => scrollTo("architecture")}>Follow the data path <ChevronRight size={17} /></button>
            </div>
            <div className="method-image-card">
              <img src="/manus-storage/forge-sensor-detail_b7d88fd8.jpg" alt="Vibration sensor fixed to industrial equipment" />
              <div className="image-readout">
                <span>Condition signal</span>
                <strong>Vibration sensor</strong>
                <div><span className="readout-dot" /> Mount state / stable</div>
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className="architecture-section">
          <div className="architecture-top">
            <div className="section-rail light-rail"><span>02</span><span>ARCHITECTURE</span></div>
            <div>
              <div className="eyebrow"><span className="pulse-dot" /> Core flow</div>
              <h2>From noisy machines to a decision-ready endpoint.</h2>
            </div>
            <div className="architecture-note">Select a stage to inspect the responsibility at that point in the system.</div>
          </div>
          <div className="pipeline-shell">
            <div className="pipeline-track" aria-label="Industrial failure detection pipeline">
              {pipeline.map((item, index) => {
                const Icon = item.icon;
                const active = activeStep === index;
                return (
                  <button key={item.id} onClick={() => setActiveStep(index)} className={`pipeline-step ${active ? "active" : ""}`}>
                    <span className="pipeline-number">{item.id}</span>
                    <Icon size={20} strokeWidth={1.6} />
                    <span className="pipeline-title">{item.title}</span>
                    {index < pipeline.length - 1 && <span className="pipeline-arrow">→</span>}
                  </button>
                );
              })}
            </div>
            <div className="pipeline-detail">
              <div className="detail-index">STAGE {activePipeline.id}</div>
              <div><strong>{activePipeline.title}</strong><p>{activePipeline.caption}</p></div>
              <div className="detail-state"><Check size={14} /> Responsibility mapped</div>
            </div>
          </div>
          <div className="architecture-caption">The pipeline is designed as a hand-off between data engineering, model development, and API delivery—not as a disconnected collection of tools.</div>
          <div className="section-spec"><span>SPEC / PIPELINE-HANDOFF</span><span>8 stages</span><span>auditable output</span></div>
        </section>

        <section id="evidence" className="evidence-section">
          <div className="calibration-ruler dark-ruler evidence-ruler"><span>FS-02</span><i /><span>MODEL EVIDENCE</span><i /><span>REVIEWED</span></div>
          <div className="evidence-grid">
            <div className="evidence-art">
              <img src="/manus-storage/forge-digital-twin_d59fbf5d.jpg" alt="Industrial pump represented as a digital twin" />
              <div className="evidence-art-tag"><Sparkles size={15} /> Machine condition, rendered legible</div>
            </div>
            <div className="evidence-content">
              <div className="eyebrow dark-eyebrow">Model evidence</div>
              <h2>Compare the simple answer before training the powerful one.</h2>
              <p>The project begins with an explainable Scikit-learn baseline, then advances to PyTorch and TensorFlow architectures for sequence-aware failure detection. This makes model improvement measurable rather than assumed.</p>
              <div className="evidence-list">
                <div><span><Gauge size={18} /></span><p><strong>Evaluate deliberately</strong>Precision, recall, F1, ROC-AUC, and confusion matrices make each trade-off visible.</p></div>
                <div><span><Braces size={18} /></span><p><strong>Engineer condition features</strong>Statistical windows, FFT energy, skewness, and temperature drift provide model-ready context.</p></div>
                <div><span><ShieldCheck size={18} /></span><p><strong>Keep output auditable</strong>Prediction confidence, asset ID, and inference time are kept together for review.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="demo-section">
          <div className="demo-header">
            <div className="section-rail light-rail"><span>03</span><span>INFERENCE LAB</span></div>
            <div><div className="eyebrow"><span className="pulse-dot" /> Interactive sample</div><h2>Run one machine condition through the decision layer.</h2></div>
            <p>Choose an operating posture, then send it through the sample prediction view. This client-side interaction demonstrates the shape of the FastAPI response—not a live production model.</p>
          </div>
          <div className="demo-grid">
            <div className="scenario-panel">
              <span className="panel-kicker">CONDITION INPUT</span>
              <h3>Asset MX-204<br /><em>Drive-end bearing</em></h3>
              <div className="scenario-options">
                {(Object.keys(scenarios) as Scenario[]).map((name) => (
                  <button key={name} onClick={() => { setScenario(name); setHasRun(false); }} className={`scenario-option ${scenario === name ? "selected" : ""}`}>
                    <span className="scenario-radio" /><span><strong>{name}</strong><small>{name === "Nominal" ? "Stable envelope" : name === "Watch" ? "Emerging drift" : "Escalated condition"}</small></span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
              <button onClick={() => setHasRun(true)} className="button-primary run-button"><Play size={16} fill="currentColor" /> Run sample prediction</button>
              <div className="client-note"><CloudCog size={15} /> Demo response shown in browser</div>
            </div>
            <div className={`prediction-panel ${hasRun ? "has-run" : ""}`}>
              <div className="prediction-top"><span className="panel-kicker">INFERENCE RESPONSE</span><span className={`risk-tag ${result.accent}`}>{hasRun ? result.tag : "READY"}</span></div>
              <div className="prediction-value"><span>Failure probability</span><strong>{hasRun ? result.probability : "—"}</strong><small>{hasRun ? result.status : "Awaiting sample run"}</small></div>
              <SignalChart mode={scenario} />
              <div className="prediction-summary">
                <div><span>Recommended response</span><strong>{hasRun ? result.lead : "Select a condition"}</strong></div>
                <div><span>Inference payload</span><strong>{hasRun ? "logged" : "pending"}</strong></div>
              </div>
              <p className="prediction-message">{hasRun ? result.message : "This panel surfaces the risk estimate, model posture, and next operational action together."}</p>
            </div>
          </div>
        </section>

        <section id="stack" className="stack-section">
          <div className="stack-top"><div className="section-rail"><span>04</span><span>TECHNICAL STACK</span></div><div><div className="eyebrow dark-eyebrow">Tools with clear jobs</div><h2>One pipeline. Eight tools. <em>Zero résumé filler.</em></h2></div></div>
          <div className="manifest-sheet">
            <div className="manifest-head"><div className="manifest-id"><img src="/manus-storage/forge-logo-mark_d1794638.png" alt="" /> <span>FORGESENSE / TOOLCHAIN MANIFEST</span></div><span>FS-SPEC / 04</span><span>STATUS / READY</span></div>
            <div className="manifest-columns"><span>Ref</span><span>System layer</span><span>Tooling</span><span>Operational responsibility</span></div>
            <div className="manifest-row"><span>01</span><span>Foundation</span><strong>Python</strong><p>Orchestrates analysis, modelling, and API integration across the project.</p></div>
            <div className="manifest-row"><span>02</span><span>Signal preparation</span><strong>Pandas · NumPy</strong><p>Cleans time series, aligns sources, and produces dependable numerical features.</p></div>
            <div className="manifest-row"><span>03</span><span>Baseline evaluation</span><strong>Scikit-learn</strong><p>Establishes interpretable classifiers and repeatable model evidence.</p></div>
            <div className="manifest-row"><span>04</span><span>Sequence learning</span><strong>PyTorch · TensorFlow</strong><p>Tests deep architectures against learned failure signatures in sensor windows.</p></div>
            <div className="manifest-row"><span>05</span><span>Inference contract</span><strong>FastAPI</strong><p>Publishes a clean prediction endpoint and readable machine-facing response.</p></div>
            <div className="manifest-row"><span>06</span><span>Runtime record</span><strong>MongoDB · Docker</strong><p>Persists prediction evidence and establishes a repeatable runtime boundary.</p></div>
            <div className="manifest-foot"><span><Check size={14} /> Stack mapped to the pipeline</span><span>Last inspection: proof-project scope</span></div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-bg" />
          <div className="closing-copy"><div className="eyebrow"><span className="pulse-dot" /> Industrial predictive maintenance</div><h2>A proof project for the work between a model and a decision.</h2><p>ForgeSense demonstrates the complete ML story: clean data, engineered features, evaluated models, deep-learning capability, API delivery, and a place to keep the results.</p></div>
          <div className="closing-card"><img src="/manus-storage/forge-logo-mark_d1794638.png" alt="" /><span>Project focus</span><strong>Industrial Predictive Maintenance &amp; Failure Detection Platform</strong><a href="#top">Back to top <ArrowUpRight size={15} /></a></div>
        </section>
      </main>

      <footer className="site-footer"><div className="brand-lockup"><img src="/manus-storage/forge-logo-mark_d1794638.png" alt="" className="brand-mark" /><span className="brand-word">FORGESENSE</span></div><p>Python · PyTorch · TensorFlow · Scikit-learn · FastAPI · MongoDB</p><span>Built as an ML proof project</span></footer>
    </div>
  );
}
