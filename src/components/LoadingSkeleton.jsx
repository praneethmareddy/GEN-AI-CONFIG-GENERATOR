import { Skeleton, HStack ,Stack, SkeletonCircle} from "@chakra-ui/react";

const LoadingSkeleton = () => (
    <HStack gap="2">
    <SkeletonCircle size="8" opacity={0.6}/>
    <Stack flex="1">
      <Skeleton height="7" width="60%" opacity={0.6}/>
      {/* <Skeleton height="5" width="40%" /> */}
    </Stack>
  </HStack>
);

export default LoadingSkeleton;
