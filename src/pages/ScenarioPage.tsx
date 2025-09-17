import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useScenarios } from "@/hooks/useScenarios";
import { useSalesStore } from "@/store/salesStore";
import { useEffect } from "react";
import { SophieMartinAgentSDK } from "@/components/voice-agents";
import { ScenarioDetails } from "@/components/ScenarioDetails";

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
        <ScenarioDetails scenario={scenario} />
      </div>

      {/* Voice Coach Widget */}
      {scenario.id === 'kpi-performance' && (
        <SophieMartinAgentSDK conversationType="cold-call" />
      )}
    </div>
  );
}