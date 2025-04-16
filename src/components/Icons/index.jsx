const ControlStyle = {
  cursor: 'pointer',
  fill: '#bababa',
  height: '1.15em',
  verticalAlign: '-.125em',
  transformOrigin: 'center',
  overflow: 'visible',
};


const SongExtraControlStyle = {
  ...ControlStyle,
  height: '1.2em',
  maxWidth: 17,
};

export const AlbumIcon = (props) => (
    <svg
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      className='hoverable-icon expand-icon'
      style={SongExtraControlStyle} // Đảm bảo SongExtraControlStyle được định nghĩa trước
    >
      <path d='M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'></path>
      <path d='M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z'></path>
    </svg>
  );
  
  export const ArtistIcon = (props) => (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="hoverable-icon expand-icon"
      style={SongExtraControlStyle} // Đảm bảo SongExtraControlStyle đã được định nghĩa ở đâu đó trong mã của bạn
    >
      <path d="M11.757 2.987A4.356 4.356 0 0 0 7.618 0a4.362 4.362 0 0 0-4.139 2.987 5.474 5.474 0 0 0-.22 1.894 5.604 5.604 0 0 0 1.4 3.312l.125.152a.748.748 0 0 1-.2 1.128l-2.209 1.275A4.748 4.748 0 0 0 0 14.857v1.142h8.734A5.48 5.48 0 0 1 8.15 14.5H1.517a3.245 3.245 0 0 1 1.6-2.454l2.21-1.275a2.25 2.25 0 0 0 .6-3.386l-.128-.153a4.112 4.112 0 0 1-1.05-2.44A4.053 4.053 0 0 1 4.89 3.47a2.797 2.797 0 0 1 1.555-1.713 2.89 2.89 0 0 1 3.293.691c.265.296.466.644.589 1.022.12.43.169.876.144 1.322a4.12 4.12 0 0 1-1.052 2.44l-.127.153a2.239 2.239 0 0 0-.2 2.58c.338-.45.742-.845 1.2-1.173 0-.162.055-.32.156-.447l.126-.152a5.598 5.598 0 0 0 1.4-3.312 5.499 5.499 0 0 0-.218-1.894zm3.493 3.771a.75.75 0 0 0-.75.75v3.496h-1a2.502 2.502 0 0 0-2.31 1.542 2.497 2.497 0 0 0 1.822 3.406A2.502 2.502 0 0 0 16 13.502V7.508a.75.75 0 0 0-.75-.75zm-.75 6.744a.998.998 0 0 1-1.707.707 1 1 0 0 1 .707-1.706h1v1z"></path>
    </svg>
  );

  export const DeleteIcon = (props) => (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="hoverable-icon expand-icon"
      style={SongExtraControlStyle} // Đảm bảo SongExtraControlStyle đã được định nghĩa đúng
    >
      <path d="M5.25 3v-.917C5.25.933 6.183 0 7.333 0h1.334c1.15 0 2.083.933 2.083 2.083V3h4.75v1.5h-.972l-1.257 9.544A2.25 2.25 0 0 1 11.041 16H4.96a2.25 2.25 0 0 1-2.23-1.956L1.472 4.5H.5V3h4.75zm1.5-.917V3h2.5v-.917a.583.583 0 0 0-.583-.583H7.333a.583.583 0 0 0-.583.583zM2.986 4.5l1.23 9.348a.75.75 0 0 0 .744.652h6.08a.75.75 0 0 0 .744-.652L13.015 4.5H2.985z"></path>
    </svg>
  );
  
  export const AddToQueueIcon = (props) => (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="hoverable-icon expand-icon"
      style={SongExtraControlStyle} // Đảm bảo SongExtraControlStyle đã được định nghĩa đúng
    >
      <path d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z"></path>
    </svg>
  );
  
  export const AddToPlaylist = (props) => (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="hoverable-icon expand-icon"
      style={SongExtraControlStyle} // Đảm bảo SongExtraControlStyle đã được định nghĩa đúng
    >
      <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
    </svg>
  );

  export const AddToLibrary = (props) => (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="#b3b3b3"
      fill="#b3b3b3"
      strokeWidth="0"
      className="hoverable-icon"
      {...props} // Spread các props khác nếu có
    >
      <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"></path>
      <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"></path>
    </svg>
  );
  
  export const AddedToLibrary = (props) => (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="#1cb955"
      fill="#1cb955"
      strokeWidth="0"
      {...props} // Spread các props khác nếu có
    >
      <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"></path>
    </svg>
  );

