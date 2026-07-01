import { NavLink, Route, Routes } from 'react-router-dom';
import { FiBarChart2, FiClipboard, FiHome, FiKanban, FiSettings, FiTarget } from 'react-icons/fi';
import './App.css';

const stats = [
  { label: 'Projects', value: 3, description: 'Active testing spaces' },
  { label: 'Open bugs', value: 12, description: 'Issues waiting for review' },
  { label: 'Test cases', value: 28, description: 'Prepared QA scenarios' },
  { label: 'Fixed bugs', value: 7, description: 'Ready for regression' },
];

const projects = [
  {
    title: 'DrinkUp Website',
    status: 'Active',
    description: 'Catalog, product pages, filters and cart logic testing.',
  },
  {
    title: 'AntiDetect Browser',
    status: 'Active',
    description: 'Fingerprint generation, proxy flow and profile creation checks.',
  },
  {
    title: 'Portfolio Landing',
    status: 'Paused',
    description: 'Responsive layout, forms and accessibility review.',
  },
];

const bugs = [
  {
    title: 'Next product ignores selected filter',
    priority: 'High',
    status: 'Open',
    project: 'DrinkUp Website',
  },
  {
    title: 'Proxy list does not refresh after adding new proxy',
    priority: 'Medium',
    status: 'In Progress',
    project: 'AntiDetect Browser',
  },
  {
    title: 'Mobile sidebar overlaps content',
    priority: 'Low',
    status: 'Fixed',
    project: 'Portfolio Landing',
  },
];

const navItems = [
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/dashboard', label: 'Dashboard', icon: FiBarChart2 },
  { to: '/projects', label: 'Projects', icon: FiClipboard },
  { to: '/bugs', label: 'Bugs', icon: FiTarget },
  { to: '/kanban', label: 'Kanban', icon: FiKanban },
  { to: '/settings', label: 'Settings', icon: FiSettings },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logoMark">TF</span>
        <div>
          <strong>TestFlow</strong>
          <small>QA workspace</small>
        </div>
      </div>

      <nav className="navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}>
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

function PageHeader({ title, description }) {
  return (
    <header className="pageHeader">
      <div>
        <p className="eyebrow">QA management platform</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <button type="button">Create report</button>
    </header>
  );
}

function Home() {
  return (
    <section className="hero">
      <div className="heroContent">
        <p className="eyebrow">Test cases · Bugs · Kanban</p>
        <h1>Control your QA process in one clean dashboard.</h1>
        <p>
          TestFlow helps testers organize projects, bug reports, checklists and QA progress without heavy tools.
        </p>
        <div className="heroActions">
          <NavLink to="/dashboard" className="primaryAction">Open dashboard</NavLink>
          <NavLink to="/projects" className="secondaryAction">View projects</NavLink>
        </div>
      </div>
      <div className="heroCard">
        <span>Current sprint</span>
        <strong>73%</strong>
        <p>Regression testing progress</p>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" description="Quick overview of active projects, bugs and QA progress." />
      <section className="statsGrid">
        {stats.map((item) => (
          <article className="statCard" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
      <section className="contentGrid">
        <Panel title="Recent bugs">
          {bugs.map((bug) => <BugRow key={bug.title} bug={bug} />)}
        </Panel>
        <Panel title="Active projects">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </Panel>
      </section>
    </>
  );
}

function Projects() {
  return (
    <>
      <PageHeader title="Projects" description="Manage products and websites that need testing." />
      <div className="cardsList">
        {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
      </div>
    </>
  );
}

function Bugs() {
  return (
    <>
      <PageHeader title="Bug reports" description="Track defects by priority, status and project." />
      <Panel title="Bug list">
        {bugs.map((bug) => <BugRow key={bug.title} bug={bug} />)}
      </Panel>
    </>
  );
}

function Kanban() {
  const columns = ['Open', 'In Progress', 'Fixed'];

  return (
    <>
      <PageHeader title="Kanban board" description="Move bugs through QA workflow statuses." />
      <section className="kanban">
        {columns.map((column) => (
          <div className="kanbanColumn" key={column}>
            <h2>{column}</h2>
            {bugs
              .filter((bug) => bug.status === column)
              .map((bug) => <BugRow key={bug.title} bug={bug} />)}
          </div>
        ))}
      </section>
    </>
  );
}

function Settings() {
  return (
    <>
      <PageHeader title="Settings" description="Project settings will include theme, profile and data controls." />
      <Panel title="Coming next">
        <p className="muted">Dark mode, localStorage, import/export and profile settings will be added in the next stage.</p>
      </Panel>
    </>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="panelContent">{children}</div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="projectCard">
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <span className="badge">{project.status}</span>
    </article>
  );
}

function BugRow({ bug }) {
  return (
    <article className="bugRow">
      <div>
        <h3>{bug.title}</h3>
        <p>{bug.project}</p>
      </div>
      <div className="bugMeta">
        <span className="badge priority">{bug.priority}</span>
        <span className="badge">{bug.status}</span>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <div className="appShell">
      <Sidebar />
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/bugs" element={<Bugs />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
