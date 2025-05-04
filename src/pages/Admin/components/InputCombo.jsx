const InputCombo = ({ type, label, placeholder, name, value, onChange }) => {
    return (
        <div className="w-full px-6 mb-2">
            <label for={name}>{label}</label>
            <input 
                className={`bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`} 
                type={type} 
                placeholder={placeholder} 
                name={name} 
                value={value}
                onChange={onChange} />
        </div>
    );
};

export default InputCombo;
