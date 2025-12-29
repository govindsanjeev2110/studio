"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/action";
import { Send } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const initialState = {
  message: "",
  errors: null,
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/90"
    >
      {pending ? "Sending..." : "Send Message"}
      {!pending && <Send className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.isSuccess ? "Success!" : "Oops!",
        description: state.message,
        variant: state.isSuccess ? "default" : "destructive",
      });
      if (state.isSuccess) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  // This function will be called on form submission.
  // We can still use the server action.
  const onSubmit = (data: ContactFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formAction(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your Name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="How can we help you?"
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
