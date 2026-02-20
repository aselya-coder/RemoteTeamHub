import { useAdminStore } from "../store/useAdminStore";
import { Users, Briefcase, FileText, HelpCircle, DollarSign, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  const { state } = useAdminStore();

  const stats = [
    {
      title: "Talents",
      value: state.talents.length,
      icon: Users,
      description: "Total talents registered",
    },
    {
      title: "Jobs",
      value: state.jobs.length,
      icon: Briefcase,
      description: "Active job listings",
    },
    {
      title: "Blogs",
      value: state.blogs.length,
      icon: FileText,
      description: "Published articles",
    },
    {
      title: "FAQs",
      value: state.faq.length,
      icon: HelpCircle,
      description: "Frequently asked questions",
    },
    {
      title: "Pricing Plans",
      value: state.pricing.length,
      icon: DollarSign,
      description: "Available packages",
    },
    {
      title: "Testimonials",
      value: state.testimonials.length,
      icon: MessageSquare,
      description: "Customer reviews",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
