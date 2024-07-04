import { Maybe } from '@/types';
import { Box } from '@chakra-ui/react';

interface ImageUploaderProps {
  accept?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onUpload: (file: Maybe<File>) => void;
}
export function ImageUploader({ accept = 'image/png, image/jpeg', onUpload, inputRef }: ImageUploaderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onUpload(event.target.files?.[0]);
  };

  return (
    <>
      <Box display={'none'}>
        <input type="file" ref={inputRef} accept={accept} onChange={handleChange} />
      </Box>
    </>
  );
}
