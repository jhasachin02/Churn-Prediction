import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Shield, Users, Target, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Advanced ML Models",
      description: "Sophisticated machine learning algorithms trained on millions of customer interactions to predict churn with 94% accuracy.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Get instant insights into customer behavior patterns and risk factors with real-time data processing.",
    },
    {
      icon: Target,
      title: "Actionable Insights",
      description: "Receive specific recommendations for each at-risk customer to maximize retention effectiveness.",
    },
    {
      icon: Shield,
      title: "Risk Scoring",
      description: "Comprehensive risk assessment with detailed breakdowns of contributing factors and probability scores.",
    },
    {
      icon: Users,
      title: "Segment Analysis",
      description: "Analyze customer segments to identify patterns and develop targeted retention strategies.",
    },
    {
      icon: Zap,
      title: "Automated Alerts",
      description: "Receive immediate notifications when customers enter high-risk categories for timely intervention.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features for Customer Retention</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides everything you need to understand, predict, and prevent customer churn.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-card bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}