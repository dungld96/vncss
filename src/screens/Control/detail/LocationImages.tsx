import { Box } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import DefaultImage from '../../../assets/img/default-image.jpg';

export const LocationImages = ({
  imageUrls,
  originalHeight = 520,
}: {
  imageUrls: string[];
  originalHeight?: number;
}) => {
  const imagesParsed =
    imageUrls.length > 0
      ? imageUrls.map((item) => ({
          original: item,
          thumbnail: item,
          originalHeight,
        }))
      : [{ original: DefaultImage, thumbnail: DefaultImage, originalHeight }];

  return (
    <Box pl={1}>
      <ImageGallery items={imagesParsed} />
    </Box>
  );
};
