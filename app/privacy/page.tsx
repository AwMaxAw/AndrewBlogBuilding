import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Disclaimer",
  description: "Privacy policy and legal disclaimers for user-generated content.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Privacy & Disclaimer
        </h1>
        <p className="text-muted text-lg">
          Last updated: September 2026
        </p>
      </header>

      <section className="space-y-10 text-foreground/80 leading-relaxed">
        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">1. No Endorsement of User Content</h2>
          <p>
            This website contains user-generated content, including but not limited to comments, messages, and
            submissions posted by visitors through the guestbook, blog comments, or other interactive features.
            All opinions expressed in such content are solely those of the individual authors and do not
            necessarily reflect the views, beliefs, or opinions of the site owner, operators, or any affiliates.
            We do not endorse, support, or agree with any user-generated content posted on this site.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">2. User-Generated Content Disclaimer</h2>
          <p className="mb-4">
            The site owner makes no representations or warranties, express or implied, about the accuracy,
            completeness, legality, or reliability of any user-generated content. Visitors who rely on any
            such content do so entirely at their own risk.
          </p>
          <p>
            We shall not be liable for any errors, omissions, or statements made by third parties appearing
            on this site. Under no circumstances shall we be liable for any direct, indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses
            resulting from your access to or use of or inability to access or use the content.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">3. Content Moderation</h2>
          <p className="mb-4">
            We may, but are not obligated to, monitor, review, edit, or remove any user-generated content
            at our sole discretion. We reserve the right to refuse service, terminate accounts, remove or
            edit content, or cancel orders at any time for any reason. We do not guarantee timely removal
            of objectionable content.
          </p>
          <p>
            If you encounter content that you believe violates these terms or applicable law, please
            contact us and we will review your report. However, you acknowledge that we have no duty to
            remove any content, and our review process may take a reasonable amount of time.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">4. No Legal Advice</h2>
          <p>
            All content on this website, including user-submitted comments, is provided for informational
            purposes only and is not intended to constitute legal, medical, financial, or any other
            professional advice. You should consult with a qualified professional before acting on any
            information obtained from this site.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">5. Third-Party Links</h2>
          <p>
            This website may contain links to third-party websites or resources. We are not responsible
            for and do not endorse the content, products, or services available on or through such
            third-party websites or resources. You acknowledge and agree that we shall not be responsible
            or liable for any damage or loss caused by or in connection with the use of any such content,
            goods, or services.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">6. Intellectual Property</h2>
          <p className="mb-4">
            By posting content to this website, you represent and warrant that you have the right to do so
            and that such content does not violate any law or the rights of any third party. You grant us
            a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and publish
            such content solely for the purpose of operating this website.
          </p>
          <p>
            You retain ownership of the content you post, but you acknowledge that we may remove any
            content at our discretion without notice.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, in no event shall the site owner, its
            operators, affiliates, or any of their respective officers, directors, employees, agents,
            or licensors be liable for any indirect, incidental, special, consequential, exemplary, or
            punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from
            your access to or use of or inability to access or use this website or any content thereon.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">8. Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify or update this disclaimer at any time without prior notice.
            Any changes will be effective immediately upon posting to this page. Your continued use of
            this website after any such changes constitutes your acceptance of the revised disclaimer.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">9. Contact</h2>
          <p>
            If you have any questions about this disclaimer or any content posted on this site, please
            contact us through the appropriate channels listed on this website.
          </p>
        </div>
      </section>
    </div>
  );
}
