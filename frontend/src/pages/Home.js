import Feed from '../components/Feed/index';
import CreatePost from '../components/Manage-post/CreatePost';
import { useLocation } from 'react-router-dom';

const Home = (props) => {
  const location = useLocation();

  return (
    <>
      <Feed
        openCreatePostModal={props.openCreatePostModal}
        posts={props.posts}
        trigger={props.trigger}
        setTrigger={props.setTrigger}
        isLoading={props.isLoading}
        location={location}
        openUpdatePostModal={props.openUpdatePostModal}
        setOpenUpdatePostModal={props.setOpenUpdatePostModal}
      />
      <CreatePost
        openCreatePostModal={props.openCreatePostModal}
        setOpenCreatePostModal={props.setOpenCreatePostModal}
        setTrigger={props.setTrigger}
        trigger={props.trigger}
      />
    </>
  );
};

export default Home;
