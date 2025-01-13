import './css/Header.css';

export default function Header ({canLocate, iconUrl, currentLocation, setEditMode, editMode, setInfoMode, infoMode}) {
    return (
    <header>
        <div className="left">
            <img src={iconUrl} />
            <span>{currentLocation.city} </span>
            {canLocate ? 
                (<></>) 
                : 
                (<svg style={{marginLeft: '5px', marginTop: '-10px'}}  xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#D9D9D9"><path d="M516-120 402-402 120-516v-56l195-73-203-203 57-57 736 736-57 57-203-203-73 195h-56Zm191-361-63-63 60-160-160 60-63-63 359-133-133 359ZM542-268l41-109-206-206-109 41 196 78 78 196Zm52-326ZM480-480Z"/></svg>)
            }
        </div>
        <div className="right">
            
            <button className={editMode ?  "edit-location active" : "edit-location"} onClick={() => setEditMode(!editMode)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M340-420h58l156-157-57-57-157 156v58Zm243-186 28-28q5-5 5-10.5t-5-10.5l-36-36q-5-5-10.5-5t-10.5 5l-28 28 57 57ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
            </button>
            <button className={infoMode ? "info active" : "info"} onClick={() => setInfoMode(!infoMode)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </button>
        </div>
    </header>
    );
}