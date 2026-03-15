function TeamSettings() {
  return (
    <div className="settings-card">

      <h2>Team Members</h2>

      <input placeholder="Staff Email" />

      <select>
        <option>Staff</option>
        <option>Manager</option>
      </select>

      <button>Invite Staff</button>

    </div>
  );
}

export default TeamSettings;