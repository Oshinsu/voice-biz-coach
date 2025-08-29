import { SophieMartinVoiceAgent, GenericVoiceAgent } from './voice-agents';

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
      return <GenericVoiceAgent scenario={scenario} open={open} onToggle={onToggle} />;
    }

    switch (scenario.id) {
      case 'kpi-performance':
        // Sophie Martin avec prompt natif intégré
        return (
          <SophieMartinVoiceAgent 
            conversationType="cold-call" // TODO: détecter selon le contexte
            open={open} 
            onToggle={onToggle} 
          />
        );
      
      // TODO: Ajouter les autres personas
      // case 'fintech-startup':
      //   return <PierreVoiceAgent ... />;
      // case 'retail-personalization':
      //   return <ClaireVoiceAgent ... />;
      
      default:
        // Fallback vers l'ancien système
        return <GenericVoiceAgent scenario={scenario} open={open} onToggle={onToggle} />;
    }
  };

  return getVoiceAgent();
}