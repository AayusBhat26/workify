import { LoadingState } from "../ui/loadingState"

export const CommonLoadingScreen  = ()=>{
    return (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]w-full h-full items-center justify-center">
            <LoadingState className="w-12 h-12"/>

        </div>
    )
}