const StatsCard = ({ stat }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.color} text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        </div>
        <div className={`h-1 ${stat.color}`}></div>
      </div>
    );
  };
  
  export default StatsCard;
  