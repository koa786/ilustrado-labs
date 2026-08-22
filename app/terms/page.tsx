import { Container } from "@/components/layout/Container";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "Review the terms and conditions for using Ilustrado Labs' free browser-based developer tools.",
  canonical: "/terms",
});

export default function TermsOfServicePage() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-muted space-y-6">
            <p>Last updated: March 15, 2026</p>
            <p>
              By accessing or using Ilustrado Labs, you agree to be bound by these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">1. Use of Services</h2>
            <p>
              Ilustrado Labs provides free browser-based developer tools. You may use these tools for personal or professional purposes. You agree not to use the services for any illegal or unauthorized purpose.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Disclaimer of Warranties</h2>
            <p>
              The tools are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. We do not guarantee that the tools will be error-free or uninterrupted.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">3. Limitation of Liability</h2>
            <p>
              In no event shall Ilustrado Labs be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the tools.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">4. Intellectual Property</h2>
            <p>
              All content and tools on Ilustrado Labs are the property of Ilustrado Labs or its licensors and are protected by intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">5. Modifications to Service</h2>
            <p>
              We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Ilustrado Labs operates.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">7. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at support@ilustradolabs.com.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
