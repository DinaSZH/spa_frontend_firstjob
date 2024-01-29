
import { Skeleton } from '@mantine/core';

const SkeletonLoader = () => {
  return (
    <>
      <Skeleton height={8} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
       <Skeleton height={8} mt={6} radius="xl" />
    </>
  )
}

export default SkeletonLoader
