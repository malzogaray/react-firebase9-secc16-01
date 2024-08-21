import { useRef,forwardRef } from "react";

const inputext = forwardRef  ((props, ref) => {
    return (
        <>
               <input type="text" ref={ref}/>
        </>
    );
     });

const ExampleRef = () => {  
   const inputFocus = useRef(null);


    const handleButtonClick = () => {
        console.log("me diste click");
        inputFocus.current.focus();
    };
    
    return (
        <>
            <inputText ref={inputFocus}  />
            <button onClick={handleButtonClick} > Click Ref </button>
        </>
    );
};

export default ExampleRef;

