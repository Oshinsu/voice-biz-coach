import { ModernVoiceCoach } from './ModernVoiceCoach';

interface UnifiedVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

export function UnifiedVoiceCoach({ scenario, open = true, onToggle }: UnifiedVoiceCoachProps) {
  // Architecture moderne avec WebSocket direct OpenAI Realtime
  return <ModernVoiceCoach scenario={scenario} open={open} onToggle={onToggle} />;
}