export const FollowIcon = (props) => {
  return (
    <svg
      {...props}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      className='hoverable-icon expand-icon'
      style={SongExtraControlStyle}
    >
      <path d='M4.765 1.423c-.42.459-.713.992-.903 1.554-.144.421-.264 1.173-.22 1.894.077 1.321.638 2.408 1.399 3.316v.002l.083.098c.611.293 1.16.696 1.621 1.183a2.244 2.244 0 0 0-.426-2.092l-.127-.153-.002-.001c-.612-.73-.997-1.52-1.051-2.442-.032-.54.066-1.097.143-1.323a2.85 2.85 0 0 1 .589-1.022 2.888 2.888 0 0 1 4.258 0c.261.284.456.628.59 1.022.076.226.175.783.143 1.323-.055.921-.44 1.712-1.052 2.442l-.002.001-.127.153a2.25 2.25 0 0 0 .603 3.39l2.209 1.275a3.248 3.248 0 0 1 1.605 2.457h-5.99a5.466 5.466 0 0 1-.594 1.5h8.259l-.184-1.665a4.75 4.75 0 0 0-2.346-3.591l-2.209-1.275a.75.75 0 0 1-.201-1.13l.126-.152h.001c.76-.909 1.32-1.995 1.399-3.316.043-.721-.077-1.473-.22-1.894a4.46 4.46 0 0 0-.644-1.24v-.002h-.002a4.388 4.388 0 0 0-6.728-.312zM2 12.5v-2h1.5v2h2V14h-2v2H2v-2H0v-1.5h2z'></path>
    </svg>
  );
};

export const UnfollowIcon = (props) => {
  return (
    <svg
      {...props}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      fill='#1ed760'
      className='hoverable-icon expand-icon'
      style={SongExtraControlStyle}
    >
      <path d='M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z'></path>
    </svg>
  );
};

export const EditIcon = (props) => {
  return (
    <svg
      {...props}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      className='hoverable-icon expand-icon'
      style={SongExtraControlStyle}
    >
      <path d='M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z'></path>
    </svg>
  );
};

export const CloseIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={{ ...ControlStyle, height: '1.2rem' }}
  >
    <path d='M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z'></path>
  </svg>
  );
};

export const ActiveHomeIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='#fff'
    fill='#fff'
    strokeWidth='0'
  >
    <path d='M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z'></path>
  </svg>
  );
};

export const ActiveMessageIcon = () => (
  <svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#fff"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);



export const BrowseIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='#b3b3b3'
    fill='#b3b3b3'
    strokeWidth='0'
    className='hoverable-icon'
  >
    <path d='M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z'></path>
    <path d='M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z'></path>
  </svg>
  );
};

export const HomeIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='#b3b3b3'
    fill='#b3b3b3'
    strokeWidth='0'
  >
    <path d='M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z'></path>
  </svg>
  );
};

export const MessageIcon = () => (
  <svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="#b3b3b3"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);



export const SearchIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='#b3b3b3'
    fill='#b3b3b3'
    strokeWidth='0'
    {...props}
  >
    <path d='M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z'></path>
  </svg>
  );
};

export const AddIcon = (props) => {
  return (
    <svg
      {...props}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      fill='#1ed760'
      className='hoverable-icon expand-icon'
      style={SongExtraControlStyle}
    >
      <path d='M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z'></path>
    </svg>
  );
};

