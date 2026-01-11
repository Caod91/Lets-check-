
export type AppView = 'HOME' | 'TOURNAMENT' | 'IMAGE_EDITOR';

export enum MatchFormat {
  TEST = 'TEST',
  LIMITED_OVERS = 'LIMITED_OVERS'
}

export interface TournamentState {
  format: MatchFormat | null;
  isActive: boolean;
}
