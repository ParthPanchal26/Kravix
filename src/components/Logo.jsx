import kravixLogo from '../assets/kravix.png';

const Logo = ({ width = '100px' }) => {
  return (
    <img src={kravixLogo} alt="kravix" style={{ width }} />
  );
};

export default Logo;