export const NewPlaylistIcon = (props) => {
  return (
    <svg
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      fill='#1ed760'
      className='hoverable-icon expand-icon'
      style={SongExtraControlStyle}
    >
      <path d='M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z'></path>
    </svg>
  );
};

export const LibraryCollapsedIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    width='25'
    height='25'
    aria-hidden='true'
    viewBox='0 0 24 24'
    stroke='#b3b3b3'
    fill='#b3b3b3'
    strokeWidth='0'
    className='hoverable-icon'
  >
    <path d='M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z'></path>
  </svg>
  );
};

export const LibraryIcon = (props) => {
  return (
<svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='#b3b3b3'
    fill='#b3b3b3'
    strokeWidth='0'
    className='hoverable-icon'
  >
    <path d='M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z'></path>
  </svg>
  );
};

export const SpeakerIcon = (props) => {
  return (
<svg {...props} data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16'>
    <path d='M10.016 1.125A.75.75 0 0 0 8.99.85l-6.925 4a3.639 3.639 0 0 0 0 6.299l6.925 4a.75.75 0 0 0 1.125-.65v-13a.75.75 0 0 0-.1-.375zM11.5 5.56a2.75 2.75 0 0 1 0 4.88V5.56z'></path>
    <path d='M16 8a5.752 5.752 0 0 1-4.5 5.614v-1.55a4.252 4.252 0 0 0 0-8.127v-1.55A5.752 5.752 0 0 1 16 8z'></path>
  </svg>
  );
};


export const CloseIcon2 = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={{ ...ControlStyle, height: '0.75rem' }}
  >
    <path d='M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z'></path>
  </svg>
  );
};


export const GridIcon = (props) => {
  return (
<svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    fill='#1ed760'
    className='hoverable-icon expand-icon'
    style={{ ...SongExtraControlStyle, ...(props.style || {}) }}
  >
    <path d='M1 1h6v6H1V1zm1.5 1.5v3h3v-3h-3zM1 9h6v6H1V9zm1.5 1.5v3h3v-3h-3zM9 1h6v6H9V1zm1.5 1.5v3h3v-3h-3zM9 9h6v6H9V9zm1.5 1.5v3h3v-3h-3z'></path>
  </svg>
  );
};


export const OrderCompactIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={{ ...ControlStyle, height: '1.2rem', ...(props.style || {}) }}
  >
    <path d='M15.5 13.5H.5V12h15v1.5zm0-4.75H.5v-1.5h15v1.5zm0-4.75H.5V2.5h15V4z'></path>
  </svg>
  );
};

export const OrderListIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={{ ...ControlStyle, height: '1.2rem', ...(props.style || {}) }}
  >
    <path d='M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z'></path>
  </svg>
  );
};

export const WorldIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={{ ...ControlStyle, height: '1.2rem' }}
  >
    <path d='M8.152 16H8a8 8 0 1 1 .152 0zm-.41-14.202c-.226.273-.463.713-.677 1.323-.369 1.055-.626 2.496-.687 4.129h3.547c-.06-1.633-.318-3.074-.687-4.129-.213-.61-.45-1.05-.676-1.323-.194-.235-.326-.285-.385-.296h-.044c-.055.007-.19.052-.391.296zM4.877 7.25c.062-1.771.34-3.386.773-4.624.099-.284.208-.554.329-.806a6.507 6.507 0 0 0-4.436 5.43h3.334zm-3.334 1.5a6.507 6.507 0 0 0 4.436 5.43 7.974 7.974 0 0 1-.33-.806c-.433-1.238-.71-2.853-.772-4.624H1.543zm4.835 0c.061 1.633.318 3.074.687 4.129.214.61.451 1.05.677 1.323.202.244.336.29.391.297l.044-.001c.06-.01.19-.061.385-.296.226-.273.463-.713.676-1.323.37-1.055.626-2.496.687-4.129H6.378zm5.048 0c-.061 1.771-.339 3.386-.772 4.624-.082.235-.171.46-.268.674a6.506 6.506 0 0 0 4.071-5.298h-3.03zm3.031-1.5a6.507 6.507 0 0 0-4.071-5.298c.097.214.186.44.268.674.433 1.238.711 2.853.772 4.624h3.031z'></path>
  </svg>
  );
};

