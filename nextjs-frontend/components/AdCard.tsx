

const AdCard = ({ ad }: any) => {

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-full">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">{ad.title}</h2>
      </div>
      <div className="flex justify-around mb-4 w-full">
        <div className="mr-4">
          <p className="text-gray-600">Min Price:</p>
          <p className="text-lg font-bold">Rs. {ad.min_price.price.toLocaleString()}</p>
          <p className="text-gray-600">Time: {ad.min_price.time}</p>
          <a
            href={ad.min_price.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-900"
          >
            View Min Price Ad
          </a>
        </div>
        <div className="mr-4">
          <p className="text-gray-600">Avg Price:</p>
          <p className="text-lg font-bold">Rs. {ad.average_price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600">Max Price:</p>
          <p className="text-lg font-bold">Rs. {ad.max_price.price.toLocaleString()}</p>
          <p className="text-gray-600">Time: {ad.max_price.time}</p>
          <a
            href={ad.max_price.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-900"
          >
            View Max Price Ad
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default AdCard;
