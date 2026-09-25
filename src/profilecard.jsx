function ProfileCard() {
  return (
    <div
      className="profile-card"
      style={{ backgroundColor: "#f4f4f4" }}
    >
      <img src="profile/jpeg" alt="User Profile" />
      <h2>sumit singh</h2>
      <p className="bio">Software Developer</p>
    </div>
  );
}

export default ProfileCard;