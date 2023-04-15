import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import AddIcon from '@mui/icons-material/Add';

interface PropsType {
  onChange: (file: any) => void;
  fileTypes: string[];
  title: string;
  children?: any;
  dropzoneHeigth?: number;
  [key: string]: any;
}

const DragDropFile: React.FC<PropsType> = ({ onChange, fileTypes, title, children, dropzoneHeigth, ...rest }) => {
  const [dragging, setDragging] = useState<boolean>(false);

  return (
    <Box className="DragDropFile">
      <FileUploader
        classes="dragBox"
        handleChange={onChange}
        name="file"
        {...rest}
        onDraggingStateChange={setDragging}
        types={fileTypes}
        children={
          children || (
            <Box
              sx={{
                width: '100%',
                height: dropzoneHeigth || '216px',
                border: '1px dashed #8F0A0C',
                borderRadius: '12px',
              }}
            >
              <AddIcon
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#8F0A0C',
                  border: '2px solid #8F0A0C',
                  borderRadius: '50%',
                  padding: '4px',
                  fontSize: '28px',
                }}
              />
              {!dragging && (
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: '14px',
                    color: '#8B8C9B',
                    position: 'absolute',
                    top: '70%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>
          )
        }
      />
    </Box>
  );
};

export default DragDropFile;
