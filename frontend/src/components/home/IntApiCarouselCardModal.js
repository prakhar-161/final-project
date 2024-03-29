//Native imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


//External imports
import Button from "react-bootstrap/Button";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { AiOutlineArrowUp, AiOutlineFileText } from 'react-icons/ai';
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineToday } from "react-icons/md";


//Internal imports
import "../../styles/carousel.scss";
import Contact from "./ContactForm";
import { MyContext } from "../../Context/Context"


export default function IntApiCarouselCardModal({ job }) {
    const navigate = useNavigate();
    const { isFreelancerLogin } = useContext(MyContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showContact, setShowContact] = useState(false);
    const toggleShowContact = () => setShowContact(!showContact);

    function redirectToLogin() {
        navigate("/freelancer-login")
    }

    let CharLimitCompanyCarousel = 30;
    let CharLimitTitleCarousel = 20;

    let CharLimitCompanyModal = 50
    let CharLimitTitleModal = 100;
    let CharLimitDescriptionModal = 500;

    return (
        <div className="carousel-card">
            <h5>
                {" "}
                {job.job_Title.slice(0, CharLimitTitleCarousel) +
                    (job.job_Title.length > CharLimitTitleCarousel ? "..." : "")}
            </h5>
            <p> {job.num_of_people_needed} open position(s)</p>
            <p>
                posted{" "}
                {moment(
                    new Date(job.issued_At.slice(0, 10) * 1000).toGMTString()
                ).fromNow()}
            </p>

            <p>
                by{" "}
                <strong>
                    {" "}
                    {job.created_by.company_Name.slice(0, CharLimitCompanyCarousel) +
                        (job.created_by.company_Name.length > CharLimitCompanyCarousel
                            ? "..."
                            : "")}{" "}
                </strong>
            </p>

            <div className="text-center">
                <Button
                    variant="secondary"
                    size="md"
                    onClick={handleShow}
                >
                    Details <AiOutlineArrowUp />
                </Button>

            </div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title>
                        <h3> {job.job_Title.slice(0, CharLimitTitleModal) +
                            (job.job_Title.length > CharLimitTitleModal ? "..." : "")}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showContact ||
                        <>
                            <p>< AiOutlineFileText />  <strong>Job description:</strong>  {job.job_description.slice(0, CharLimitDescriptionModal) +
                                (job.job_description.length > CharLimitDescriptionModal ? "..." : "")}
                            </p>
                            <p>
                                <BsFillPersonFill />  <strong>Open positions:</strong> {job.num_of_people_needed}
                            </p>
                            <p>
                                <MdOutlineToday />  <strong>Posted:</strong> {moment(
                                    new Date(job.issued_At.slice(0, 10) * 1000).toGMTString()
                                ).fromNow()}
                            </p>
                            <p>
                                <HiOutlineOfficeBuilding />  <strong>Company:</strong> {job.created_by.company_Name.slice(0, CharLimitCompanyModal) +
                                    (job.created_by.company_Name.length > CharLimitCompanyModal ? "..." : "")}
                            </p>
                        </>
                    }

                    <div className="text-center m-2">

                        {isFreelancerLogin ? (
                            <Button onClick={toggleShowContact} variant="secondary  col-6"  >
                                {showContact ? "Return to job description" : "Contact"}
                            </Button>
                        ) :

                            <Button onClick={redirectToLogin} variant="secondary  col-6"
                            >You should be logged to contact this company.
                            </Button>


                        }

                    </div>
                </Modal.Body>

                {showContact && <Contact job={job} />}
            </Modal>
        </div>
    )
}
