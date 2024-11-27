

export default function FacilityCard({facility}){

    const title = facility.title;
    const image = facility.image;

    return (

        <div className=" facility-card relative w-[25vw] hover:rounded-none h-[45vh] flex-col hover:translate-x-8 hover:text-3xl hover:items-center duration-[0.2] transition-all ">
            <p className=" fixed z-50 text-[#ffffff] text-6xl ml-4 hover:items-center duration-[0.2] transition-all ">{title}</p>
            <img src={image} className="relative w-full h-full z-10 rounded-xl " />
        </div>

    )
}