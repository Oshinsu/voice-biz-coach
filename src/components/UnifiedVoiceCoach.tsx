import { AgentsVoiceCoach } from './AgentsVoiceCoach';

interface UnifiedVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

export function UnifiedVoiceCoach({ scenario, open = true, onToggle }: UnifiedVoiceCoachProps) {
  // Architecture Agent SDK officielle GA - 28 août 2025 - NOUVEAU CODE WebRTC
  return <AgentsVoiceCoach scenario={scenario} open={open} onToggle={onToggle} />;
}