import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-rtl-logo.svg';
import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo-rtl.svg';
import { styled } from '@mui/material';

const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '60px', // Sesuaikan dengan tinggi header Anda
  padding: '0 4px', // Tambahkan padding horizontal jika diperlukan
}));

const LogoWrapper = styled(Link)(({ theme }) => ({
  display: 'block',
  height: '40px', // Sesuaikan tinggi logo jika diperlukan
  '& svg': {
    height: '100%', // Mengatur tinggi SVG agar sesuai dengan tinggi kontainer
    width: 'auto', // Mengatur lebar SVG secara otomatis untuk menjaga proporsi
  },
}));

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);

  return (
    <Header>
      <LogoWrapper to="/">
        {customizer.activeDir === 'ltr' ? (
          customizer.activeMode === 'dark' ? (
            <LogoLight />
          ) : (
            <LogoDark />
          )
        ) : customizer.activeMode === 'dark' ? (
          <LogoDarkRTL />
        ) : (
          <LogoLightRTL />
        )}
      </LogoWrapper>
    </Header>
  );
};

export default Logo;



// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
// import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-rtl-logo.svg';
// import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
// import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo-rtl.svg';
// import { styled } from '@mui/material';

// const Logo = () => {
//   const customizer = useSelector((state) => state.customizer);
//   const LinkStyled = styled(Link)(() => ({
//     height: customizer.TopbarHeight,
//     width: customizer.isCollapse ? '68px' : '236px',
//     overflow: 'hidden',
//     display: 'block',
//   }));

//   const logoHeight = '40px'; // Ganti nilai ini sesuai dengan ukuran yang diinginkan

//   if (customizer.activeDir === 'ltr') {
//     return (
//       <LinkStyled to="/">
//         {customizer.activeMode === 'dark' ? (
//           <LogoLight height={logoHeight} />
//         ) : (
//           <LogoDark height={logoHeight} />
//         )}
//       </LinkStyled>
//     );
//   }
//   return (
//     <LinkStyled to="/">
//       {customizer.activeMode === 'dark' ? (
//         <LogoDarkRTL height={logoHeight} />
//       ) : (
//         <LogoLightRTL height={logoHeight} />
//       )}
//     </LinkStyled>
//   );
// };

// export default Logo;
