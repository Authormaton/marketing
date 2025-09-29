import { Search, Users, ShieldAlert, Clock } from "lucide-react";

export function FragmentedKnowledgeIcon(props: React.ComponentProps<'svg'>) {
  return <Search {...props} />;
}

export function ExpertBottlenecksIcon(props: React.ComponentProps<'svg'>) {
  return <Users {...props} />;
}

export function QualityInconsistencyIcon(props: React.ComponentProps<'svg'>) {
  return <ShieldAlert {...props} />;
}

export function TimeIntensiveProcessIcon(props: React.ComponentProps<'svg'>) {
  return <Clock {...props} />;
}
