import { Card, CardContent } from "../ui/card"
import { Container } from "./container/Container"
import { Header } from "./header/Header"
import { Title } from "./header/Title"
// import { Title } from ""

export const Editor = ()=>{
    return (
        <Card>
            <CardContent className="py-4 sm:py-6">
                <Header />
                <Container/>
            </CardContent>
        </Card>
    )
}