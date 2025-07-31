import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, AlertTriangle, Shield } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Predict Customer
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}Churn{" "}
                </span>
                Before It Happens
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Leverage advanced machine learning to identify at-risk customers, understand their behavior patterns, 
                and take proactive measures to improve retention rates.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onOpenModal} size="lg" variant="hero" className="text-base px-8">
                Start Prediction
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                View Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">94%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Customers Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25%</div>
                <div className="text-sm text-muted-foreground">Churn Reduction</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold">High Risk Customer</h3>
                    <p className="text-sm text-muted-foreground">Churn Probability: 87%</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contract Type:</span>
                    <span className="text-destructive">Month-to-month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenure:</span>
                    <span className="text-destructive">3 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Charges:</span>
                    <span className="text-destructive">$115.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <Shield className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Low Risk Customer</h3>
                    <p className="text-sm text-muted-foreground">Churn Probability: 12%</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contract Type:</span>
                    <span className="text-success">Two-year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenure:</span>
                    <span className="text-success">36 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Charges:</span>
                    <span className="text-success">$45.20</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}