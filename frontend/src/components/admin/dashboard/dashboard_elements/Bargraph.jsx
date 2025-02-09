const Bargraph = () => {
  // 12 months
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Generate random data between 10 and 100 for each month
  const data = months.map(() => Math.floor(Math.random() * 90) + 10);
  const revSum = data.reduce((acc, val) => acc + val, 0)

  return (
    <div>
        <div className="mb-8">
        <span className="text-2xl text-gray-700 font-bold">{revSum}k</span>
        </div>
        
    <div className="flex items-end space-x-2 pb-2">
        
      {data.map((value, index) => (
        <div key={months[index]} className="flex flex-col items-center group relative">
          {/* The bar */}
          <div
            style={{ height: `${value }px` }}
            className={` w-8 rounded-lg hover:shadow-xl hover:shadow-indigo-600/50 ${index ===3? 'bg-indigo-600 text-white': 'bg-gray-200 hover:bg-indigo-600'}`}
            
            
          />
          <div
      className="opacity-0 group-hover:opacity-100 
                 transition-opacity duration-200 
                 absolute bottom-full left-1/2 
                 transform -translate-x-1/2 mb-2 
                 px-2 py-1 text-sm 
                 bg-indigo-600 text-white 
                 rounded-md whitespace-nowrap"
    >
      {`$${value}k`}
    </div>
          {/* Month label */}
          <span className="mt-2 text-sm text-gray-700">{months[index]}</span>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Bargraph;
