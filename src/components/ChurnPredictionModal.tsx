import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChurnPredictionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CustomerData {
  monthlyCharges: string;
  totalCharges: string;
  tenure: string;
  contractType: string;
  paymentMethod: string;
  internetService: string;
  techSupport: string;
  onlineBackup: string;
}

interface PredictionResult {
  churnProbability: number;
  riskLevel: "Low" | "Medium" | "High";
  factors: Array<{ factor: string; impact: number; description: string }>;
  recommendations: string[];
}

export function ChurnPredictionModal({ open, onOpenChange }: ChurnPredictionModalProps) {
  const [step, setStep] = useState<"input" | "results">("input");
  const [customerData, setCustomerData] = useState<CustomerData>({
    monthlyCharges: "",
    totalCharges: "",
    tenure: "",
    contractType: "",
    paymentMethod: "",
    internetService: "",
    techSupport: "",
    onlineBackup: "",
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const simulateChurnPrediction = (data: CustomerData): PredictionResult => {
    // Simulate ML prediction logic
    const monthlyCharges = parseFloat(data.monthlyCharges) || 0;
    const tenure = parseInt(data.tenure) || 0;
    
    let baseRisk = 0.3;
    
    // High monthly charges increase churn risk
    if (monthlyCharges > 80) baseRisk += 0.2;
    if (monthlyCharges > 100) baseRisk += 0.1;
    
    // Low tenure increases churn risk
    if (tenure < 12) baseRisk += 0.3;
    else if (tenure < 24) baseRisk += 0.1;
    else baseRisk -= 0.2;
    
    // Contract type impact
    if (data.contractType === "month-to-month") baseRisk += 0.25;
    else if (data.contractType === "one-year") baseRisk -= 0.1;
    else if (data.contractType === "two-year") baseRisk -= 0.2;
    
    // Payment method impact
    if (data.paymentMethod === "electronic-check") baseRisk += 0.15;
    
    // Service factors
    if (data.techSupport === "no") baseRisk += 0.1;
    if (data.onlineBackup === "no") baseRisk += 0.05;
    
    const churnProbability = Math.min(Math.max(baseRisk, 0.05), 0.95);
    
    let riskLevel: "Low" | "Medium" | "High";
    if (churnProbability < 0.3) riskLevel = "Low";
    else if (churnProbability < 0.7) riskLevel = "Medium";
    else riskLevel = "High";
    
    const factors = [
      {
        factor: "Monthly Charges",
        impact: monthlyCharges > 80 ? 0.7 : 0.3,
        description: monthlyCharges > 80 ? "High monthly charges increase churn risk" : "Reasonable pricing reduces churn risk"
      },
      {
        factor: "Tenure",
        impact: tenure < 12 ? 0.8 : 0.2,
        description: tenure < 12 ? "Short tenure indicates higher churn risk" : "Long-term customers are more loyal"
      },
      {
        factor: "Contract Type",
        impact: data.contractType === "month-to-month" ? 0.9 : 0.3,
        description: data.contractType === "month-to-month" ? "Month-to-month contracts have higher churn" : "Long-term contracts reduce churn risk"
      }
    ];
    
    const recommendations = [];
    if (churnProbability > 0.5) {
      recommendations.push("Offer loyalty discount or upgrade incentives");
      recommendations.push("Increase customer support touchpoints");
      recommendations.push("Consider contract extension offers");
    }
    if (data.techSupport === "no") {
      recommendations.push("Promote technical support services");
    }
    if (data.contractType === "month-to-month") {
      recommendations.push("Offer annual contract incentives");
    }
    
    return { churnProbability, riskLevel, factors, recommendations };
  };

  const handlePredict = async () => {
    const requiredFields = ['monthlyCharges', 'totalCharges', 'tenure', 'contractType'];
    const missingFields = requiredFields.filter(field => !customerData[field as keyof CustomerData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = simulateChurnPrediction(customerData);
      setPrediction(result);
      setStep("results");
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setStep("input");
    setPrediction(null);
    setCustomerData({
      monthlyCharges: "",
      totalCharges: "",
      tenure: "",
      contractType: "",
      paymentMethod: "",
      internetService: "",
      techSupport: "",
      onlineBackup: "",
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "success";
      case "Medium": return "warning";
      case "High": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-accent" />
            Churn Prediction Analysis
          </DialogTitle>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-charges">Monthly Charges ($) *</Label>
                <Input
                  id="monthly-charges"
                  type="number"
                  placeholder="e.g., 79.99"
                  value={customerData.monthlyCharges}
                  onChange={(e) => handleInputChange("monthlyCharges", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total-charges">Total Charges ($) *</Label>
                <Input
                  id="total-charges"
                  type="number"
                  placeholder="e.g., 1599.80"
                  value={customerData.totalCharges}
                  onChange={(e) => handleInputChange("totalCharges", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (months) *</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="e.g., 24"
                  value={customerData.tenure}
                  onChange={(e) => handleInputChange("tenure", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contract-type">Contract Type *</Label>
                <Select value={customerData.contractType} onValueChange={(value) => handleInputChange("contractType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month-to-month">Month-to-month</SelectItem>
                    <SelectItem value="one-year">One year</SelectItem>
                    <SelectItem value="two-year">Two year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select value={customerData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronic-check">Electronic check</SelectItem>
                    <SelectItem value="mailed-check">Mailed check</SelectItem>
                    <SelectItem value="bank-transfer">Bank transfer</SelectItem>
                    <SelectItem value="credit-card">Credit card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="internet-service">Internet Service</Label>
                <Select value={customerData.internetService} onValueChange={(value) => handleInputChange("internetService", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select internet service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dsl">DSL</SelectItem>
                    <SelectItem value="fiber-optic">Fiber optic</SelectItem>
                    <SelectItem value="no">No internet service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tech-support">Tech Support</Label>
                <Select value={customerData.techSupport} onValueChange={(value) => handleInputChange("techSupport", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Has tech support?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="no-internet">No internet service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="online-backup">Online Backup</Label>
                <Select value={customerData.onlineBackup} onValueChange={(value) => handleInputChange("onlineBackup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Has online backup?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="no-internet">No internet service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handlePredict} disabled={isLoading} variant="hero">
                {isLoading ? "Analyzing..." : "Predict Churn Risk"}
              </Button>
            </div>
          </div>
        )}

        {step === "results" && prediction && (
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Churn Prediction Results</span>
                  <Badge variant={getRiskColor(prediction.riskLevel)} className="text-sm">
                    {prediction.riskLevel} Risk
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Based on the provided customer data and our ML model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Churn Probability</span>
                      <span className="text-2xl font-bold text-primary">
                        {(prediction.churnProbability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={prediction.churnProbability * 100} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Key Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {prediction.factors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{factor.factor}</span>
                        <span className="text-sm text-muted-foreground">
                          {(factor.impact * 100).toFixed(0)}% impact
                        </span>
                      </div>
                      <Progress value={factor.impact * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">{factor.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleReset}>
                Analyze Another Customer
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}