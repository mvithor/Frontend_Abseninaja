import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import breadcrumbImg from 'src/assets/images/breadcrumb/ChatBc.png';
import { IconCircle } from '@tabler/icons';

const Breadcrumb = ({ subtitle, items, title, children }) => (
  <Grid
    container
    sx={{
      backgroundColor: '#ffffff',
      borderRadius: (theme) => theme.shape.borderRadius / 4,
      p: '30px 25px 20px',
      marginBottom: '30px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Grid item xs={12} sm={6} lg={8} mb={1}>
      <Typography variant="h4">{title}</Typography>
      <Typography color="textSecondary" variant="h6" fontWeight={400} mt={0.8} mb={0}>
        {subtitle}
      </Typography>
      <Breadcrumbs
        separator={
          <IconCircle
            size="5"
            fill="textSecondary"
            fillOpacity={'0.6'}
            style={{ margin: '0 5px' }}
          />
        }
        sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="none" color="inherit" component={NavLink} to={item.to}>
                    {item.title}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
          : ''}
      </Breadcrumbs>
    </Grid>
    <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
      <Box
        sx={{
          display: { xs: 'none', md: 'block', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        {children ? (
          <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>
        ) : (
          <>
            <Box sx={{ top: '0px', position: 'absolute' }}>
              <img src={breadcrumbImg} alt={breadcrumbImg} width={'165px'} />
            </Box>
          </>
        )}
      </Box>
    </Grid>
  </Grid>
);

export default Breadcrumb;
// import React from 'react';
// import { Grid, Typography, Box, Breadcrumbs, Link } from '@mui/material';
// import { NavLink } from 'react-router-dom';

// import breadcrumbImg from 'src/assets/images/breadcrumb/ChatBc.png';
// import { IconCircle } from '@tabler/icons';

// const Breadcrumb = ({ subtitle, items, title, children }) => (
//   <Grid
//     container
//     sx={{
//       backgroundColor: '#ffffff',
//       borderRadius: (theme) => theme.shape.borderRadius / 4,
//       padding: '30px 25px 20px',
//       marginBottom: '30px',
//       position: 'relative',
//       overflow: 'hidden',
//       alignItems: 'center',  // Pastikan elemen breadcrumb sejajar
//       minHeight: '150px',     // Menambahkan tinggi minimum untuk kontainer breadcrumb
//     }}
//   >
//     <Grid item xs={12} sm={6} lg={8} mb={1}>
//       <Typography variant="h4" sx={{ mb: 1 }}>{title}</Typography>
//       <Typography color="textSecondary" variant="h6" fontWeight={400}>
//         {subtitle}
//       </Typography>
//       <Breadcrumbs
//         separator={
//           <IconCircle
//             size="5"
//             fill="textSecondary"
//             fillOpacity={'0.6'}
//             style={{ margin: '0 5px' }}
//           />
//         }
//         sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
//         aria-label="breadcrumb"
//       >
//         {items
//           ? items.map((item) => (
//               <div key={item.title}>
//                 {item.to ? (
//                   <Link underline="none" color="inherit" component={NavLink} to={item.to}>
//                     {item.title}
//                   </Link>
//                 ) : (
//                   <Typography color="textPrimary">{item.title}</Typography>
//                 )}
//               </div>
//             ))
//           : ''}
//       </Breadcrumbs>
//     </Grid>

//     {/* Bagian gambar breadcrumb di kanan bawah */}
//     <Grid
//       item
//       xs={12} 
//       sm={6} 
//       lg={4}
//       display="flex"
//       alignItems="flex-end"
//       justifyContent="flex-end"
//       sx={{ position: 'relative', height: '100%' }}
//     >
//       <Box
//         sx={{
//           display: { xs: 'none', md: 'block', lg: 'flex' },
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//           width: '100%',
//         }}
//       >
//         {children ? (
//           <Box sx={{ position: 'absolute', top: '0px' }}>{children}</Box>
//         ) : (
//           <>
//             <Box sx={{ position: 'absolute', top: '0px' }}>
//               <img src={breadcrumbImg} alt="breadcrumb" width={'165px'} />
//             </Box>
//           </>
//         )}
//       </Box>
//     </Grid>
//   </Grid>
// );

// export default Breadcrumb;

