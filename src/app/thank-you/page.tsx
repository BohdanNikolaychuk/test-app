"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ArrowLeft, CheckCircle2, ClipboardList } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SubmissionData = {
  name: string;
  email: string;
  github: string;
  level: string;
  assignment: string;
};

export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(
    null
  );

  useEffect(() => {
    // Try to get submission data from URL or localStorage
    try {
      // First check if data is in URL (encoded)
      const dataParam = searchParams.get("data");

      if (dataParam) {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setSubmissionData(decodedData);
      } else {
        // Fallback to localStorage
        const storedData = localStorage.getItem("submissionData");
        if (storedData) {
          setSubmissionData(JSON.parse(storedData));
        }
      }
    } catch (error) {
      console.error("Error parsing submission data:", error);
    }
  }, [searchParams]);

  const handleGoBack = () => {
    router.push("/");
  };

  const formatLevel = (level: string) => {
    const levels: Record<string, string> = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      expert: "Expert",
    };
    return levels[level] || level;
  };

  return (
    <div className="w-full px-4 py-12 sm:px-0 min-h-screen flex items-center justify-center bg-muted/20">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold sm:text-3xl">
            Thank You!
          </CardTitle>
          <CardDescription className="text-base">
            Your assignment has been successfully submitted.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {submissionData ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="submission-details">
                <AccordionTrigger className="text-base font-medium">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    View Submission Details
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2 pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Name
                        </p>
                        <p className="font-medium">{submissionData.name}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <p className="font-medium">{submissionData.email}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          GitHub Repository
                        </p>
                        <a
                          href={submissionData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline break-all"
                        >
                          {submissionData.github}
                        </a>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Candidate Level
                        </p>
                        <p className="font-medium">
                          {formatLevel(submissionData.level)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Assignment Submission
                      </p>
                      <div className="p-4 bg-muted rounded-md">
                        <p className="whitespace-pre-wrap">
                          {submissionData.assignment}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">
                No submission details available.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={handleGoBack}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Form
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