export const Pause = (props) => {
  return (
<svg
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    data-encore-id='icon'
    style={{ ...ControlStyle, fill: 'black' }}
  >
    <path d='M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
  </svg>
  );
};

export const Play = (props) => {
  return (
    <svg
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    data-encore-id='icon'
    style={{ ...ControlStyle, fill: 'black' }}
  >
    <path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z'></path>
  </svg>
  );
};

export const Replay = (props) => {
  const { active, ...otherProps } = props;

  return (
    <svg
      {...otherProps}
      style={ControlStyle}
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      data-encore-id='icon'
      className={`hoverable-icon replay ${active ? 'active' : ''}`}
    >
      <path d='M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z'></path>
    </svg>
  );
};

export const ReplayOne = (props) => {
  const { active, ...otherProps } = props;

  return (
    <svg
      {...otherProps}
      style={ControlStyle}
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      data-encore-id='icon'
      className={`hoverable-icon replay ${active ? 'active' : ''}`}
    >
      <path d='M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5ZM12.25 2.5a2.25 2.25 0 0 1 2.25 2.25v5A2.25 2.25 0 0 1 12.25 12H9.81l1.018-1.018a.75.75 0 0 0-1.06-1.06L6.939 12.75l2.829 2.828a.75.75 0 1 0 1.06-1.06L9.811 13.5h2.439A3.75 3.75 0 0 0 16 9.75v-5A3.75 3.75 0 0 0 12.25 1h-.75v1.5h.75Z'></path>
      <path d='m8 1.85.77.694H6.095V1.488c.697-.051 1.2-.18 1.507-.385.316-.205.51-.51.583-.913h1.32V8H8V1.85Z'></path>
      <path d='M8.77 2.544 8 1.85v.693h.77Z'></path>
    </svg>
  );
};

export const ShuffleIcon = (props) => {
  const { active, ...otherProps } = props;
  return (
    <svg
      {...otherProps}
      style={ControlStyle}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      className={`hoverable-icon replay ${active ? 'active' : ''}`}
    >
      <path d='M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z'></path>
      <path d='m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z'></path>
    </svg>
  );
};

export const SkipBack = (props) => {
  return (
    <svg
    style={ControlStyle}
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon'
  >
    <path d='M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z'></path>
  </svg>
  );
};

export const Clock = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    style={SongExtraControlStyle}
  >
    <path d='M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'></path>
    <path d='M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z'></path>
  </svg>
  );
};

export const SkipNext = (props) => {
  return (
    <svg
      style={ControlStyle}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      className='hoverable-icon'
    >
      <path d='M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z'></path>
    </svg>
  );
};

export const VolumeIcon = (props) => {
  return (
<svg
    data-encore-id='icon'
    role='presentation'
    aria-label='Volumen alto'
    aria-hidden='true'
    id='volume-icon'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={SongExtraControlStyle}
  >
    <path d='M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z'></path>
    <path d='M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z'></path>
  </svg>
  );
};

export const VolumeMuteIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='presentation'
    aria-label='Volumen apagado'
    aria-hidden='true'
    id='volume-icon'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={SongExtraControlStyle}
  >
    <path d='M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z'></path>
    <path d='M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z'></path>
  </svg>
  );
};

export const VolumeOneIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='presentation'
    aria-label='Volumen bajo'
    aria-hidden='true'
    id='volume-icon'
    className='hoverable-icon'
    style={SongExtraControlStyle}
  >
    <path d='M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z'></path>
  </svg>
  );
};

export const VolumeTwoIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='presentation'
    aria-label='Volumen medio'
    aria-hidden='true'
    id='volume-icon'
    className='hoverable-icon'
    style={SongExtraControlStyle}
  >
    <path d='M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z'></path>
  </svg>
  );
};

