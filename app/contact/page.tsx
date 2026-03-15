import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-bold mb-6">Get in <span className="gradient-text">Touch</span></h1>
            <p className="text-xl text-muted mb-12">
              Have a question, feedback, or a tool suggestion? We&apos;d love to hear from you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-muted">support@ilustradolabs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Community</h4>
                  <p className="text-muted">Join our Discord server for real-time support.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <TextArea placeholder="How can we help you?" className="h-32" />
              </div>
              <Button className="w-full py-6 text-lg">
                <Send size={18} className="mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
