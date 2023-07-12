import { Box } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import DefaultImage from '../../../assets/img/default-image.jpg';

export const CameraImages = ({ imageUrls }: { imageUrls: string[] }) => {
  const imagesParsed =
    imageUrls.length > 0
      ? imageUrls.map((item) => ({
          original: item,
          thumbnail: item,
          originalHeight: 520,
        }))
      : [{ original: DefaultImage, thumbnail: DefaultImage, originalHeight: 520 }];

  return (
    <Box pl={1}>
      <ImageGallery items={imagesParsed} />
    </Box>
  );
};
