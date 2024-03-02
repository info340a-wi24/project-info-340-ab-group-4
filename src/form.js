import React from 'react';
import { useState } from 'react';

function Form(){
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [location, setLocation] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const valid = () => {
        if (!eventName || !eventDate || !startTime) {
            setShowWarning(true);
            document.getElementById('name').scrollIntoView();
            return false;
        }
        return true;
    };

    const subm = (vl) => {
        vl.preventDefault(); 
        if (valid()) {
            setEventName('');
            setEventDate('');
            setStartTime('');
            setSubmissionMessage('Your information has been successfully submitted!');
            window.scrollTo(0, 0);
        }
    };

    return(
        <main>
            <section className="form">
                

                <h1>{submissionMessage || 'Shine on Our Stage'}</h1>
                <p id="com">{"Don't let any performance go unnoticed"}</p>

        
                <form onSubmit={subm}>
                    <section className="part">
                        <h2 className="F1">Event Information</h2>

                        <div>
                        <label>Event Name:</label>
                        <input id="name" className="form-control" value={eventName} onChange={vl => setEventName(vl.target.value)} />
                        {showWarning && !eventName && <div style={{ color: 'red' }} className="warning">This field cannot be empty</div>}
                        </div>

                        
                        <div>
                            <p><label for="EventDes">Description:</label> <input id="des" placeholder="A overview of this event"/></p>
                            <p><label for="Type:">Performance Type:</label> <input id="type" placeholder="(e.g., dance, theater)."/></p>
                        </div>

                        
                        <div>
                            <label>Event Date:</label>
                            <input id="date_input" className="form-control" type='date' value={eventDate} onChange={vl => setEventDate(vl.target.value)} />
                            {showWarning && !eventDate && <div style={{ color: 'red' }} className="warning">This field is not valid</div>}
                        </div>

                        <div>
                            <label>Start Time:</label>
                            <input id="time_input1" className="form-control" type='time' value={startTime} onChange={vl => setStartTime(vl.target.value)} />
                            {showWarning && !startTime && <div style={{ color: 'red' }} className="warning">This field is not valid</div>}
                        </div>


                        <div>
                            <p><label for="ETime">End Time:</label> <input id="time_input2" type="time" className="form-control"/><div id="timewarning2" className="warning"></div></p>
                        </div>

                        <div>
                            <label>Location:</label>
                            <input id="loca_input" className="form-control" value={location} onChange={vl => setLocation(vl.target.value)} />
                        </div>

                    </section>

                    <section className="part">
                        <h2 className="F2">Contact Information</h2>
                        <div>
                            <p><label for="email_input">Email:</label> <input id="email_input" type="email" placeholder="email@domain.com" name="email"/></p>
                            <p><label for="phone_number">phone number:</label> <input id="phone_input"/></p>
                            <p><label for="organizerURL">Link to organizer:</label><input id="officeURL" placeholder="Official website link"/></p>
                        </div>
                    </section>

                    <section className="part">
                        <h2 className="F3">Participant Information</h2>
                        <div>
                            <p><label id="Performer">Performer Name:</label> <input id="pername"/></p>
                            <p><label id="BgInfo">Background Information:</label> <input id="intro"/></p>
                        </div>
                    </section>

                    <section className="part">
                    <h2 className="F4">Additional Information</h2>
                        <div>
                            <p><label for="OfficialTicketLink">Official Ticket Link</label> <input id="tkURL" placeholder="URL"/></p>
                            <p><label for="Poster/Image">Poster:</label> <input id="poster" type="file" accept="image/*"/></p>
                            <p><label for="SocialMedia">Social Media Links:</label> <input id="medialink" placeholder="URL"/></p>
                            <p><label for="notes">Additional Info:</label> <input id="addinfo" placeholder="More Information"/></p>
                        </div>
                    </section>
                    <button type="submit"><i aria-label="Submit">Submit</i></button>
                </form>
            </section>
        </main>
    )
}
export default Form;
