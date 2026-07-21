import { useState } from "react";
import "./InfoPages.css";
import { Link } from 'react-router-dom'
import SideBar from "../Sidebar";

export default function Anatomy() {
    return (
        <div className="Anatomy-container">
            <SideBar />
            <div className="Anatomy-card">
                <h1>The Human Body</h1>

                <br></br>
                <h2>Table of Contents</h2>
                <ul>
                    <li>The Nervous & Endocrine Systems</li>
                    <li>The Cardiovascular & Respiratory Systems</li>
                    <li>Homeostasis</li>
                    <li>Cells and Tissues</li>
                    <li>Your Microbiome</li>
                </ul>
                <br></br>

                <h2>The Nervous & Endocrine Systems</h2>
                <h4>
                    The nervous and endocrine systems are the body's main control networks. The nervous system uses fast electrical signals, the endocrine system uses slower chemical hormones, and both work together to keep the body balanced.
                </h4>
                <br></br>
                <h3>
                    The Nervous System
                </h3>
                <h4>
                    The nervous system uses quick electrical impulses and neurotransmitters to send messages.
                </h4>
                <h4>It's made up of neurons which are the building blocks of the body's communication system. They create a network that allows signals to move between the brain and body.

                </h4>
                <h4>
                    There are two main parts of the nervous system:
                    <ul>
                        <li>The central nervous system: brain and spinal cord</li>
                        <li>The peripheral nervous system</li>
                    </ul>
                </h4>

                <br></br>
                <h3>The Endocrine System</h3>
                <h4>
                    The endocrine system is composed of glands that secrete chemical messengers known as hormones, which the bloodstream carries to organs and tissues to regulate functions such as metabolism, digestion, blood pressure, and growth.
                </h4>
                <h4>
                    Some of the endocrine system's most important glands are the pineal gland, hypothalamus, pituitary gland, thyroid, ovaries, and testes. Each works in specialized ways in specific areas.
                </h4>
                <h4>
                    The endocrine system is linked to teh nervous system by the hypothalamus, a tiny collection of nuclei at the base of the forebrain that controls an astonishing amount of human behavior, including emotional and stress responses. It's also involved in basic drives such as:
                    <ul>
                        <li>Sleep</li>
                        <li>Hunger</li>
                        <li>Thirst</li>
                        <li>Libido</li>
                    </ul>                
                </h4>
                <h4>
                    The hypothalamus controls the pituitary gland, which in turn regulates the release of hormones from other glands in the endocrine system.
                </h4>

                <br></br>
                <h2>
                    The Cardiovascular & Respiratory Systems
                </h2>
                <h4>
                    The cardiovascular and respiratory systems work closely together to supply oxygen to the body and remove carbon dioxide waste.
                </h4>
                <h3>
                    The Cardiovascular System
                </h3>
                <h4>
                    Your circulatory system, or cardiovascular system, supplies oxygen and nutrients to your whole body and removes waste through your blood. Your heart pumps blood that flows through your arteries, veins and capillaries. These blood vessels and your heart form your circulatory system. They work together to ensure your cells have what they need.
                </h4>
                <h4>
                    Your body’s circulatory system consists of your heart and blood vessels. They use blood to bring your cells what they need and take away what they don’t.
                </h4>
                <h4>
                    Your heart pumps blood through the far-reaching, intricate network of arteries and veins. Your blood delivers oxygen and nutrients to your body’s muscles, tissues and organs. This network also removes waste and takes it to organs that can get rid of it.
                </h4>
                <h3>
                    The Respiratory System
                </h3>
                <h4>
                    Your heart and your lungs are two of the most vital organs in your body. In addition to sharing a chest cavity, the functions of the heart and the lungs are closely intertwined.
                </h4>
                <h4>
                    With each beat, your heart sends blood throughout the body. The pulmonary loop, or the right side of the heart, is tasked with collecting the oxygen-poor blood and moving it to the lungs for cleaning and reoxygenating. Once reoxygenated, the systemic loop, or the left side of the heart, pumps the high-oxygen blood to the rest of your organs; like the kidneys, liver and brain. Once all the oxygen in your blood has been consumed, the process repeats. With each inhale, your lungs fill with fresh oxygen and each exhale releases carbon dioxide – ensuring the blood your heart pumps is meeting the needs of your body.
                </h4>
                <br></br>

                <h2>Homeostasis</h2>
                <h4>
                    Homeostasis is the active process by which your body maintains a stable, balanced internal environment—such as a core temperature around 98.6 degrees Farenheit and blood sugar between 70 and 120 mg/dL—despite external changes. It is critical for enzyme function and overall cell survival.
                </h4>
                <h4>
                    Most bodily systems use the negative feedback loop to reverse or counteract changes. If your body overheats, it uses sweat and vasodilation to cool down; if it is cold, it shivers and constricts blood vessels to generate heat.
                </h4>
                <h4>
                     Unlike negative feedback, positive feedback loops amplify a stimulus. Blood clotting, immune responses, and labor/delivery are examples where the process builds upon itself.
                </h4>
                <h4>
                     Multiple organs coordinate this balance. The brain manages temperature, while the kidneys control fluid and electrolyte balance, and the pancreas manages glucose through insulin release.
                </h4>

                <br></br>
                <h2>Cells and Tissues</h2>
                <h4>
                    Cells are the basic building blocks of all living things, grouped together into tissues to perform essential body functions. The adult human body contains an estimated 30 to 40 trillion cells, which organize into four primary tissue types. The nucleus holds DNA, which acts as the instruction manual for cell growth, function, and reproduction.
                    Mitochondria convert food and oxygen into usable energy (ATP) to power cellular activities.
                    Cells adapt to take on specific roles, such as red blood cells carrying oxygen or neurons sending brain signals.
                </h4>
                <br></br>
                <h4>
                    A tissue is a cooperative group of similar cells working together to perform a shared job. Epithelial Tissue covers body surfaces, lines cavities, and forms protective outer layers and glands. Connective Tissue supports and protects other structures; examples include bone, cartilage, fat, and blood.
                    Muscle Tissue contracts to create movement in the skeleton, heart, and internal organs. Nervous Tissue collects and processes information, sending electrochemical signals through the brain and nerves.
                </h4>
                <br></br>

                <h2>Your Microbiome</h2>
                <h4>
                    The human microbiome is an active community of roughly 39 trillion microbes—including bacteria, viruses, and fungi—that live in and on our bodies. It acts like an invisible organ, weighing about 2 kg (4.4 lbs), and helps with digestion, making vitamins, and training the immune system.
                </h4>
                 </div>
        </div>
    )
}