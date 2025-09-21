interface InputProps{
    placeholder:string,
    referance?:any
}

export function Input({placeholder, referance}:InputProps){
    
    return <div>
        <input ref={referance} placeholder={placeholder} type="text" className="px-4 py-2 border rounded-3xl m-2 w-full max-w-sm">
        </input>
    </div>
}