import { useRouter } from "next/router"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { format } from 'date-fns'
import InfoCard from "../components/InfoCard"

const search = ({ searchResults }) => {

    const router = useRouter()
    const { location, startDate, endDate, noOfGuests } = router.query

    const formattedStartDate = format(new Date(startDate), 'dd MMMM')
    const formattedEndDate = format(new Date(endDate), 'dd MMMM')
    const range = `from ${formattedStartDate} to ${formattedEndDate}`
    
    return (
        <div className="h-screen">
            <Header placeholder={`${location} | ${noOfGuests} guests`} />

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="">300+ Stays <span className="highlight">{range}</span> for <span className="highlight">{noOfGuests} guests</span>.</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancelation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>

                    <div className="flex flex-col">
                        {searchResults?.map((item, index) => (
                            <InfoCard key={index} item={item} />
                        ))}
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    )
}

export default search

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz')
    .then(res => res.json())

    return {
        props: {
            searchResults
        }
    }
}