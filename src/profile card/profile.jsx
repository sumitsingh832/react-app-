

function Profile({ name, age, role }) {
  return (
    <div className="profile card">
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{role}</p>
    </div>
  );
}

export default Profile;