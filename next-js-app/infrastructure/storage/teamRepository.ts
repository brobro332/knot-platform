import { Team, Member } from '../../presentation/types';
import { LocalStorageClient } from './localStorageClient';

export interface ITeamRepository {
  getTeam(): Team | null;
  saveTeam(team: Team | null): void;
  getCurrentUser(): Member | null;
  saveCurrentUser(user: Member | null): void;
  getPartner(): Member | null;
  savePartner(partner: Member | null): void;
  clear(): void;
}

export const TeamLocalStorageRepository: ITeamRepository = {
  getTeam(): Team | null {
    return LocalStorageClient.get<Team | null>('team', null);
  },

  saveTeam(team: Team | null): void {
    if (team === null) {
      LocalStorageClient.remove('team');
    } else {
      LocalStorageClient.set('team', team);
    }
  },

  getCurrentUser(): Member | null {
    return LocalStorageClient.get<Member | null>('user', null);
  },

  saveCurrentUser(user: Member | null): void {
    if (user === null) {
      LocalStorageClient.remove('user');
    } else {
      LocalStorageClient.set('user', user);
    }
  },

  getPartner(): Member | null {
    return LocalStorageClient.get<Member | null>('partner', null);
  },

  savePartner(partner: Member | null): void {
    if (partner === null) {
      LocalStorageClient.remove('partner');
    } else {
      LocalStorageClient.set('partner', partner);
    }
  },

  clear(): void {
    LocalStorageClient.clearAll();
  },
};
