import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, TrendingUp, Trophy } from "lucide-react";

const stats = [
  {
    title: "Total Leads",
    value: "0",
    description: "Across all accounts",
    icon: Target,
  },
  {
    title: "Value Ideas",
    value: "0",
    description: "Submitted ideas",
    icon: Lightbulb,
  },
  {
    title: "Revenue Influenced",
    value: "$0",
    description: "From qualified leads",
    icon: TrendingUp,
  },
  {
    title: "Your Score",
    value: "0",
    description: "Value points earned",
    icon: Trophy,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Value Portal. Track leads, ideas, and measure your impact.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No submissions yet. Start by creating a lead or value idea.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No pending assignments. You&apos;re all caught up.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
