'use client';

import { useState } from 'react';
import { Team, Member, Role } from '../../presentation/types';
import { TeamLocalStorageRepository } from '../../infrastructure/storage/teamRepository';
import { TeamService } from '../services/teamService';

export function useTeam() {
  const [currentUser, setCurrentUser] = useState<Member | null>(() =>
    TeamLocalStorageRepository.getCurrentUser()
  );
  const [partner, setPartner] = useState<Member | null>(() =>
    TeamLocalStorageRepository.getPartner()
  );
  const [team, setTeam] = useState<Team | null>(() =>
    TeamLocalStorageRepository.getTeam()
  );
  const isLoggedIn = Boolean(currentUser);

  const loginWithSocial = (provider: 'kakao' | 'google') => {
    const providerLabel = provider === 'kakao' ? '카카오 유저' : '구글 유저';
    const newUser: Member = {
      id: Date.now(),
      email: `${provider}_user@knot.com`,
      nickname: providerLabel,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: provider === 'kakao' ? '🧑🏻' : '👩🏻‍💻',
    };
    setCurrentUser(newUser);
    TeamLocalStorageRepository.saveCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
    setTeam(null);
    setPartner(null);
    TeamLocalStorageRepository.clear();
  };

  const createTeam = (teamName: string): string => {
    if (!currentUser) return '';
    const newTeam = TeamService.createTeamEntity(teamName, currentUser);
    setTeam(newTeam);
    setPartner(null);
    TeamLocalStorageRepository.saveTeam(newTeam);
    TeamLocalStorageRepository.savePartner(null);
    return newTeam.inviteCode;
  };

  const joinTeam = (inviteCode: string): boolean => {
    if (!currentUser || !TeamService.validateInviteCode(inviteCode)) return false;

    const { team: joinedTeam, partnerUser } = TeamService.createJoinedTeamEntity(
      inviteCode,
      currentUser
    );

    setTeam(joinedTeam);
    setPartner(partnerUser);
    TeamLocalStorageRepository.saveTeam(joinedTeam);
    TeamLocalStorageRepository.savePartner(partnerUser);
    return true;
  };

  const addTeamMember = (nickname: string, role: Role = 'USER', avatarUrl?: string): Member | null => {
    if (!team) return null;

    const newMember = TeamService.createNewMember(
      nickname,
      team.members.length,
      role,
      avatarUrl
    );

    const updatedTeam = TeamService.addMemberToTeam(team, newMember);
    setTeam(updatedTeam);
    if (!partner) setPartner(newMember);

    TeamLocalStorageRepository.saveTeam(updatedTeam);
    if (!partner) TeamLocalStorageRepository.savePartner(newMember);

    return newMember;
  };

  return {
    team,
    currentUser,
    partner,
    isLoggedIn,
    loginWithSocial,
    logout,
    createTeam,
    joinTeam,
    addTeamMember,
  };
}
