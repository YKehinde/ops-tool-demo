import Image from 'next/image';

const Banner = () => {
  return (
    <div className="row-start-3 flex gap-6 flex-wrap items-center justify-between border-b-2 w-full py-2 px-5">
      <Image src="/triple-Logo-Full-Color.svg" alt="triple logo" width={200} height={64} />
    </div>
  );
};
export default Banner;
