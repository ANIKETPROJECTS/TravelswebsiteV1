import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, 
  Loader2, CheckCircle, Facebook, Instagram, Twitter, Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { companyInfo, sampleFaqs } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { icon: Facebook, href: companyInfo.socialMedia.facebook, label: "Facebook" },
  { icon: Instagram, href: companyInfo.socialMedia.instagram, label: "Instagram" },
  { icon: Twitter, href: companyInfo.socialMedia.twitter, label: "Twitter" },
  { icon: Youtube, href: companyInfo.socialMedia.youtube, label: "YouTube" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-16" data-testid="page-contact">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Have questions about a tour or need help planning your trip? We're here to help!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {isSuccess ? (
                <div className="text-center py-12" data-testid="contact-success">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} data-testid="button-send-another">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold mb-6">Send Us a Message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} data-testid="input-fullname" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (optional)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+1 234 567 8900" {...field} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <FormControl>
                                <Input placeholder="Tour inquiry" {...field} data-testid="input-subject" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us how we can help..."
                                className="min-h-[150px] resize-none"
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        disabled={isSubmitting}
                        data-testid="button-submit-contact"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                  data-testid="link-phone"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{companyInfo.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                  data-testid="link-email"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{companyInfo.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-muted-foreground">{companyInfo.officeHours}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open(`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, "")}`, "_blank")}
                  data-testid="button-whatsapp"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = `tel:${companyInfo.phone}`}
                  data-testid="button-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6">
              <h3 className="font-heading text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <Card className="overflow-hidden">
            <div className="aspect-[21/9] bg-muted overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0891819562157!2d73.00434132346872!3d19.176901950580347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8f8c8f8c8f9%3A0x9f9f9f9f9f9f9f9f!2sPAP%2001%2C%20Sant%20Jalaram%20Bappa%20Market%2C%20Mulund%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1234567890"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Card>
          <div className="mt-4 text-center">
            <h3 className="font-heading text-lg font-semibold mb-2">Visit Our Office</h3>
            <p className="text-muted-foreground mb-4">{companyInfo.address}</p>
            <Button
              variant="outline"
              onClick={() => window.open("https://maps.app.goo.gl/bihKTUkutLhYoVbG9", "_blank")}
              data-testid="button-open-map"
            >
              Open in Google Maps
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16" id="faq">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about booking, travel, and our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {sampleFaqs.map((faq, idx) => (
                <AccordionItem key={faq.id} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left" data-testid={`faq-${idx}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
