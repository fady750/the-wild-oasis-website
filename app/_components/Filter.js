"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";


function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const activeFilter = searchParams.get("capacity");
    function handleFilter(filter){
        const params = new URLSearchParams(searchParams);
        params.set("capacity",filter);
        router.replace(`${pathName}?${params.toString()}`, {scroll:false});
    }
    return (
        <div className="border border-primary-800 flex" >
            <Button activeFilter={activeFilter} filter="all" handleFilter={handleFilter} >All Cabins</Button>
            <Button activeFilter={activeFilter} filter="small" handleFilter={handleFilter} >1&mdash;3</Button>
            <Button activeFilter={activeFilter} filter="medium" handleFilter={handleFilter} >4&mdash;7</Button>
            <Button activeFilter={activeFilter} filter="large" handleFilter={handleFilter} >8&mdash;12</Button>
        </div>
    )
}


function Button ({children,activeFilter, filter, handleFilter }){
    return(
        <button 
            onClick={()=>handleFilter(filter)}   
            className={` ${activeFilter === filter && "bg-primary-700 text-primary-50" } px-5 py-2 hover:bg-primary-700`}>
                {children}
        </button>
    )
}

export default Filter
