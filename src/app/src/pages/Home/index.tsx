import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import { BiCamera, BiHistory, BiInfoCircle } from 'react-icons/bi';
import { MdOutlineHandyman } from 'react-icons/md';
import Navbar from '@/components/Navbar';
import CaptureButton from '@/components/CaptureButton';
import BottomNavigation from '@/components/BottomNavigation';
import FeatureCard from './components/FeatureCard';
import RecentAnalysis from './components/RecentAnalysis';
import HowItWorks from './components/HowItWorks';
import WelcomeHero from './components/WelcomeHero';

export default function HomePage() {
  return (
    <Box>
      <Navbar showLogo />

      <VStack w="full" spacing={4} mb={4}>
        <WelcomeHero />

        <SimpleGrid columns={2} spacing={4} w="full">
          <FeatureCard
            icon={BiCamera}
            title="Quick Scan"
            description="Capture or upload images for instant wear pattern analysis"
          />
          <FeatureCard
            icon={BiInfoCircle}
            title="Smart Detection"
            description="AI-powered detection of wear patterns and causes"
          />
          <FeatureCard
            icon={MdOutlineHandyman}
            title="Solutions"
            description="Get recommended actions to address wear issues"
          />
          <FeatureCard icon={BiHistory} title="History" description="Track and review your previous analyses" />
        </SimpleGrid>

        <RecentAnalysis />
        <HowItWorks />
      </VStack>

      <CaptureButton />
      <BottomNavigation />
    </Box>
  );
}
