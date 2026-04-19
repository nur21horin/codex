export default function About() {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-10">

      <div className="max-w-4xl w-full bg-card border border-muted shadow-lg rounded-2xl p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          About CodeShare 🚀
        </h1>

        <p className="text-center text-muted mb-8">
          A competitive programming platform to share solutions, insights, and problem-solving techniques
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* CARD */}
          <div className="bg-bg border border-muted p-5 rounded-xl hover:scale-[1.02] transition">
            <h2 className="font-semibold text-secondary">💡 What is CodeShare?</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              CodeShare is a platform where competitive programmers share detailed solutions,
              approaches, and explanations of algorithmic problems from contests and practice platforms.
            </p>
          </div>

          <div className="bg-bg border border-muted p-5 rounded-xl hover:scale-[1.02] transition">
            <h2 className="font-semibold text-secondary">🎯 Purpose</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              To help programmers learn faster by understanding greedy, DP, graphs, math,
              and data structures through shared high-quality solutions.
            </p>
          </div>

          <div className="bg-bg border border-muted p-5 rounded-xl hover:scale-[1.02] transition">
            <h2 className="font-semibold text-secondary">⚡ Features</h2>
            <ul className="text-sm text-muted mt-2 space-y-1">
              <li>✔ Share CP solutions</li>
              <li>✔ Explain optimal approaches</li>
              <li>✔ Search by tags & topics</li>
              <li>✔ Like & comment system</li>
            </ul>
          </div>

          <div className="bg-bg border border-muted p-5 rounded-xl hover:scale-[1.02] transition">
            <h2 className="font-semibold text-secondary">📘 What Users Share</h2>
            <ul className="text-sm text-muted mt-2 space-y-1">
              <li>✔ Codeforces / AtCoder / LeetCode solutions</li>
              <li>✔ Editorial-style explanations</li>
              <li>✔ Optimization techniques</li>
              <li>✔ Edge case analysis</li>
            </ul>
          </div>

          <div className="bg-bg border border-muted p-5 rounded-xl hover:scale-[1.02] transition md:col-span-2">
            <h2 className="font-semibold text-accent">🛠 Tech Stack</h2>
            <p className="text-sm text-muted mt-2">
              React + Vite • Node.js + Express • MongoDB • Tailwind CSS • DaisyUI
            </p>
          </div>

          <div className="bg-bg border border-muted p-5 rounded-xl hover:scale-[1.02] transition md:col-span-2">
            <h2 className="font-semibold text-primary">🌍 Goal</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              To build a strong competitive programming community where learners grow through
              shared problem-solving knowledge and real contest experience.
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center text-muted text-sm">
          Built for competitive programmers ⚡
        </div>

      </div>
    </div>
  );
}