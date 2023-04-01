import { useState }         from "react";

export default function useUpdate() {
	const [ undefined, setDummy ] = useState( false );
	return () => setDummy( Current => !Current );
}