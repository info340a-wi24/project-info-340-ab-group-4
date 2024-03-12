import React from 'react';
import { useState } from 'react';
import { ref, push, getDatabase, set } from 'firebase/database';
import './index.css';

function Form(){
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');

    const [email, setEmail] = useState('');
    const [phonum, setPhonum] = useState('');
    const [orgurl, setOrgurl] = useState('');
    
    const [pername, setPername] = useState('');
    const [bg, setBg] = useState('');
    
    const [tkurl, setTkurl] = useState('');
    const [poster, setPoster] = useState('');
    const [media, setMedia] = useState('');
    const [review1, setReview1] = useState('');
    const [review2, setReview2] = useState('');
    const [addinfo, setAddinfo] = useState('');

    const [showWarning, setShowWarning] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    
    const types = ["Play", "Musical", "Cabaret", "Concert", "Dance", "Other"];
    const people = ["small", "medium", "large"];
    const money = ["$", "$$", "$$$"];

    const valid = () => {
        if (eventName === '' || startDate === '' || endDate === '') {
            setShowWarning(true);
            document.getElementById('name').scrollIntoView();
            return false;
        }
        return true;
    };

    const subm = (vl) => {
        vl.preventDefault(); 
        if (valid()) {
            const eventRef = ref(getDatabase(), 'events');
            push (eventRef, {
                eventName: eventName,
                description: description,
                type: type,
                start: startDate,
                end: endDate,
                size: size,
                cost: price,
                venue: venue,
                address: address,

                email: email,
                phone: phonum,
                organizerLink: orgurl,

                PerformerName: pername,
                backgroundInfo: bg,

                TicketLink: tkurl,
                poster: poster,
                SocialMedia: media,
                reviewOne: review1,
                reviewTwo:review2,
                AdditionalInfo: addinfo,

            }).then(() => {
            setEventName('');
            setDescription('');
            setType('');
            setStartDate('');
            setEndDate('');
            setSize('');
            setPrice('');
            setVenue('');
            setAddress('');

            setEmail('');
            setPhonum('');
            setOrgurl('');
            
            setPername('');
            setBg('');

            setTkurl('');
            setPoster('');
            setMedia('');
            setReview1('');
            setReview2('');
            setAddinfo('');

            setSubmissionMessage('Your information has been successfully submitted!');
            window.scrollTo(0, 0);
        }).catch((error) => {
            console.error("Error", error);
        });
        }
    };

    //size === ''   price === ''

    return(
        <main>
            <section className="form">
                

                <h1>{submissionMessage || 'Shine on Our Stage'}</h1>
                <p id="com">{"Save the event to the calendar!"}</p>

        
                <form onSubmit={subm}>
                    <section className="part">
                        <h2 className="F1">Event Information</h2>

                        <div>
                            <p><label>Event Name: </label>
                            <input id="name" className="form-control" value={eventName} onChange={vl => setEventName(vl.target.value)} />
                            {showWarning && eventName === '' && <div style={{ color: 'red' }} className="warning">This field cannot be empty</div>}</p>
                        </div>

                        
                        <div>
                            <p><label>Description: </label> 
                            <input id="des" className="form-control" value={description} onChange={vl => setDescription(vl.target.value)} placeholder="A overview of this event"/></p>
                        </div>

                        <div>
                            <p style={{ color: "#B6433E" }} id='note' >Please type "Play", "Musical", "Cabaret", "Concert", "Dance" or "Other".</p>
                            <p><label>Performance Type: </label> 
                            <input id="type" className="form-control" value={type} onChange={vl => setType(vl.target.value)} placeholder="(e.g., dance, theater)."/>
                            {showWarning && !types.includes(type) && <div style={{ color: 'red' }} className="warning">This field is not valid, see the notes above, Note the capitalization</div>}</p>
                        </div>

                        
                        <div>
                            <p><label>Start Date: </label>
                            <input id="date_input1" className="form-control" type='date' value={startDate} onChange={vl => setStartDate(vl.target.value)} />
                            {showWarning && startDate === '' && <div style={{ color: 'red' }} className="warning">This field is not valid</div>}</p>
                        </div>

                        <div>
                            <p><label>End Date: </label>
                            <input id="date_input2" className="form-control" type='date' value={endDate} onChange={vl => setEndDate(vl.target.value)} />
                            {showWarning && endDate === '' && <div style={{ color: 'red' }} className="warning">This field is not valid</div>}</p>
                        </div>

                        <div>
                            <p style={{ color: "#B6433E" }} id='note'>Please type "small", "medium", or "large".</p>
                            <p><label>Audience size: </label> 
                            <input id="tsize" className="form-control" value={size} onChange={vl => setSize(vl.target.value)}/>
                            {showWarning && !people.includes(size) && <div style={{ color: 'red' }} className="warning">This field is not valid, see the notes above</div>}</p>
                        </div>

                        <div>
                            <p style={{ color: "#B6433E" }} id='note' >Please type "$", "$$", "$$$".</p>
                            <p><label>Ticket price: </label> 
                            <input id="tsize" className="form-control" value={price} onChange={vl => setPrice(vl.target.value)}/>
                            {showWarning && !money.includes(price) && <div style={{ color: 'red' }} className="warning">This field is not valid, see the notes above</div>}</p>
                        </div>

                        <div>
                            <p><label>Venue: </label>
                            <input id="venue_input" className="form-control" value={venue} onChange={vl => setVenue(vl.target.value)} /></p>
                        </div>

                        <div>
                            <p><label>Address: </label>
                            <input id="address_input" className="form-control" value={address} onChange={vl => setAddress(vl.target.value)} /></p>
                        </div>

                    </section>

                    <section className="part">
                        <h2 className="F2">Contact Information</h2>
                        <div>
                            <p><label for="email_input">Email: </label>
                            <input id="email_input" className="form-control" type="email" value={email} onChange={vl => setEmail(vl.target.value)} placeholder="email@domain.com" name="email"/></p>
                        </div>

                        <div>
                            <p><label for="phone_number">phone number: </label> 
                            <input id="phone_input" className="form-control" value={phonum} onChange={vl => setPhonum(vl.target.value)}/></p>
                        </div>

                        <div>
                            <p><label for="organizerURL">organizer: </label>
                            <input id="officeURL" className="form-control" value={orgurl} onChange={vl => setOrgurl(vl.target.value)}/></p>
                        </div>
                    </section>

                    <section className="part">
                        <h2 className="F3">Participant Information</h2>
                        <div>
                            <p><label id="Performer">Performer Name: </label> 
                            <input id="pername" className="form-control" value={pername} onChange={vl => setPername(vl.target.value)}/></p>
                        </div>

                        <div>
                            <p><label id="BgInfo">Background Information: </label> 
                            <input id="intro" className="form-control" value={bg} onChange={vl => setBg(vl.target.value)}/></p>
                        </div>
                    </section>

                    <section className="part">
                    <h2 className="F4">Additional Information</h2>
                        <div>
                            <p><label for="OfficialTicketLink">Official Ticket Link: </label> 
                            <input id="tkURL" className="form-control" value={tkurl} onChange={vl => setTkurl(vl.target.value)} placeholder="URL"/></p>
                        </div>

                        <div>
                            <p><label for="Poster/Image">Poster: </label> 
                            <input id="poster" type="file" accept="image/*" className="form-control" value={poster} onChange={vl => setPoster(vl.target.value)}/></p>
                        </div>

                        <div>
                            <p><label for="SocialMedia">Poster description: </label> 
                            <input id="medialink" className="form-control" value={media} onChange={vl => setMedia(vl.target.value)}/></p>
                        </div>

                        <div>
                            <p><label for="notes">Review 1: </label> 
                            <input id="review1" className="form-control" value={review1} onChange={vl => setReview1(vl.target.value)} placeholder="Any comments?"/></p>
                        </div>

                        <div>
                            <p><label for="notes">Review 2: </label> 
                            <input id="review2" className="form-control" value={review2} onChange={vl => setReview2(vl.target.value)}/></p>
                        </div>

                        <div>
                            <p><label for="notes">Additional Info: </label> 
                            <input id="addinfo" className="form-control" value={addinfo} onChange={vl => setAddinfo(vl.target.value)} placeholder="More Information"/></p>
                        </div>

                    </section>
                    <button type="submit"><i alt="Submit">Submit</i></button>
                </form>
            </section>
        </main>
    )
}
export default Form;
