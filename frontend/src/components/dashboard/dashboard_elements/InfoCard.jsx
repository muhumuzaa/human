import { useNavigate } from "react-router-dom";


const InfoCard = ({icon: Icon, bigtitle, smallTitle, bgColor ='bg-orange-700', iconColor ='text-orange-500', borderType, navigateTo}) => {
  const naviagate = useNavigate()
  const handleClick = () =>{
    if(navigateTo){
      naviagate(navigateTo)
    }
  }
  return (
    <div className="flex space-x-2" onClick={handleClick}>
      <span className={`${bgColor} w-8 h-8 rounded-full`}>
        {Icon && <Icon className={`text-xl ${iconColor}`}/>}
      </span>
      <div className={`flex flex-col items-center md: ${borderType} border-r-slate-200 px-6`}>
        <span className="font-semibold text-gray-500">{smallTitle}</span>
        <span className="text-5xl font-bold text-gray-800">{bigtitle}</span>
      </div>
    </div>
  );
};

export default InfoCard;
