import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImg from './contact-img.svg'
import TrackVisibility from "react-on-screen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
const axios = require('axios');

export const Contact = () => {
    const formInitialDetails = {
        name: '', phone: '', email: '', location: '', service: 'Select a service', message: ''
    }
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});


    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...');
        const response = await axios.post('https://mail-last.vercel.app/contact', formDetails);

        setButtonText('Send');
        setFormDetails(formInitialDetails)

        if (response.status === 200) {
            const toastSuccess = () => toast.success("Your message has been sent successfully. We will get back to you shortly.");
            toastSuccess();
        } else {
            
        }
    }

    const variants = {/*used in motion.div*/
        visible: { opacity: 1, scale: 1, },
        hidden: { opacity: 0, scale: 0.5, x: -3 },
    }
    return (<section className={'contact'} id={'contact'}>
          
        <Container>
        
            <Row className={'align-items-center'}>
                <Col md={6}>
                    <motion.div
                        initial={["hidden"]}
                        animate={["visible"]}
                        variants={variants}
                    >
                        <img src={contactImg}
                            alt={'contact image'} />
                    </motion.div>
                </Col>
                <Col md={6} id={'connect-col'}>
                    <TrackVisibility once={true}>
                        {({ isVisible }) => isVisible ?
                            <motion.div
                                initial={{ x: 300 }}
                                animate={{ x: 0 }}
                                transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.9 }}
                            >
                                <div className={'animate__animated animate__fadeInRight'}>
                                    <h2><a href={'#connect-message'}>
                                        Get in touch with us
                                    </a></h2>
                                    <form >

                                        <Row>
                                            <Col sm={6} className={"px-1"}>
                                                <input type={"text"} value={formDetails.name} placeholder={'Name'}
                                                    onChange={(e) => onFormUpdate('name', e.target.value)} />
                                            </Col>

                                            <br></br>
                                            <Col sm={6} className={"px-1 "}>
                                                <input type={"tel"} value={formDetails.phone} placeholder={'Phone no'}
                                                    onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                            </Col>
                                            <br></br>
                                            <Col sm={6} className={"px-1"}>
                                                <input type={"email"} value={formDetails.email} placeholder={'Email'}
                                                    onChange={(e) => onFormUpdate('email', e.target.value)} />
                                            </Col>
                                            <br></br>
                                            <Col sm={6} className={"px-1"}>
                                                <input type={"text"} value={formDetails.location} placeholder={'Location'}
                                                    onChange={(e) => onFormUpdate('location', e.target.value)} />
                                            </Col>
                                            <br></br>
                                            <Col sm={6} className={"px-1"}>
                                                <select value={formDetails.service} onChange={(e) => onFormUpdate('service', e.target.value)}>
                                                    <option value="Select a service">Select a service</option>
                                                    <option value="leak detection">Leak Detection</option>
                                                    <option value="roof restoration">Roof Restoration</option>
                                                    <option value="gutter and downpipe replace">Gutter and Downpipe Replacement</option>
                                                    <option value="gutter and downpipe cleaning">Gutter and Downpipe Cleaning</option>
                                                    <option value="roof clean and high pressure wash">Roof Cleaning and High Pressure Wash</option>
                                                    <option value="roof painting">Roof Painting</option>
                                                    <option value="fascia and barge board replace">Fascia and Barge Board Replacement</option>
                                                    <option value="gutter guards installation">Gutter Guards Installation</option>
                                                    <option value="pigeon mesh installation">Pigeon Mesh Installation</option>
                                                    <option value="flashing installation">Flashing Installation</option>

                                                </select>
                                                  
                                            </Col>



                                            <br></br>
                                            <Col sm={6} className={"p x-1"}>
                                                <textarea style={{ width: "100%" }} className={"p p x-1"} value={formDetails.message}
                                                    placeholder={'Description'}
                                                    id={'connect-message'}
                                                    onChange={(e) => onFormUpdate('message', e.target.value)} />
                                            </Col>
                                            <br></br>
                                            <Col sm={6} className={"p x-1"}>
                                                <button onClick={handleSubmit} type={'submit'}><span>{buttonText}</span></button>
                                            </Col>
                                            {
                                                status.message &&
                                                <Col>
                                                    <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                                </Col>
                                            }
                                        </Row>
                                    </form>
                                </div>
                            </motion.div>
                            : ""
                        }
                    </TrackVisibility>
                </Col>
            </Row>
        </Container>
    </section>)
}