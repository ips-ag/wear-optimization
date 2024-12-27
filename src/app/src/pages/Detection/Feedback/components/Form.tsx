import { historyService } from '@/services/history';
import { WearCode } from '@/types';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import FeedbackConfirmPopover from '../../components/FeedbackConfirmPopover';
import SelectWearCodeDrawer from './SelectWearCodeDrawer';
import WearCodeCard from './WearCodeCard';

const FeedbackSchema = z
  .object({
    userWearCode: z.string(),
    userComment: z.string().refine(value => value.length <= 500, {
      message: 'Comment must be less than 500 characters',
    }),
  })
  .refine(data => Boolean(data.userWearCode), {
    message: 'Wear code is required',
    path: ['userWearCode'],
  });

type FeedbackFormType = z.infer<typeof FeedbackSchema>;

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(FeedbackSchema),
  });

  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
  const {
    isOpen: isOpenFeedbackConfirm,
    onOpen: onOpenFeedbackConfirm,
    onClose: onCloseFeedbackConfirm,
  } = useDisclosure();

  const userWearCode = watch('userWearCode');
  const isSetWearCode = Boolean(userWearCode);

  const onSubmit = async (data: FeedbackFormType) => {
    if (id) {
      const wearCode = WearCode[data.userWearCode as keyof typeof WearCode];
      await historyService.updateFeedback(id, false, data.userComment, wearCode);
      onOpenFeedbackConfirm();
    }
  };

  const handleSelectWearCode = (wearCode: string): void => {
    setValue('userWearCode', String(WearCode[wearCode as keyof typeof WearCode]), { shouldValidate: true });
    onCloseDrawer();
  };

  const handleConfirm = () => {
    onCloseFeedbackConfirm();
    navigate('/');
  };

  return (
    <Box w="full" h="full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full" h="full" spacing={4} align="start">
          <FormControl isInvalid={!!errors.userWearCode}>
            <FormLabel color="brand.green.primary" htmlFor="userWearCode">
              Wear pattern
            </FormLabel>
            {isSetWearCode && <WearCodeCard wearCodeName={WearCode[Number(userWearCode)]} />}
            <Button
              color="brand.green.primary"
              borderColor="brand.green.primary"
              variant="outline"
              onClick={onOpenDrawer}
            >
              {isSetWearCode ? 'Change wear pattern' : 'Select wear pattern'}
            </Button>
            <FormErrorMessage>{errors.userWearCode?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.userComment?.message}>
            <FormLabel color="brand.green.primary" htmlFor="userComment">
              Comment
            </FormLabel>
            <Textarea {...register('userComment')} id="userComment" />
            <FormErrorMessage>{errors.userComment?.message}</FormErrorMessage>
          </FormControl>

          <Button
            leftIcon={<RiSendPlaneFill />}
            bg="brand.green.primary"
            color="white"
            type="submit"
            _hover={{ bg: 'brand.green.70' }}
            w="full"
          >
            Submit feedback
          </Button>
        </VStack>
      </form>

      <SelectWearCodeDrawer onSelect={handleSelectWearCode} isOpen={isOpenDrawer} onClose={onCloseDrawer} />

      <FeedbackConfirmPopover isOpen={isOpenFeedbackConfirm} onClose={handleConfirm} isAccept={false}>
        <></>
      </FeedbackConfirmPopover>
    </Box>
  );
}