export const ExpandOutIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 24 24'
    className='hoverable-icon expand-icon'
    style={SongExtraControlStyle}
  >
    <path d='M21.707 2.293a1 1 0 0 1 0 1.414L17.414 8h1.829a1 1 0 0 1 0 2H14V4.757a1 1 0 1 1 2 0v1.829l4.293-4.293a1 1 0 0 1 1.414 0zM2.293 21.707a1 1 0 0 1 0-1.414L6.586 16H4.757a1 1 0 0 1 0-2H10v5.243a1 1 0 0 1-2 0v-1.829l-4.293 4.293a1 1 0 0 1-1.414 0z'></path>
  </svg>
  );
};

export const DetailsIcon = (props) => {
  const { active, ...otherProps } = props;
  return (
    <svg
      {...otherProps}
      style={SongExtraControlStyle}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      className={`hoverable-icon replay ${active ? 'active' : ''}`}
    >
      <path d='M11.196 8 6 5v6l5.196-3z'></path>
      <path d='M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z'></path>
    </svg>
  );
};

export const DeviceIcon = (props) => {
  return (
    <svg
      data-encore-id='icon'
      role='presentation'
      aria-hidden='true'
      style={SongExtraControlStyle}
      viewBox='0 0 16 16'
      className={`hoverable-icon replay ${props.active ? 'active' : ''}`}
    >
      <path d='M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z'></path>
      <path d='M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'></path>
    </svg>
  );
};

export const ExpandIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon expand-icon'
    style={SongExtraControlStyle}
  >
    <path d='M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z'></path>
  </svg>
  );
};

export const ListIcon = (props) => {
  const { active, ...otherProps } = props;
  return (
    <svg
      {...otherProps}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      style={SongExtraControlStyle}
      className={`hoverable-icon replay ${active ? 'active' : ''}`}
    >
      <path d='M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z'></path>
    </svg>
  );
};


export const MicrophoneIcon = (props) => {
  return (
    <svg
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='hoverable-icon'
    style={SongExtraControlStyle}
  >
    <path d='M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z'></path>
  </svg>
  );
};

export const PhoneIcon = (props) => {
  return (
    <svg
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      style={SongExtraControlStyle}
      className={`hoverable-icon replay ${props.active ? 'active' : ''}`}
    >
      <path d='M8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'></path>
      <path d='M4.75 0A1.75 1.75 0 0 0 3 1.75v12.5c0 .966.784 1.75 1.75 1.75h6.5A1.75 1.75 0 0 0 13 14.25V1.75A1.75 1.75 0 0 0 11.25 0h-6.5zM4.5 1.75a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25V1.75z'></path>
    </svg>
  );
};

export const LaptopIcon = (props) => {
  return (
    <svg
      data-encore-id='icon'
      role='presentation'
      aria-hidden='true'
      style={SongExtraControlStyle}
      viewBox='0 0 16 16'
      className={`hoverable-icon replay ${props.active ? 'active' : ''}`}
      {...props}
    >
      <path d='M0 21a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1zM3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5zm3-1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6z'></path>
    </svg>
  );
};


export const MobileIcon = (props) => {
  return (
    <svg
      data-encore-id='icon'
      role='presentation'
      aria-hidden='true'
      style={SongExtraControlStyle}
      viewBox='0 0 16 16'
      className={`hoverable-icon replay ${props.active ? 'active' : ''}`}
      {...props}
    >
      <path d='M5 5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5zm3-1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8z'></path>
      <path d='M13.25 16.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z'></path>
    </svg>
  );
};
  
export const MenuIcon = (props) => {
  return (
    <svg
      {...props}
      data-encore-id='icon'
      role='img'
      aria-hidden='true'
      viewBox='0 0 16 16'
      className='hoverable-icon expand-icon'
      style={SongExtraControlStyle}
    >
      <path d='M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'></path>
    </svg>
  );
};
