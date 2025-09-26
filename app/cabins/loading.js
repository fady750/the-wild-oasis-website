import Spinner from "../_components/Spinner"

function loading() {
    return (
        <div className="flex flex-col items-center justify-center" >
            <Spinner/>
            <p className="text-xl text-primary-200" >Loadings Cabins Data...</p>
        </div>
    )
}

export default loading
