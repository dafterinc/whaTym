import React, { useState } from 'react';
import { useQuery, useAction, getUser, getTeamMembers, addTeamMember, deleteTeamMember } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: user, isLoading: isUserLoading, error: userError } = useQuery(getUser);
  const { data: teamMembers, isLoading: isTeamMembersLoading, error: teamMembersError } = useQuery(getTeamMembers);
  const addTeamMemberFn = useAction(addTeamMember);
  const deleteTeamMemberFn = useAction(deleteTeamMember);

  const [newTeamMember, setNewTeamMember] = useState({ name: '', timezone: '' });

  if (isUserLoading || isTeamMembersLoading) return 'Loading...';
  if (userError) return 'Error: ' + userError;
  if (teamMembersError) return 'Error: ' + teamMembersError;

  const handleAddTeamMember = () => {
    addTeamMemberFn(newTeamMember);
    setNewTeamMember({ name: '', timezone: '' });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Your Time: {new Date().toLocaleTimeString()}</h1>
      </div>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Team Member Name'
          className='mr-2 px-1 py-2 border rounded text-lg'
          value={newTeamMember.name}
          onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
        />
        <input
          type='text'
          placeholder='Team Member Timezone'
          className='mr-2 px-1 py-2 border rounded text-lg'
          value={newTeamMember.timezone}
          onChange={(e) => setNewTeamMember({ ...newTeamMember, timezone: e.target.value })}
        />
        <button
          onClick={handleAddTeamMember}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Team Member
        </button>
      </div>
      <div>
        {teamMembers.map((teamMember) => (
          <div
            key={teamMember.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{teamMember.name} ({teamMember.timezone})</div>
            <button
              onClick={() => deleteTeamMemberFn({ teamMemberId: teamMember.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
