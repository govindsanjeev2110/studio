"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/action";
import { Mail, MessageSquare, Send, User, Phone } from "lucide-react";
import RichTextEditor from "@/components/ui/rich-text-editor";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z
    .union([
      z.string().length(0),
      z
        .string()
        .regex(/^\+91 \d{10}$/, "Mobile number must be 10 digits after +91."),
    ])
    .optional()
    .or(z.literal("")),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(15, { message: "Message must be at least 15 characters." })
    .max(5000),
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
      mobile: "",
      email: "",
      message: "",
    },
    mode: "onChange",
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

  const onSubmit = (data: ContactFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        // Send only the 10 digits for mobile to the server action
        if (key === "mobile") {
          formData.append(key, value.replace("+91 ", ""));
        } else {
          formData.append(key, value);
        }
      }
    });
    formAction(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Your Name"
              {...form.register("name")}
              className="pl-10"
            />
          </div>
          {form.formState.errors.name && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number (Optional)</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Controller
              name="mobile"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="mobile"
                  type="tel"
                  placeholder="+91 Your Mobile Number"
                  className="pl-10"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    const digitsOnly = inputValue.replace(/\D/g, "");
                    const currentValue = field.value || "";

                    // If user is trying to delete "+91 " prefix, allow it.
                    if (
                      inputValue.length < currentValue.length &&
                      !inputValue.startsWith("+91 ")
                    ) {
                      field.onChange("");
                      return;
                    }

                    // Remove the '91' if it's the start of the digits
                    let number = digitsOnly;
                    if (number.startsWith("91")) {
                      number = number.substring(2);
                    }

                    // Limit to 10 digits
                    number = number.substring(0, 10);

                    if (number.length > 0) {
                      field.onChange("+91 " + number);
                    } else {
                      field.onChange("");
                    }
                  }}
                />
              )}
            />
          </div>
          {form.formState.errors.mobile && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.mobile.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...form.register("email")}
            className="pl-10"
          />
        </div>
        {form.formState.errors.email && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Controller
          name="message"
          control={form.control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
            />
          )}
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
