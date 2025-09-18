import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { TestButton } from "@/components/ui/test-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useScenarios } from "@/hooks/useScenarios";
import { useSalesStore } from "@/store/salesStore";
import { useEffect, useState } from "react";
import { StudentModeToggle } from "@/components/StudentModeToggle";
import { SophieAgentsSDK } from "@/components/voice-agents";
import { ModernScenarioDetails } from "@/components/ModernScenarioDetails";
import { ScenarioSelector } from "@/components/ScenarioSelector";

export default function ScenarioPage() {
  const { id } = useParams();
  const { scenarios, loading, error, getScenarioById } = useScenarios();
  const scenario = id ? getScenarioById(id) : null;
  const { setScenario } = useSalesStore();
  const [isStudentMode, setIsStudentMode] = useState(true);

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
      <header className="border-b bg-gradient-to-r from-card/80 via-card/50 to-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <TestButton variant="ghost" asChild>
            <Link to="/scenarios" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux scénarios
            </Link>
          </TestButton>
        </div>
      </header>

      {/* Contenu principal avec ScenarioDetails et Sélecteur */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Détails du scénario */}
          <div className="lg:col-span-2 space-y-6">
            <StudentModeToggle 
              isStudentMode={isStudentMode} 
              onToggle={setIsStudentMode} 
            />
            <ModernScenarioDetails scenario={scenario} />
          </div>
          
          {/* Sélecteur de configuration */}
          <div className="lg:col-span-1">
            <ScenarioSelector />
          </div>
        </div>
      </div>

      {/* Voice Navigation System (VNS) - Système réel */}
      {scenario.id === 'byss-vns-school' && (
        <SophieAgentsSDK 
          conversationType="rdv"
          open={true}
          onToggle={() => {}}
        />
      )}
    </div>
  );
}