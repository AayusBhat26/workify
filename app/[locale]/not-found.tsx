import Link from "next/link";

export default async function NotFound(){
    return (
        <div>
            <h2>Not found</h2>
            <p>could not find the requested page</p>
            <p>
                View <Link href={"/"}>
                    Home page
                </Link>
            </p>
        </div>
    )
}