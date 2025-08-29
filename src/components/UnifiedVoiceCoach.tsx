import { AgentsVoiceCoach } from './AgentsVoiceCoach';

interface UnifiedVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

export function UnifiedVoiceCoach({ scenario, open = true, onToggle }: UnifiedVoiceCoachProps) {
  // Migration vers Agents SDK - redirection vers le nouveau composant
  return <AgentsVoiceCoach scenario={scenario} open={open} onToggle={onToggle} />;
}