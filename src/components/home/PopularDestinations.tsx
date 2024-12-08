import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Manali, Himachal Pradesh',
    image: 'https://as2.ftcdn.net/v2/jpg/02/57/91/21/1000_F_257912197_ySuBhefKYPQIZNa3xeGiObLpgYBnH9U5.jpg',
    description: 'A stunning hill station surrounded by snow-capped mountains.',
    link: 'https://himachaltourism.gov.in',
  },
  {
    id: 2,
    name: 'Kerala Backwaters',
    image: 'https://www.shutterstock.com/image-photo/silhouette-scene-ferryboat-backwaters-kerala-600nw-102228670.jpg',
    description: 'A serene network of lagoons and lakes in God\'s own country.',
    link: 'https://keralatourism.org',
  },

  {
    id: 3,
    name: 'Leh-Ladakh',
    image: 'https://travellingbee.in/wp-content/uploads/2024/04/image-12.jpeg',
    description: 'A breathtaking cold desert with mesmerizing landscapes.',
    link: 'https://leh.nic.in',
  },
  {
    id: 4,
    name: 'Goa Beaches',
    image: 'https://thumbs.dreamstime.com/blog/2023/12/golden-sands-to-azure-waters-why-photographers-find-goa-s-beaches-irresistible-88688-image203861442.jpg',
    description: 'Golden beaches, vibrant nightlife, and serene landscapes.',
    link: 'https://goa-tourism.com',
  },

  {
    id: 5,
    name: 'Ooty, Tamil Nadu',
    image: 'https://www.trawell.in/blog/wp-content/uploads/2024/03/ooty-main-730x410.jpg',
    description: 'The Queen of Hill Stations with lush green valleys and eye pleasing beauty.',
    link: 'https://ootytourism.co.in',
  },
];

export function PopularDestinations() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();

  const onSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="py-20 mt-10 bg-black flex items-center justify-center" id="destinations">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-yellow-400 mb-12 text-center">Popular Destinations</h2>
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            onSlideChange={onSlideChange}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination.id}>
                <div
                  className="relative group overflow-hidden bg-gray-800 rounded-xl shadow-lg transition-transform cursor-pointer max-w-[400px] h-[300px] mx-auto"
                  onClick={() => window.open(destination.link, '_blank')}
                >
                  {/* Image */}
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wrapper for Name & Description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-5 text-center flex flex-col justify-end transition-all duration-300">
                    {/* Name */}
                    <h3 className="text-yellow-400 text-2xl font-bold mb-1">{destination.name}</h3>

                    {/* Description (Always visible on mobile and tablet, visible on hover on larger screens) */}
                    <p className="text-gray-300 text-sm opacity-100 group-hover:opacity-100 transition-opacity duration-300 block sm:hidden">
                      {destination.description}
                    </p>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Slider Arrows */}
          <button
            onClick={handlePrev}
            disabled={isBeginning}
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-black/50 rounded-full ${isBeginning ? 'text-gray-600' : 'text-yellow-400'} hover:bg-yellow-400 hover:text-black transition z-10`}
            style={{ marginLeft: '-30px' }}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={isEnd}
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-black/50 rounded-full ${isEnd ? 'text-gray-600' : 'text-yellow-400'} hover:bg-yellow-400 hover:text-black transition z-10`}
            style={{ marginRight: '-30px' }}
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

