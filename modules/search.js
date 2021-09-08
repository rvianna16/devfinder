export default function findUser() {
  const form = document.getElementById('searchUser'),
    input = document.getElementById('search'),
    spanError = document.querySelector('.error'),
    profileBox = document.querySelector('.profile-box'),
    profileImage = document.querySelector('.profile-image'),
    profileName = document.querySelector('.profile-name'),
    profileLogin = document.querySelector('.profile-login'),
    profileJoined = document.querySelector('.profile-joined'),
    profileBio = document.querySelector('.profile-bio'),
    profileRepos = document.querySelector('.repos'),
    profileFollowers = document.querySelector('.followers'),
    profileFollowing = document.querySelector('.following'),
    profileLocation = document.querySelector('.location'),
    profileTwitter = document.querySelector('.twitter'),
    profileBlog = document.querySelector('.blog'),
    profileCompany = document.querySelector('.company');

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Out',
    'Nov',
    'Dec',
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${input.value}`).then((response) => {
      if (response.status === 404) {
        profileBox.style.display = '';
        spanError.style.display = 'Block';
      } else {
        response.json().then((user) => {
          profileBox.style.display = 'Block';
          spanError.style.display = '';

          profileImage.src = user.avatar_url;
          profileName.innerText = user.name;
          profileLogin.innerText = user.login;

          const createdDate = user.created_at.split('-'),
            day = createdDate[2].substring(0, 2),
            month = months[+createdDate[1].substring(0, 2)],
            year = createdDate[0];

          profileJoined.innerText = `Joined ${day} ${month} ${year}`;

          if (user.bio === null) {
            profileBio.classList.add('null');
            profileBio.innerText = 'This profile has no bio';
          } else {
            profileBio.classList.remove('null');
            profileBio.innerText = user.bio;
          }

          profileRepos.innerText = user.public_repos;
          profileFollowers.innerText = user.followers;
          profileFollowing.innerText = user.following;

          if (user.location === null) {
            profileLocation.classList.add('null');
            profileLocation.innerText = 'Not Available';
          } else {
            profileLocation.classList.remove('null');
            profileLocation.innerText = user.location;
          }

          if (user.twitter_username === null) {
            profileTwitter.classList.add('null');
            profileTwitter.innerText = 'Not Available';
          } else {
            profileTwitter.classList.remove('null');
            profileTwitter.innerText = user.twitter_username;
          }

          if (user.blog === '') {
            profileBlog.classList.add('null');
            profileBlog.innerText = 'Not Available';
          } else {
            profileBlog.classList.remove('null');
            profileBlog.innerText = user.blog;
          }

          if (user.company === null) {
            profileCompany.classList.add('null');
            profileCompany.innerText = 'Not Available';
          } else {
            profileCompany.classList.remove('null');
            profileCompany.innerText = user.company;
          }
        });
      }
    });
  });
}
