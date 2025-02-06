import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
    size?: number;
    className?: string;
    hasLink?: boolean
}
export const WorkifyHeader = ({ className, hasLink, size = 20 }: Props) => {
    return (
        <>
            {
                hasLink ? (
                    <Link href={"/dashboard"} className={cn("flex justify-center items-center gap-2 bg-blue-500 relative z-10 ", className)}>
                        <div className="flex justify-center items-center gap-2">
                            {/* log */}
                            <h1 className="text-2xl">
                                <span className="text-primary font-semibold">
                                    WORK
                                </span>
                                IFY
                            </h1>
                        </div>
                    </Link>
                ) :
                    <div className={cn("flex justify-center items-center gap-2 text-2xl", className)}>
                        {/* log */}
                        <h1 className="text-2xl">
                            <span className="text-primary font-semibold">
                                WORK
                            </span>
                            IFY
                        </h1>
                    </div>

            }
        </>

    )
}