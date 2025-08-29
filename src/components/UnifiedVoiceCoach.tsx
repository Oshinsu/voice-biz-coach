import { SophieMartinVoiceAgent } from './voice-agents';

interface UnifiedVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

/**
 * Routeur intelligent des agents vocaux
 * Sélectionne l'agent dédié selon le scénario
 */
export function UnifiedVoiceCoach({ scenario, open = true, onToggle }: UnifiedVoiceCoachProps) {
  // Mapping scénarios → agents vocaux dédiés
  const getVoiceAgent = () => {
    if (!scenario) {
      return <div className="text-muted-foreground p-4">Aucun scénario sélectionné</div>;
    }

    switch (scenario.id) {
      case 'kpi-performance':
        return <SophieMartinVoiceAgent conversationType="cold-call" open={open} onToggle={onToggle} />;
      
      // TODO: Agents spécialisés à créer
      // case 'fintech-startup':
      //   return <PierreVoiceAgent conversationType="cold-call" open={open} onToggle={onToggle} />;
      // case 'retail-personalization':
      //   return <ClaireVoiceAgent conversationType="cold-call" open={open} onToggle={onToggle} />;
      
      default:
        // Fallback temporaire - agent en développement
        return (
          <div className="text-muted-foreground p-4 text-center">
            <p>Agent vocal en développement pour ce scénario</p>
            <p className="text-sm mt-2">Scénario: {scenario.title}</p>
          </div>
        );
    }
  };

  return getVoiceAgent();
}