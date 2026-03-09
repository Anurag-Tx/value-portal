"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import type { IdeaWithRelations } from "@/types";
import Link from "next/link";

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-400",
  submitted: "bg-blue-500/10 text-blue-400",
  under_review: "bg-amber-500/10 text-amber-400",
  approved: "bg-green-500/10 text-green-400",
  in_progress: "bg-cyan-500/10 text-cyan-400",
  implemented: "bg-emerald-500/10 text-emerald-400",
  rejected: "bg-red-500/10 text-red-400",
};

const categoryLabels: Record<string, string> = {
  automation: "Automation",
  cost_optimization: "Cost Optimization",
  efficiency: "Efficiency",
  risk_reduction: "Risk Reduction",
  innovation: "Innovation",
  process_improvement: "Process Improvement",
};

const effortColors: Record<string, string> = {
  low: "bg-green-500/10 text-green-400",
  medium: "bg-amber-500/10 text-amber-400",
  high: "bg-red-500/10 text-red-400",
};

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

export default function IdeaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const router = useRouter();
  const [idea, setIdea] = useState<IdeaWithRelations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !id) return;
    api<IdeaWithRelations>(`/api/ideas/${id}`, { token })
      .then(setIdea)
      .catch(() => router.push("/ideas"))
      .finally(() => setLoading(false));
  }, [token, id, router]);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground py-12 text-center">
        Loading...
      </p>
    );
  }

  if (!idea) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" render={<Link href="/ideas" />}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{idea.title}</h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge
              variant="secondary"
              className={statusColors[idea.status]}
            >
              {idea.status.replace("_", " ")}
            </Badge>
            <Badge variant="outline">
              {categoryLabels[idea.idea_category] || idea.idea_category}
            </Badge>
            <Badge
              variant="secondary"
              className={effortColors[idea.estimated_effort]}
            >
              {idea.estimated_effort} effort
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Problem Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">
                {idea.problem_statement}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Proposed Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">
                {idea.proposed_solution}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Account" value={idea.account?.account_name ?? null} />
            <Field label="Submitted by" value={idea.submitter?.full_name ?? null} />
            <Field
              label="Estimated Savings"
              value={
                idea.estimated_saving
                  ? `$${Number(idea.estimated_saving).toLocaleString()}`
                  : null
              }
            />
            <Field label="Timeline" value={idea.estimated_timeline} />
            <Field
              label="Impact Areas"
              value={
                idea.impact_area?.length ? idea.impact_area.join(", ") : null
              }
            />
            <Field
              label="Tools / Tech"
              value={
                idea.tools_involved?.length
                  ? idea.tools_involved.join(", ")
                  : null
              }
            />
            <Field
              label="Created"
              value={new Date(idea.created_at).toLocaleDateString()}
            />
            {idea.ai_category && (
              <>
                <Separator />
                <Field label="AI Category" value={idea.ai_category} />
                <Field label="AI Summary" value={idea.ai_summary} />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity & Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Comments and status timeline will be available in Step 3.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
