import React from 'react';

const LoadingPage = () => {
    const randomNumber = Math.random();
    let funFact;
    if(randomNumber < .3) {
        funFact = "The Earl of Sandwich, John Montagu, who lived in the 1700s, reportedly invented the sandwich so he wouldn’t have to leave his gambling table to eat";
    } else if (randomNumber < .6) {
        funFact = "Elephants can't jump";
    } else {
        funFact = "There are no muscles in your fingers: Their function is controlled by muscles in your palms and arms.";
    }

    return (
        <div>
            <h2>We are loading your articles, please be patient, you will only need to wait once...</h2>
            <h3 style={{marginTop: 20}}> <span style={{fontWeight:'bold'}}>Fun fact:</span> {funFact}</h3>
        </div>
    );
}

export default LoadingPage;