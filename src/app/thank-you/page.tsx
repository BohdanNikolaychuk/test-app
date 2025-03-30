"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Code,
  ExternalLink,
  Github,
  Mail,
  User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const githubRepoUrl = searchParams.get("github_repo_url");
  const candidateLevel = searchParams.get("candidate_level");
  const assignmentDescription = searchParams.get("assignment_description");

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-3xl shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>

            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
              Thank You!
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Your assignment has been successfully submitted. We&apos;ll review
              it shortly.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6 pb-2 space-y-6">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="submission-details"
            >
              <AccordionItem value="submission-details" className="border-b-0">
                <AccordionTrigger className="text-base font-medium py-3 px-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    View Submission Details
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-1">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <p className="text-sm font-medium">Name</p>
                        </div>
                        <p className="font-medium text-foreground pl-6 break-words">
                          {name}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <p className="text-sm font-medium">Email</p>
                        </div>
                        <p className="font-medium text-foreground pl-6 break-words">
                          {email}
                        </p>
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Github className="h-4 w-4" />
                          <p className="text-sm font-medium">
                            GitHub Repository
                          </p>
                        </div>
                        <a
                          href={githubRepoUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 pl-6 break-all"
                        >
                          {githubRepoUrl}
                          <ExternalLink className="h-3 w-3 inline flex-shrink-0" />
                        </a>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Code className="h-4 w-4" />
                          <p className="text-sm font-medium">Candidate Level</p>
                        </div>
                        <div className="pl-6">
                          <Badge
                            variant="outline"
                            className="font-medium bg-primary/5"
                          >
                            {candidateLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Assignment Submission
                      </p>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {assignmentDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 pt-4 pb-6">
            <Button
              onClick={handleGoBack}
              className="w-full sm:w-auto flex items-center gap-2"
              size="lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Form
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  );
}
