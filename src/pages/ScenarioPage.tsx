import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useScenarios } from "@/hooks/useScenarios";
import { useSalesStore } from "@/store/salesStore";
import { useEffect } from "react";
import { SophieAgentsSDK } from "@/components/voice-agents";
import { ScenarioDetails } from "@/components/ScenarioDetails";
import { ByssVnsOverview } from "@/components/ByssVnsOverview";

export default function ScenarioPage() {
  const { id } = useParams();
  const { scenarios, loading, error, getScenarioById } = useScenarios();
  const scenario = id ? getScenarioById(id) : null;
  const { setScenario } = useSalesStore();

  useEffect(() => {
    if (scenario) {
      setScenario(scenario);
    }
  }, [scenario, setScenario]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement du scénario...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!scenario) {
    return <Navigate to="/scenarios" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header avec bouton retour */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <Button variant="ghost" asChild>
            <Link to="/scenarios" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux scénarios
            </Link>
          </Button>
        </div>
      </header>

      {/* Contenu principal avec ScenarioDetails */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScenarioDetails scenario={scenario} />
          
          {/* Byss VNS Overview intégré */}
          {scenario.id === 'byss-vns-school' && (
            <div>
              <ByssVnsOverview scenarioId={scenario.id} />
            </div>
          )}
        </div>
      </div>

      {/* Voice Navigation System (VNS) - Système réel */}
      {scenario.id === 'byss-vns-school' && (
        <div className="fixed bottom-4 right-4 z-50">
          <SophieAgentsSDK 
            conversationType="rdv"
            open={false}
            onToggle={() => {}}
          />
        </div>
      )}
    </div>
  );
}