import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(null);
    const [title, settitle] = useState()
    const dataRef = useRef();
    const inputVal = useRef();
    const btnref = useRef();
    const containerref = useRef()
    const inputcontref = useRef()
    const navbarref = useRef()
    const part1 = useRef()
    const part2 = useRef()


    async function fetchData(value) {
        try {
            let rawData = await fetch(`https://api.postalpincode.in/postoffice/${value}`);
        let response = await rawData.json();
        setData(response[0].PostOffice);
        settitle(`All Post Offices in ${inputVal.current.value}(${response[0].PostOffice.length})`)
        console.log(response[0].PostOffice);
        } catch (error) {
            settitle("Only City/District Name Allowed (Try Again With Valid Credentials)")
        }
    }

    function btnclick() {
        fetchData(inputVal.current.value)
        part1.current.style.borderRightColor = "White"
        part1.current.style.width = "65vw"
        part2.current.style.width = "35vw"
        setTimeout(() => {
            dataRef.current.style.opacity = "1";
            navbarref.current.style.opacity = "1";
        }, 500);
    }
    return (
        <>
            <div ref={containerref} className='container'>

                <div ref={part1} className="part1">
                <nav className='navbar'>
                    <span className='navtext' ref={navbarref}>
                        {title}
                    </span>
                </nav>
                {data && (
                    <div className='cardcont' ref={dataRef}>
                        {data.map((postOffice, index) => (
                            <div className='card' key={index}>
                                <div>{postOffice.Name}</div>
                                <div>{postOffice.Pincode}</div>
                                <div>Branch Type: {postOffice.BranchType}</div>
                                <div>Delivery Status: {postOffice.DeliveryStatus}</div>
                                <div>District: {postOffice.District}</div>
                                <div>Division: {postOffice.Division}</div>
                                <div>Region: {postOffice.Region}</div>
                                <div>Circle: {postOffice.Circle}</div>
                                <div>State: {postOffice.State}</div>
                            </div>
                        ))}
                    </div>
                )}
                </div>

                <div ref={part2} className="part2">
                <div ref={inputcontref} className='inputcont'>
                    <span>Search Postal Details</span>
                    <input ref={inputVal} type="text" placeholder=' Enter Any City/District Name' />
                    <button ref={btnref} className='btn' onClick={btnclick}>Search</button>
                </div>
            </div>
                </div>
        </>
    );
}

export default App;
