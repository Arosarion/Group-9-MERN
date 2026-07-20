import { useState } from "react";
import SideBar from "../Sidebar";
import "./InfoPages.css";
import { Link } from 'react-router-dom'


export default function FirstAid() {
    return (
        <div className="FirstAid-container">
            <SideBar />
            <div className="FirstAid-card">
                <h1>First Aid Tips</h1>
                <h4>Having a knowledge of basic first aid skills could save someone's life or your own life. 
                    These skills are easy to learn and recall in emergency situations. 
                    Basic skills like CPR, setting a splint, stopping bleeding in dire situations, 
                    are important life skills.
                </h4>
                <br></br>
                <h2>Table of Contents</h2>
                <ul>
                    <li>What's in a First Aid kit?</li>
                    <li>CPR and When to Do It</li>
                    <li>How to help someone who's choking</li>
                    <li>How to help someone experiencing a seizure</li>
                    <li>How to treat severe bleeding</li>
                </ul>
                <br></br>
                <h2>
                    How to perform CPR:
                </h2>
                <h4>
                    There are two main types of CPR:   
                </h4>
                    <ul>
                        <li>CPR with breaths (conventional CPR): You use chest compressions and mouth-to-mouth breaths. You need CPR certification to do this type.</li>
                        <li>Hands-only CPR: You only use chest compressions (no breaths). You don’t need CPR certification to do this type. You can learn on your own.</li>
                    </ul>
                    <br></br>
                    <h4>Both types are effective and can be lifesaving in the case of cardiac arrest in adults. CPR with breaths is preferable in situations where the CPR must go on for longer than a few minutes because it provides them with oxygen.
                    </h4>
                    <br></br>
                    <h4>A person needs CPR if they’re unconscious and have absent or abnormal breathing (signs that a person is in cardiac arrest).
                 </h4>
                 <br></br>
                 <h3>
                    CPR on Adult or teen
                 </h3>
                 <h4>
                    <ol>
                        <li>Position and Push: Lay the person flat on their back. Place your hands in the center of the chest with one palm over the other and interlace your fingers.</li>
                        <li>Compress Hard and Fast: Keeping your elbows locked and shoulders directly over your hands, push down at least 2 inches at rapid rate of 100-120 compressions per minute (to the beat of “Stayin’ Alive”)</li>
                        <li>Use an AED: If an AED is nearby, turn it on and follow the voice prompts.</li>

                    </ol>
                 </h4>
                 <br></br>
                 <h3>CPR for children and babies</h3>
                 <h4>
                    CPR with breaths work best but using modified chest compressions can work as a substitute. 
                    <ul>
                        <li>For children, use either one or two hands for chest compressions. It depends on the size of the child. For children 1 to 8 years old, using one hand may be OK as long as you can keep the proper form. The child’s chest should go down by about 2 inches (5 centimeters).
Advertisement</li>
                    </ul>
                 </h4>
                 <br></br>
                 <h4>
                    When performing CPR on an infant (1 to 12 months old), use one of the following techniques for chest compressions
                    <ul>
                        <li>The “two thumb-encircling hands” technique: You wrap both hands around the infant’s upper body. Your thumbs should meet at the center of their chest, forming an upside-down V. Push down with both thumbs. This is better than doing two-finger compressions (an older method).</li>
                        <li>The “heel-of-one-hand” technique: If you can’t wrap both hands around the infant, then use the heel of one hand (not both) to do chest compressions.</li>
                    </ul>
                 </h4>

                 <br></br>
                 <h2>How to help someone who is choking</h2>
                 <h3>Adult</h3>
                 <h4>Remember the 5 and 5 method.
If they can’t cough to clear their airways:
                <ol>
                    <li>Give them 5 back blows: Stand behind the person, holding one arm over their chest while having them bend at the waist. With your other hand, strike the shoulder blades 5 times with the heel of your hand</li>
                    <li>Give them 5 Abdominal thrusts (Heimlich Maneuver): Stand behind them, make a first with one hand and place it just above their belly button. Grab your hand with your other hand and do quick pulls in and up.</li>
                    <li>Repeat these steps until the blockage clears of help arrives</li>        
                </ol>
                </h4>
                    <br></br>
                    <h3>Infants Under 1 year</h3>
                    <h4>Lay them facedown along your forearm and give 5 gentle back blows with the heel of your hand. Turn the infant’s face-up and give 5 chest thrusts with two fingers in the center of the breastbone.</h4>
                    <br></br>
                    <h3>If They're Unconcious</h3>
                    <h4>Lower person to the floor. Open their mouth and remove object if it’s visible. Start CPR and begin chest compressions.</h4>
                <br></br>
                <h2>How to help someone experiencing a seizure</h2>
                <h4>Perform the 3 S’s</h4>
                <h4>
                    <ol>
                        <li>Stay: stay with the person.</li>
                        <li>Safe: make sure there isn’t anything near them that could cause them harm.</li>
                        <li>Slide: gently turn the person onto their side to keep their airway clear and prevent them from choking.</li>
                    </ol>
                    Do not restrain them or try to feed them and try to time the seizure.
                </h4>
                <br></br>
                <h3>When to Call 911 Immediately</h3>
                <h4>
                    <ul>
                        <li>The seizure lasts longer than 5 minutes.</li>
                        <li>The person has trouble breathing or wakes up from a seizure and immediately has another one.</li>
                        <li>The person is injured, pregnant, or has underlying health conditions.</li>
                        <li>It is their first time having a seizure.
Stay with them until the seizure ends and they are fully conscious. They may be confused afterward, so speak calmly and help them safely get to a comfortable</li>
                    </ul>
                </h4>
                <br></br>
                <h2>How to treat severe bleeding</h2>
                <h4>For a person experiencing severe, life-threatening external bleeding, immediately call 911. Put on gloves if available, then apply firm, continuous pressure to the wound using a clean cloth or bandage. If blood soaks through, place another cloth directly on top without removing the original one.
Additional critical steps:
                <ul>
                    <li>Do not remove embedded objects: If an object is stuck in the wound, leave it in place and apply pressure around it.</li>
                    <li>Elevate the wound: Raise the injured limb above heart level if it doesn't cause more pain.</li>
                    <li>Manage shock: Help the person lie down, keep them warm with a blanket, and elevate their feet.</li>
                </ul>
                </h4>
            </div>
        </div>
    )
}