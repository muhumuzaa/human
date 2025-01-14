

const InfoCardLong = ({icon: Icon, bigtitle, smallTitle, bgColor ='bg-orange-700', iconColor ='text-orange-500', borderType}) => {
    return (
      <div className="flex space-x-4 bg-slate-50 rounded-lg w-full justify-between">
        <span className={`${bgColor} w-10 h-full rounded-lg`}>
          {Icon && <Icon className={`text-3xl ${iconColor}`}/>}
        </span>
        <div className="p-4 flex items-center space-x-4">
        <span className="font-semibold text-gray-500">{smallTitle}</span>
        <span className="text-3xl font-bold text-gray-800">{bigtitle}</span>
        </div>
          
        
      </div>
    );
  };
  
  export default InfoCardLong;
  