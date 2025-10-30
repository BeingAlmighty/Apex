import React from 'react'
import { NavbarDemo } from '../Landing/Navbar'
import { ContainerScroll } from '../Landing/Hero'
import Problem from '../Landing/Problem'
import { Tiles } from '../ui/tiles'
import Features from '../Landing/Features'

const Landing = () => {
    return (
        <div className="relative">
            <div className="fixed inset-0 w-full h-full -z-10 bg-white dark:bg-black">
                <Tiles 
                    rows={100} 
                    cols={20}
                    tileSize="md"
                />
            </div>

            <NavbarDemo />
            <div className="pt-16 relative z-0">
                <ContainerScroll
                    titleComponent={
                    <div className='leading-[10vh]'>
                    <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center"> <h1 className='tracking-wide text-orange-500'>Apex</h1> Data Driver Career Navigator<h1>Stop Guessing. Start Investing</h1> </h1>
                    </div>
                }
                >
                    <img className='w-full h-full object-cover rounded-xl' src="https://images.klipfolio.com/website/public/bf9c6fbb-06bf-4f1d-88a7-d02b70902bd1/data-dashboard.png" alt="idk" />
                </ ContainerScroll>

                <Problem />
                <Features />
            </div>
        </div>
    )
}

export default Landing
