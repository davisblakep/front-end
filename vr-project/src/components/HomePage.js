import React from 'react';
import { Spring } from 'react-spring/renderprops';

const HomePage = () => {
    return(
        <div>
            <Spring
        config={{duration: 440}}
        from={{ opacity: 0}}
        to={{ opacity: 1}}
        >
          {props=>(
           <div style={props}>
            <div className="homePage-image">
                <div className="homePage-quote">
                <p>Virtual Reality in the 21st Century is the frontrunner of our technological breakthroughs when it comes to user experience.</p>
                <p>-Abraham Lincoln</p>
                </div>
            </div>
            </div>
   )}
 </Spring>

        </div>
    )
}

export default HomePage;