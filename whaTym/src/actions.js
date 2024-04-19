import { HttpError } from 'wasp/server'

export const addTeamMember = async ({ name, timezone }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.TeamMember.create({
    data: {
      name: name,
      timezone: timezone,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const deleteTeamMember = async ({ teamMemberId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const teamMember = await context.entities.TeamMember.findUnique({
    where: { id: teamMemberId }
  });

  if (teamMember.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.TeamMember.delete({
    where: { id: teamMemberId }
  });
}
