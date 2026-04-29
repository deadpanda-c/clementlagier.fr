"use client";

import { useEffect, useState, useMemo, useRef } from "react";

import TerminalHeader from "@/components/terminal/terminal-header";
import Prompt from "@/components/terminal/prompt";
import TypingText, { TypingTextLine } from "@/components/terminal/typing-text";
import useGithubRepos from "@/hooks/useGithubRepos";

interface CommandSet {
  id: number;
  lines: TypingTextLine[];
}

const MOBILE_BREAKPOINT = 768;
const CMD_BASE = "text-green-300 flex ml-2 font-bold text-sm md:text-base";
const OUTPUT_BASE = "text-gray-200 text-xs md:text-sm leading-relaxed";

// ─── Right panel sections ────────────────────────────────────────────────────

const InfoPanel = ({
  visible,
  repos,
  reposLoading,
  reposError,
}: {
  visible: boolean;
  repos: ReturnType<typeof useGithubRepos>["repos"];
  reposLoading: boolean;
  reposError: string | null;
}) => {
  return (
    <aside
      className={`
        hidden md:flex flex-col w-2/5 bg-zinc-950 border-l border-green-900/40
        text-green-400 font-mono text-xs overflow-y-auto h-screen
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Sidebar header */}
      <div className="px-6 pt-6 pb-4 border-b border-green-900/40">
        <p className="text-green-600 text-[10px] tracking-widest uppercase mb-1">
          system info
        </p>
        <p className="text-green-300 text-sm font-semibold">deadpanda</p>
        <p className="text-green-700 text-[11px] mt-0.5">
          software engineer · pentester
        </p>
      </div>

      {/* Status */}
      <Section label="status">
        <StatusRow label="uptime" value="always on" ok />
        <StatusRow label="location" value="remote" ok />
        <StatusRow label="open to" value="collaborations" ok />
      </Section>

      {/* Skills */}
      <Section label="skills">
        <SkillGroup label="systems" items={["C", "C++", "Rust"]} />
        <SkillGroup label="scripting" items={["Python", "Bash", "JS/TS"]} />
        <SkillGroup label="security" items={["pentest", "CTF", "OSINT"]} />
        <SkillGroup label="soft" items={["communication", "teamwork"]} />
      </Section>

      {/* Repos */}
      <Section label="pinned repos">
        {reposLoading && (
          <p className="text-green-700 animate-pulse">fetching repos…</p>
        )}
        {reposError && (
          <p className="text-red-500 text-[11px]">error: {reposError}</p>
        )}
        {!reposLoading &&
          !reposError &&
          repos.map((repo) => <RepoCard key={repo.name} repo={repo} />)}
      </Section>

      {/* Footer */}
      <div className="mt-auto px-6 py-4 border-t border-green-900/40 text-green-800 text-[10px]">
        <p>© {new Date().getFullYear()} clement lagier</p>
      </div>
    </aside>
  );
};

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="px-6 py-4 border-b border-green-900/30">
    <p className="text-green-600 text-[10px] tracking-widest uppercase mb-3">
      {label}
    </p>
    <div className="space-y-1.5">{children}</div>
  </div>
);

const StatusRow = ({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-green-700">{label}</span>
    <span
      className={`flex items-center gap-1 ${ok ? "text-green-400" : "text-red-400"}`}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${ok ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
      />
      {value}
    </span>
  </div>
);

const SkillGroup = ({ label, items }: { label: string; items: string[] }) => (
  <div className="flex gap-2 items-start">
    <span className="text-green-700 w-20 shrink-0">{label}</span>
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span
          key={item}
          className="px-1.5 py-0.5 border border-green-800 text-green-400 text-[10px] rounded"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const RepoCard = ({
  repo,
}: {
  repo: ReturnType<typeof useGithubRepos>["repos"][number];
}) => (
  <a
    href={repo.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-2 rounded border border-green-900/40 hover:border-green-500/60 hover:bg-green-900/10 transition-all group"
  >
    <div className="flex justify-between items-start">
      <span className="text-green-300 group-hover:text-green-200 font-semibold text-[11px] truncate max-w-[120px]">
        {repo.name}
      </span>
      <span className="text-green-700 text-[10px] ml-1 shrink-0">
        ★ {repo.stars}
      </span>
    </div>
    {repo.description && (
      <p className="text-green-700 text-[10px] mt-0.5 line-clamp-2 leading-relaxed">
        {repo.description}
      </p>
    )}
    {repo.language && (
      <span className="mt-1 inline-block text-[10px] text-green-600 border border-green-900 px-1 rounded">
        {repo.language}
      </span>
    )}
  </a>
);

// ─── Mobile drawer ────────────────────────────────────────────────────────────

const MobileDrawer = ({
  open,
  onClose,
  repos,
  reposLoading,
}: {
  open: boolean;
  onClose: () => void;
  repos: ReturnType<typeof useGithubRepos>["repos"];
  reposLoading: boolean;
}) => (
  <>
    <div
      className={`fixed inset-0 bg-black/70 z-20 transition-opacity md:hidden ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    />
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 bg-zinc-950 border-t border-green-900/50
        font-mono text-green-400 text-xs rounded-t-2xl p-5 transition-transform duration-300 md:hidden
        max-h-[70vh] overflow-y-auto
        ${open ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-green-600 text-[10px] tracking-widest uppercase">
          system info
        </p>
        <button
          onClick={onClose}
          className="text-green-700 hover:text-green-400 text-lg leading-none"
        >
          ×
        </button>
      </div>

      <Section label="status">
        <StatusRow label="uptime" value="always on" ok />
        <StatusRow label="open to" value="collaborations" ok />
      </Section>

      <Section label="skills">
        <SkillGroup label="systems" items={["C", "C++", "Rust"]} />
        <SkillGroup label="scripting" items={["Python", "Bash", "JS/TS"]} />
        <SkillGroup label="security" items={["pentest", "CTF"]} />
      </Section>

      {!reposLoading && repos.length > 0 && (
        <Section label="repos">
          <div className="space-y-2">
            {repos.slice(0, 4).map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </Section>
      )}
    </div>
  </>
);

// ─── Main page ─────────────────────────────────────────────────────────────────

const MatrixPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [commandHistory, setCommandHistory] = useState<CommandSet[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const {
    repos,
    loading: reposLoading,
    error: reposError,
  } = useGithubRepos({
    username: "deadpanda",
    limit: 6,
  });

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commandHistory]);

  // Build command sets (repos injected once loaded)
  const allCommandSets = useMemo((): TypingTextLine[][] => {
    const repoLines: TypingTextLine[] = reposLoading
      ? [
          {
            text: "fetching pinned repositories…",
            delay: 0,
            className: `${OUTPUT_BASE} text-green-700 animate-pulse`,
            velocity: 20,
          },
        ]
      : reposError
        ? [
            {
              text: `error: ${reposError}`,
              delay: 0,
              className: `${OUTPUT_BASE} text-red-400`,
              velocity: 20,
            },
          ]
        : [
            {
              text: "NAME                  LANG          ★",
              delay: 0,
              className: `${OUTPUT_BASE} text-green-600 text-[10px] md:text-xs`,
              isPreformatted: false,
              velocity: 10,
            },
            ...repos.map((repo) => ({
              text: `${repo.name.padEnd(22)}${(repo.language ?? "N/A").padEnd(14)}${repo.stars}`,
              delay: 0,
              className: `${OUTPUT_BASE} hover:text-green-200`,
              isPreformatted: false,
              velocity: 8,
              link: repo.url,
            })),
          ];

    return [
      // about-me
      [
        {
          text: "./about-me",
          delay: 0,
          className: CMD_BASE,
          velocity: 60,
        },
        {
          text: "Hello World! I'm passionate about pentesting and learning new things. Enjoy your visit!",
          delay: 300,
          className: OUTPUT_BASE,
          velocity: 18,
        },
      ],
      // skills
      [
        {
          text: "ls -l ./skills/",
          delay: 0,
          className: CMD_BASE,
          velocity: 60,
        },
        {
          text: ".rw-r--r--  deadpanda  Low-level  (C, C++, Rust)",
          delay: 200,
          className: OUTPUT_BASE,
          velocity: 12,
        },
        {
          text: ".rw-r--r--  deadpanda  Scripting  (Python, Bash, JS/TS)",
          delay: 0,
          className: OUTPUT_BASE,
          velocity: 12,
        },
        {
          text: ".rw-r--r--  deadpanda  SoftSkills (Communication, Teamwork)",
          delay: 0,
          className: OUTPUT_BASE,
          velocity: 12,
        },
        {
          text: ".rw-r--r--  deadpanda  Security   (Pentesting, CTF, OSINT)",
          delay: 0,
          className: OUTPUT_BASE,
          velocity: 12,
        },
      ],
      // repos
      [
        {
          text: "repo --pinned",
          delay: 0,
          className: CMD_BASE,
          velocity: 60,
        },
        ...repoLines,
      ],
    ];
  }, [repos, reposLoading, reposError]);

  // Bootstrap first command set
  useEffect(() => {
    const id = setTimeout(() => {
      setCommandHistory([{ id: 0, lines: allCommandSets[0] }]);
    }, 400);
    return () => clearTimeout(id);
  }, [allCommandSets]);

  // Reveal right panel after first command finishes
  const handleCommandSetComplete = () => {
    setPanelVisible(true);
    const nextIndex = currentSetIndex + 1;
    if (nextIndex < allCommandSets.length) {
      setCurrentSetIndex(nextIndex);
      setCommandHistory((prev) => [
        ...prev,
        { id: prev.length, lines: allCommandSets[nextIndex] },
      ]);
    }
  };

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-slide-in {
          animation: fadeSlideIn 0.35s ease forwards;
        }
      `}</style>

      <div className="flex flex-row min-h-screen bg-black divide-x-0 md:divide-x md:divide-green-900/40">
        {/* ── Terminal panel ── */}
        <div className="w-full md:w-3/5 bg-black text-green-400 font-mono p-4 md:p-8 flex flex-col h-screen overflow-y-auto scrollbar-hide">
          <TerminalHeader displayPrompt={false} pwd="/matrix" />

          {/* Mobile info button */}
          <div className="md:hidden flex justify-end mb-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-[10px] text-green-600 border border-green-800 px-3 py-1 rounded hover:border-green-500 hover:text-green-400 transition-colors"
            >
              sys info ↑
            </button>
          </div>

          {/* Command history */}
          <div className="flex-1 min-w-0">
            {commandHistory.map((set, index) => (
              <div
                key={set.id}
                className="mb-6 fade-slide-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex gap-2 items-start">
                  <Prompt pwd="/matrix" isMobile={isMobile} />
                  <div className="flex-1 min-w-0">
                    <TypingText
                      lines={set.lines}
                      onComplete={
                        index === commandHistory.length - 1
                          ? handleCommandSetComplete
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Blinking prompt at bottom */}
          <div className="flex items-center mt-2">
            <Prompt pwd="/matrix" isMobile={isMobile} />
            <span className="ml-1 inline-block w-2 h-4 bg-green-400 animate-pulse opacity-70" />
          </div>
        </div>

        {/* ── Right panel (desktop) ── */}
        <InfoPanel
          visible={panelVisible}
          repos={repos}
          reposLoading={reposLoading}
          reposError={reposError}
        />
      </div>

      {/* ── Mobile drawer ── */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        repos={repos}
        reposLoading={reposLoading}
      />
    </>
  );
};

export default MatrixPage;
