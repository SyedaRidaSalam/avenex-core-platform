export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono text-zinc-600 tracking-[0.4em] uppercase">
            Legal / Terms of Service
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight uppercase">
            Terms of
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700">
              &nbsp;Service
            </span>
          </h1>
          <p className="text-zinc-500 font-mono text-xs">
            Effective Date: June 13, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing Avenex Systems, you agree to be bound by these Terms
              of Service. If you are entering into these terms on behalf of a
              company or other legal entity, you represent that you have the
              authority to bind such entity to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              2. Service Usage
            </h2>
            <p>
              Avenex Systems provides high-performance infrastructure. You agree
              not to use our cloud engines for:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                Reverse engineering or deconstructing our proprietary
                distributed network architecture.
              </li>
              <li>
                Unauthorized penetration testing or stress-testing our
                infrastructure.
              </li>
              <li>
                Hosting illegal content or activities that violate global data
                sovereignty regulations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              3. Intellectual Property
            </h2>
            <p>
              All software, algorithms, cloud engine specifications, and
              documentation are the exclusive property of Avenex Systems. Your
              access to the platform does not grant you any ownership rights or
              interest in our underlying intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              4. Limitation of Liability
            </h2>
            <p>
              Avenex Systems provides infrastructure "as is." To the maximum
              extent permitted by law, Avenex shall not be liable for any
              indirect, incidental, or consequential damages arising from the
              use or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              5. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate access to Avenex
              Systems at our discretion, without notice, for conduct that we
              believe violates these Terms of Service or is harmful to other
              users or our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">
              6. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Avenex Systems is
              incorporated, without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
