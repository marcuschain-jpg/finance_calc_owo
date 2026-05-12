export default function errSuccMsg(msgType:string, msg:string) {
    return(
        <div className={`absolute z-100 rounded-full border-black-200 w-[50%] h-[10%] left-[25%] bottom-[70%] flex justify-center items-center ${msgType==="success"? 'bg-[#81cf65]' : 'bg-[#bf3730]'}`}>
            <h1 className="text-[#FFFFFF]">{msg}</h1>
        </div>
    );
};