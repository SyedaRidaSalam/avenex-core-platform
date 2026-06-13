export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono text-zinc-600 tracking-[0.4em] uppercase">
            Legal / Data Governance
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
            Data Protection & 
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700">
            &nbsp;Privacy
            </span>
          </h1>
          <p className="text-zinc-500 font-mono text-xs">
            Last Updated: June 13, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              1. Commitment to Privacy
            </h2>
            <p>
              At Avenex Systems, we engineer privacy into our core architecture.
              We believe that your data belongs to you, and our role is merely
              to act as the custodian of your operational data while providing
              enterprise-grade infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              2. Data We Collect
            </h2>
            <p>
              We only collect data that is essential for the performance of our
              low-latency distributed networks:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>Identity Data:</strong> Name, email address, and
                professional credentials provided during onboarding.
              </li>
              <li>
                <strong>Operational Data:</strong> System telemetry and logs
                generated while utilizing Avenex cloud engines.
              </li>
              <li>
                <strong>Usage Metrics:</strong> Aggregated, anonymized
                performance data to improve latency and fault tolerance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              3. Data Integrity & Security
            </h2>
            <p>
              We implement industry-standard encryption protocols (AES-256 at
              rest, TLS 1.3 in transit). Avenex Systems does not sell, trade, or
              lease your data to third-party aggregators. Your data remains
              isolated within your dedicated logical partitions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              4. Your Rights
            </h2>
            <p>
              You maintain full sovereignty over your data. You have the right
              to:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Request access to your stored data.</li>
              <li>Demand immediate deletion of non-essential records.</li>
              <li>Opt-out of any non-critical telemetry collection.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              5. Contact Information
            </h2>
            <p>
              For inquiries regarding data governance, please reach out to our
              privacy office at:
              <br />
              <a
                href="mailto:avenex.io@gmail.com"
                className="text-white underline underline-offset-4"
              >
                avenex.io@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
