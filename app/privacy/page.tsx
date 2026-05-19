export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Reign of Glory Ministries (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-bold text-foreground">2. The Data We Collect About You</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes bank account and payment card details (processed securely by our payment partners).</li>
              <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process your donations.</li>
              <li>To manage your event registrations.</li>
              <li>To respond to your prayer requests and inquiries.</li>
              <li>To send you newsletters and updates (if you have opted in).</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>

            <h2 className="text-2xl font-bold text-foreground">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at info@reignofglory.org.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
