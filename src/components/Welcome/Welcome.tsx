import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients } from '@/theme';

export function Welcome() {
  const navigate = useNavigate();
  const setActive = useHeaderStore((state) => state.setActive);

  const handleGetInspired = () => {
    navigate('/app');
    setActive('/app');
  };

  return (
    <div className="text-center">
      <h1 className="text-[100px] font-black tracking-tight px-4 mt-24 max-sm:mt-0 max-sm:text-5xl">
        Welcome to{' '}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${themeGradients.logo.from}, ${themeGradients.logo.to})`,
          }}
        >
          Quotd.
        </span>
      </h1>
      <div className="max-w-[580px] mx-auto mt-8 aspect-[3/2]">
        <img
          src="/assets/images/hello.webp"
          alt="Astronaut waving hello"
          className="w-full h-full object-cover rounded-md max-sm:rounded-none"
        />
      </div>
      <p className="text-gray-500 mx-auto text-lg mt-8 max-w-[580px] px-4 max-[24rem]:text-base max-[24rem]:mt-4">
        Find daily inspiration right here. Visit{' '}
        <a href="https://ephodstudio.com/" className="underline text-lg">
          our agency website
        </a>{' '}
        or{' '}
        <a href="https://mitchellwallace.dev/" className="underline text-lg">
          my portfolio
        </a>{' '}
        to see more of our work.
      </p>
      <div className="flex justify-center">
        <button
          className="mt-8 max-[24rem]:mt-4 bg-secondary text-secondary-content py-3 px-6 rounded-md text-xl flex items-center hover:brightness-110"
          onClick={handleGetInspired}
          type="button"
        >
          Get Inspired
          <IconChevronRight size={18} className="ml-2 -mr-1" />
        </button>
      </div>
    </div>
  );
}

// Photo by T Leish: https://www.pexels.com/photo/astronaut-with-a-planet-earth-ball-5258241/
