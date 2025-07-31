import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Brain, AlertTriangle, TrendingUp } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: Database,
      title: "Data Collection",
      description: "Gather customer data including usage patterns, billing history, support interactions, and engagement metrics.",
    },
    {
      step: 2,
      icon: Brain,
      title: "AI Analysis",
      description: "Our machine learning models analyze patterns and identify key indicators that predict customer churn risk.",
    },
    {
      step: 3,
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Generate risk scores and detailed insights about factors contributing to potential customer churn.",
    },
    {
      step: 4,
      icon: TrendingUp,
      title: "Take Action",
      description: "Implement targeted retention strategies based on AI recommendations to reduce churn and improve loyalty.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How ChurnGuard Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes it easy to predict and prevent customer churn with minimal setup.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm text-center h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 relative">
                    <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-full w-fit mx-auto">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}