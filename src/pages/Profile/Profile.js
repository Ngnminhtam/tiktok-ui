import { useParams } from 'react-router-dom';

function Profile() {
    const { nickname } = useParams();
    return <h1>Profile of {nickname}</h1>;
}

export default Profile;
