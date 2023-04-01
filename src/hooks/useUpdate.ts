import { useState }         from "react";

export default function useUpdate() {
	const [ Dummy, setDummy ] = useState( false );
	return () => setDummy( Current => !Current );
}