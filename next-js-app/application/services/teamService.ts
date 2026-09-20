import { Member, Team, Role } from '../../presentation/types';

const MEMBER_AVATARS = ['👩🏻‍💻', '👨🏻‍🎨', '👩🏻‍🔬', '👨🏻‍🚀', '🧑🏻‍🍳', '👩🏻‍💼', '🧑🏻‍💻'];

export const TeamService = {
  generateInviteCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  },

  validateInviteCode(code: string): boolean {
    return typeof code === 'string' && code.trim().length >= 6;
  },

  createTeamEntity(teamName: string, creator: Member): Team {
    const inviteCode = this.generateInviteCode();
    return {
      id: Date.now(),
      name: teamName.trim() || '우리 팀',
      inviteCode,
      status: 'ACTIVE',
      members: [creator],
      createdAt: new Date().toISOString().split('T')[0],
    };
  },

  createJoinedTeamEntity(inviteCode: string, user: Member): { team: Team; partnerUser: Member | null } {
    const joinedTeam: Team = {
      id: Date.now(),
      name: '새로운 원팀',
      inviteCode: inviteCode.trim().toUpperCase(),
      status: 'ACTIVE',
      members: [user],
      createdAt: new Date().toISOString().split('T')[0],
    };

    return { team: joinedTeam, partnerUser: null };
  },

  createNewMember(nickname: string, existingMemberCount: number, role: Role = 'USER', avatarUrl?: string): Member {
    const cleanedNick = nickname.trim() || `팀원 ${existingMemberCount + 1}`;
    const avatar = avatarUrl || MEMBER_AVATARS[existingMemberCount % MEMBER_AVATARS.length];
    const emailPrefix = cleanedNick.toLowerCase().replace(/\s+/g, '');

    return {
      id: Date.now(),
      email: `${emailPrefix}@knot.com`,
      nickname: cleanedNick,
      role,
      status: 'ACTIVE',
      avatarUrl: avatar,
    };
  },

  addMemberToTeam(team: Team, newMember: Member): Team {
    return {
      ...team,
      members: [...team.members, newMember],
    };
  },
};
