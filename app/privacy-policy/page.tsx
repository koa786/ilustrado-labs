import { Container } from "@/components/layout/Container";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-muted space-y-6">
            <p>Last updated: March 15, 2026</p>
            <p>
              At Ilustrado Labs, we take your privacy seriously. This Privacy Policy explains how we handle your data when you use our developer tools platform.
            </p>
            
            <h2 className="text-2xl font-bold text-foreground mt-8">1. Data Collection</h2>
            <p>
              <strong>We do not collect your personal data or tool inputs.</strong> All tools on Ilustrado Labs run entirely in your web browser using client-side JavaScript. Your inputs, code snippets, and data are processed locally on your machine and are never transmitted to our servers.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Analytics</h2>
            <p>
              We may use anonymous analytics tools to understand how our website is used. This data is aggregated and does not identify individual users. It helps us improve our tools and user experience.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">3. Cookies</h2>
            <p>
              We use local storage to save your theme preferences (Dark/Light mode). We do not use tracking cookies for advertising purposes.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">4. Third-Party Services</h2>
            <p>
              We may display advertisements through Google AdSense. These services may use cookies to serve ads based on your visits to this and other websites.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">5. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@ilustradolabs.com.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
