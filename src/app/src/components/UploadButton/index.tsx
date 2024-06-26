import { Maybe } from '@/types';
import { Box, Button, ButtonProps } from '@chakra-ui/react';
import { useRef } from 'react';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';

interface UploadButtonProps extends ButtonProps {
  onUpload: (file: Maybe<File>) => void;
  accept: string;
}
export default function UploadButton({ onUpload, accept, ...props }: UploadButtonProps) {
  const inputUploadRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onUpload(event.target.files?.[0]);
  };

  return (
    <>
      <Button
        {...props}
        leftIcon={<MdOutlineDriveFolderUpload />}
        loadingText="Uploading"
        onClick={() => inputUploadRef?.current?.click?.()}
      >
        Upload
      </Button>
      <Box display={'none'}>
        <input type="file" ref={inputUploadRef} accept={accept} onChange={handleChange} />
      </Box>
    </>
  );
}
