import Navbar from "./Navbar"
import { useState } from "react"

export default function BmiPage(){

    const [ displayResult , setDisplayResult ] = useState(false);
    const [ result , setResult ] = useState(0);
    const [ formData , setFormData ] = useState({
        height:"" , weight:"" , age:"" , gender:"" , activity:""
    })
    const [ errors , setErrors ] = useState([])

    function calculateBMI(e) {
        e.preventDefault()
        setErrors(false);
        /* Getting input from user into height variable.
        Input is string so typecasting is necessary. */
        let height = parseInt(formData.height);
    
        /* Getting input from user into weight variable.
        Input is string so typecasting is necessary.*/
        let weight = parseInt(formData.weight);
    
        // Checking the user providing a proper
        // value or not
        if (height === "" || isNaN(height))
            setErrors("Provide a valid Height!")
    
        else if (weight === "" || isNaN(weight))
            setErrors("Provide a valid Weight!")
    
        // If both input is valid, calculate the bmi
        else {
            var bmi = (weight / ((height * height)/ 10000)).toFixed(2);    
        }
        setDisplayResult(true);
        setResult(bmi);
        
    }

    function changeHandler(e){
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
        console.log(formData);
    }

    return(
        <div className="bmi-page w-screen h-screen mx-auto " >
            <div>
                <Navbar/>
            </div>
            <div className=" w-[90%] h-[80%] flex flex-wrap justify-Start items-center gap-10 mx-auto gap-4" >
                <div className=" w-[45%] h-[60%] flex flex-col gap-4 ">
                    <h1 className=" text-4xl text-[#fff] font-bold " >BMI CALCULATOR CHART</h1>
                    <table className="text-[#ffffffea] text-2xl mt-2 " >
                        <thead>
                            <tr>
                                <th className="border-t-0 border-l-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >BMI</th>
                                <th className="border-t-0 border-r-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >WEIGHT STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-t-0 border-l-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >Below 18.5</td>
                                <td className="border-t-0 border-r-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >Under-Weight</td>
                            </tr>
                            <tr>
                                <td className="border-t-0 border-l-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >18.5 - 24.9</td>
                                <td className="border-t-0 border-r-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >Healthy</td>
                            </tr>
                            <tr>
                                <td className="border-t-0 border-l-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >25.0 - 29.9</td>
                                <td className="border-t-0 border-r-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >Over-weight</td>
                            </tr>
                            <tr >
                                <td className="border-b-0 border-l-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >30.0 and Above</td>
                                <td className="border-b-0 border-r-0 border-dashed border-collapse border-2 border-[#f5f5f5] " >Obese</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className=" w-[45%] h-full bg-[#ffffffd8] flex flex-col flex-wrap justify-start items-center mt-8 gap-4" >
                    <h1 className=" text-3xl font-bold text-blue-300 mt-4 ">CALCULATE YOUR BMI</h1>
                    <form onSubmit={ calculateBMI } className=" h-[70%] flex flex-col flex-wrap justify-center items-center gap-4 border-blue-100 border-[1px] shadow-lg shadow-blue-50 ">
                                
                                <div className=" w-full h-[15%] flex flex-wrap mx-auto gap-2 justify-center " >
                                    <input onChange={changeHandler} className="w-[45%] bg-transparent " type="text" name="height" placeholder="Height/cm" value={ formData.height }/>
                                    <input onChange={changeHandler} className="w-[45%] bg-transparent " type="text" name="weight" placeholder="Weight/kg" value={ formData.weight }/>
                                </div>

                                <div className=" w-full h-[15%] flex flex-wrap mx-auto gap-2 justify-center " >
                                    <input onChange={changeHandler} className="w-[45%] bg-transparent " type="text" name="age" placeholder=" Enter Age" value={ formData.age }/>
                                
                                    <select onChange={changeHandler} className="w-[45%] bg-transparent text-[#848989] border-b-[2px] border-richblack-600 " name="gender" value={ formData.gender }>
                                        <option value="#">Sex</option>
                                        <option value="male" name="male" id="m">Male</option>
                                        <option value="female" name="female" id="f">Female</option>
                                    </select>
                                </div>

                                <div className=" w-full h-[15%] flex flex-wrap mx-auto gap-2 justify-center " >
                                    <select onChange={changeHandler} className=" w-[90%]  bg-transparent text-[#848989] border-b-[2px] border-richblack-600 " name="activity" value={ formData.activity }>
                                        <option value="#">Select ann Activity Factor :</option>
                                        <option value="Little or no Excercise/ desk Job">Little or no Excercise/ desk Job</option>
                                        <option value="Ligtht excercise/ sports 1-3 day/week">Light Excercise/ sports 1-3 days/week</option>
                                        <option value="Moderate excercise/ sports 3-5 day/week">Modearte Excercise/ sports 3-5 days/week</option>
                                        <option value="Heavy excercise/ sports 6-7 day/week">Heavy Excercise/ sports 6-7 days/week</option>
                                        <option value="Very heavy excercise/ physical job/ training 2 x/day">Very heavy excercise/ physical job/ training 2 x/day</option>
                                    </select>
                                </div>

                        <button className=" w-[35%] h-[12%] bg-blue-100 text-[#d9e6e9] mt-4 " >CALCULATE</button>
                        {
                            errors ? (<p className=" text-lg text-[#ff3838] "> {errors}</p>) :(<diV></diV>)
                        }
                    </form>
                    {
                        displayResult && !errors ? (
                            <div className=" w-full h-[10%] flex justify-center items-center gap-4 mt-4 " >
                                {/* <div className=' w-[10%] h-full rounded-full bg-blue-400 shadow-blue-50 shadow-md '></div> */}
                                <p className=" bmi-text text-xl text-blue-100 "> Your Calculated Bmi Is {result} </p>
                            </div>
                        ) : (
                            <div className=" text-xl mt-2 text-blue-100 "  >Note :- Enter Details to Calculate your BMI</div>
                        )
                    }
                </div>
            </div>
            
        </div>
    )
}