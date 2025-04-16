import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect } from 'react';
import { profileActions } from '../../../store/slices/profile';
import ProfileContainer from './container';

const Profile = (props) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector((state) => state.profile.user);

  useEffect(() => {
    if (params.userId) {
      dispatch(profileActions.fetchUser(params.userId));
    }
    return () => {
      dispatch(profileActions.removeUser());
    };
  }, [dispatch, params.userId]);

  if (!user) return null;

  return <ProfileContainer container={props.container} />;
};

export default Profile;
