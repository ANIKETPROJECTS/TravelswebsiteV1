import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MessageCircle, Calendar, Users, X, CheckCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { companyInfo, sampleTours } from "@/lib/data";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  tourId: z.string().optional(),
  travelDate: z.string().optional(),
  travelers: z.coerce.number().min(1).max(20),
  message: z.string().optional(),
  contactPreference: z.enum(["email", "phone", "whatsapp"]),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedTourId?: string;
  preselectedTourTitle?: string;
}

export function InquiryModal({ open, onOpenChange, preselectedTourId, preselectedTourTitle }: InquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      tourId: preselectedTourId || "",
      travelDate: "",
      travelers: 2,
      message: "",
      contactPreference: "email",
    },
  });

  useEffect(() => {
    if (preselectedTourId) {
      form.setValue("tourId", preselectedTourId);
    }
  }, [preselectedTourId, form]);

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);

        if (data.contactPreference === "whatsapp") {
          const message = encodeURIComponent(
            `Hi! I'm ${data.fullName} and I'm interested in ${preselectedTourTitle || "your tours"}. ` +
            `Travel date: ${data.travelDate || "Flexible"}. Travelers: ${data.travelers}.`
          );
          window.open(`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false);
      form.reset();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti absolute w-3 h-3 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ["#FF6B35", "#0A7E8C", "#F4A261", "#22C55E", "#A855F7"][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {isSuccess ? (
          <div className="py-8 text-center" data-testid="inquiry-success">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">
              We've received your inquiry and will get back to you within 24 hours.
            </p>
            <Button onClick={handleClose} data-testid="button-close-success">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">
                {preselectedTourTitle ? `Inquire About: ${preselectedTourTitle}` : "Get a Custom Quote"}
              </DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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

                <div className="grid grid-cols-2 gap-4">
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

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 234 567 8900" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!preselectedTourId && (
                  <FormField
                    control={form.control}
                    name="tourId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interested Tour</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-tour">
                              <SelectValue placeholder="Select a tour (optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sampleTours.map((tour) => (
                              <SelectItem key={tour.id} value={tour.id}>
                                {tour.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="travelDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Travel Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-travel-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Travelers</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={20} {...field} data-testid="input-travelers" />
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
                      <FormLabel>Special Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about any special requirements or questions..."
                          className="resize-none"
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" data-testid="radio-email" />
                            <Label htmlFor="email" className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" data-testid="radio-phone" />
                            <Label htmlFor="phone" className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              Phone
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="whatsapp" id="whatsapp" data-testid="radio-whatsapp" />
                            <Label htmlFor="whatsapp" className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              WhatsApp
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={isSubmitting}
                    data-testid="button-submit-inquiry"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Inquiry
                      </>
                    )}
                  </Button>
                </div>

                {/* Quick contact buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 text-green-600 hover:text-green-700 hover:border-green-300"
                    onClick={() => {
                      form.setValue("contactPreference", "whatsapp");
                      form.handleSubmit(onSubmit)();
                    }}
                    disabled={isSubmitting}
                    data-testid="button-whatsapp-inquiry"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${companyInfo.phone}`}
                    data-testid="button-call-inquiry"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
