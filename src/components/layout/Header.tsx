import classes from './Header.module.css';
import Loader from '../common/Loader';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
const Header = () => {
  const { loading } = useLoading();

  return (
    <div className={classes['app-header']}>
      <Link to={'/'}>Podcaster</Link>
      {loading && <Loader />}
    </div>
  );
};

export default Header;
