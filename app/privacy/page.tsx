import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Legal Disclaimer",
  description: "Full legal terms, privacy policy, and disclaimers for user-generated content.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Privacy Policy & Legal Disclaimer
        </h1>
        <p className="text-muted text-lg">
          Last updated: September 2026
        </p>
      </header>

      <section className="space-y-12 text-foreground/80 leading-relaxed">
        {/* === USER-GENERATED CONTENT DISCLAIMER === */}
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
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">4. Prohibited Content</h2>
          <p className="mb-4">You agree NOT to post content that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Is unlawful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
            <li>Violates any applicable law, regulation, or third-party rights</li>
            <li>Infringes any patent, trademark, copyright, trade secret, or other intellectual property</li>
            <li>Constitutes spam, advertising, or unsolicited promotions</li>
            <li>Contains viruses, trojans, malicious code, or any disruptive technology</li>
            <li>Impersonates any person or entity, or misrepresents your affiliation</li>
            <li>Is harmful to minors or promotes illegal activities</li>
          </ul>
          <p className="mt-4">
            We reserve the right to remove any content that violates these prohibitions and may disclose
            such content to law enforcement authorities as required by law.
          </p>
        </div>

        {/* === PRIVACY POLICY === */}
        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">5. Privacy Policy — Information We Collect</h2>
          <p className="mb-4">
            We collect minimal information necessary to operate this website and its interactive features.
            This may include:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Information you voluntarily provide:</strong> When you submit a comment or guestbook entry, we collect your name and the message content you provide.</li>
            <li><strong>Automatically collected information:</strong> Server logs may record your IP address, browser type, operating system, referring page, and timestamp of each request. This data is used solely for security, debugging, and improving the service.</li>
            <li><strong>Cookies and similar technologies:</strong> We may use essential cookies to maintain your session. We do not use tracking cookies, advertising cookies, or third-party analytics cookies on this site.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">6. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect only to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Operate, maintain, and improve the website and its features</li>
            <li>Display user-submitted content (comments, guestbook entries)</li>
            <li>Respond to abuse reports and enforce our terms of service</li>
            <li>Comply with legal obligations and protect our rights</li>
          </ul>
          <p className="mt-4">
            We do not sell, rent, trade, or otherwise disclose your personal information to third parties,
            except as required by law or to protect our rights and safety.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">7. Data Storage & Security</h2>
          <p className="mb-4">
            Your data is stored on servers located in [your country/region]. We implement reasonable
            administrative, technical, and physical safeguards to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
            over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          <p>
            We retain user-submitted content (comments, guestbook entries) for as long as necessary to
            fulfill the purposes described in this policy, unless a longer retention period is required or
            permitted by law.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">8. Your Rights (GDPR, CCPA, and Similar Laws)</h2>
          <p className="mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Right to access:</strong> You may request a copy of the personal data we hold about you.</li>
            <li><strong>Right to correction:</strong> You may request that we correct inaccurate or incomplete data.</li>
            <li><strong>Right to deletion:</strong> You may request that we delete your personal data, subject to certain legal exceptions.</li>
            <li><strong>Right to restrict processing:</strong> You may request that we limit how we use your data.</li>
            <li><strong>Right to data portability:</strong> You may request a machine-readable copy of your data.</li>
            <li><strong>Right to object:</strong> You may object to certain processing of your personal data.</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us through the channels listed at the end of
            this page. We will respond to your request within 30 days or as required by applicable law.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">9. Children&apos;s Privacy</h2>
          <p>
            This website is not directed at children under the age of 13, and we do not knowingly collect
            personal information from children under 13. If we become aware that we have collected personal
            information from a child under 13, we will take steps to delete such information promptly.
          </p>
        </div>

        {/* === LEGAL TERMS === */}
        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">10. No Legal, Medical, or Professional Advice</h2>
          <p>
            All content on this website, including user-submitted comments, is provided for informational
            purposes only and is not intended to constitute legal, medical, financial, psychological, or
            any other professional advice. You should consult with a qualified professional before acting on any
            information obtained from this site. We shall not be responsible for any reliance you place on
            such information.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">11. Third-Party Links</h2>
          <p>
            This website may contain links to third-party websites or resources. We are not responsible
            for and do not endorse the content, products, or services available on or through such
            third-party websites or resources. You acknowledge and agree that we shall not be responsible
            or liable for any damage or loss caused by or in connection with the use of any such content,
            goods, or services. We encourage you to review the privacy policies and terms of service of
            any third-party websites you access from this site.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">12. Intellectual Property</h2>
          <p className="mb-4">
            By posting content to this website, you represent and warrant that you have the right to do so
            and that such content does not violate any law or the rights of any third party. You grant us
            a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and publish
            such content solely for the purpose of operating this website.
          </p>
          <p className="mb-4">
            You retain ownership of the content you post, but you acknowledge that we may remove any
            content at our discretion without notice. If you believe your intellectual property rights have
            been infringed by content on this site, please contact us with the following information:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>A description of the copyrighted work or intellectual property you claim has been infringed</li>
            <li>The exact URL(s) where the infringing material appears</li>
            <li>Your contact information</li>
            <li>A statement under penalty of perjury that you are the rightful owner and that the information in your notice is accurate</li>
          </ul>
          <p className="mt-4">
            We will review and respond to properly submitted infringement notices promptly.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">13. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, in no event shall the site owner, its
            operators, affiliates, or any of their respective officers, directors, employees, agents,
            or licensors be liable for any indirect, incidental, special, consequential, exemplary, or
            punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from
            your access to or use of or inability to access or use this website or any content thereon,
            even if we have been advised of the possibility of such damages.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">14. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless the site owner and its affiliates from and
            against any claims, liabilities, damages, losses, and expenses (including reasonable
            attorneys&apos; fees) arising out of or in any way connected with: (a) your access to or use of
            this website; (b) your violation of these terms; or (c) your violation of any law or the
            rights of any third party. We reserve the right to assume the exclusive defense and control
            of any matter subject to indemnification by you.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">15. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of [your jurisdiction],
            without regard to conflict of law principles. Any disputes arising from or relating to this
            website or these terms shall be subject to the exclusive jurisdiction of the courts located in
            [your jurisdiction].
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">16. Changes to This Policy</h2>
          <p>
            We reserve the right to modify or update this privacy policy and disclaimer at any time
            without prior notice. Any changes will be effective immediately upon posting to this page.
            Your continued use of this website after any such changes constitutes your acceptance of the
            revised terms. We encourage you to review this page periodically for any updates.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-semibold mb-4 text-foreground">17. Contact</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy, disclaimer, or any content posted on
            this site, or if you wish to exercise your data privacy rights, please contact us through
            the appropriate channels listed on this website.
          </p>
          <p className="text-muted text-sm">
            We make our best effort to respond to legitimate requests within a reasonable timeframe.
          </p>
        </div>

        <div className="pt-6 border-t border-border/40">
          <p className="text-sm text-muted italic">
            <strong>Summary:</strong> This website contains user-generated content over which we have no
            control. Content posted by visitors does not reflect our views. We do not endorse, support,
            or guarantee the accuracy, legality, or reliability of any user-submitted content. Visitors
            rely on such content entirely at their own risk.
          </p>
        </div>
      </section>
    </div>
  );
}
