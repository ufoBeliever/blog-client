import React from "react";

interface SubmitButtonProps{
    clickHandler?: (a:any)=>any
}

const SubmitButton:React.FC<SubmitButtonProps> = (props) => {
    return (
        <input type="submit"
               value="Submit"
               className="bg-green-500 w-20 h-10 rounded font-sans font-normal text-md text-white cursor-pointer"
               onClick={props.clickHandler}
        />
    )
}

export default SubmitButton