import './PopUpBook.css';
import {AiFillCloseCircle,} from 'react-icons/ai';


function PopUpConfirm(props) {
    return (props.trigger) ? (

        <div className="popup">
            <div className="popup-inner">
                <button className="popup-btn" onClick={() => props.setTrigger(false)}>< AiFillCloseCircle /></button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default PopUpConfirm;