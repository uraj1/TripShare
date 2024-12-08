import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowLeft, ArrowRight, MapPin, Info, Compass } from 'lucide-react';
import { fetchNearbyPlaces } from '../../utils/placeApi';
import { Place } from '../../types';

export function NearbyPlaces({ destination }: { destination: string }) {
  const swiperRef = useRef<any>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const nearbyPlaces = await fetchNearbyPlaces(destination);
        setPlaces(nearbyPlaces.filter((place) => place.name.length >= 10 && (place.description || '').length >= 50));
      } catch (err) {
        setError('Failed to load nearby places. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      loadPlaces();
    }
  }, [destination]);

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();

  const onSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };


  const truncateText = (text: string, length: number) =>
    text.length > length ? `${text.substring(0, length)}...` : text;

  if (loading) {
    return (
      <div className="bg-black p-8 rounded-xl mt-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-100" />
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black p-8 rounded-xl mt-8">
        <p className="text-center text-yellow-400">{error}</p>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="bg-black p-8 rounded-xl mt-8">
        <p className="text-yellow-400 text-center">No places found near {destination}</p>
      </div>
    );
  }

  return (
    <section className="p-2 bg-black flex items-center justify-center" id="nearby-places">
      <div className="container mx-auto px-6">
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
            {places.map((place) => (
              <SwiperSlide key={place.id}>
                <div className="relative group bg-gray-800 rounded-xl shadow-lg p-5 max-w-[400px] mx-auto cursor-pointer">
                  {/* Name with Icon */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Compass className="text-yellow-400 w-6 h-6" />
                    <h3 className="text-yellow-400 text-xl font-bold">
                      {truncateText(place.name, 25)}
                    </h3>
                  </div>

                  {/* Description with Icon */}
                  <div className="flex items-start space-x-3 mb-3">
                    <Info className="text-gray-400 w-6 h-6" />
                    <p className="text-gray-300">
                      {truncateText(place.description || 'No description available.', 50)}
                    </p>
                  </div>

                  {/* View on Map Button with Icon */}
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-yellow-400 w-6 h-6" />
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            place.name + ' ' + place.address
                          )}`,
                          '_blank'
                        )
                      }
                      className="px-5 py-2 text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                    >
                      View on Map
                    </button>
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
