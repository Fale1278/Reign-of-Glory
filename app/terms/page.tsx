export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-bold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Reign of Glory Ministries&apos; website for personal, non-commercial transitory viewing only.
            </p>
            <p>
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on our website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground">3. Donations</h2>
            <p>
              All donations made through our website are final and non-refundable unless otherwise required by law or in exceptional circumstances at our discretion.
            </p>

            <h2 className="text-2xl font-bold text-foreground">4. Disclaimer</h2>
            <p>
              The materials on our website are provided on an &apos;as is&apos; basis. Reign of Glory Ministries makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-bold text-foreground">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of our jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
