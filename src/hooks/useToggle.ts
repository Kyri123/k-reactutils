import {
	useEffect,
	useState
}                      from "react";
import copytoclipboard from "copy-to-clipboard";

/**
 * Toggle hook to toggle a boolean.
 * Good for modals or something like that
 */
export function useToggle( InitValue: boolean ) {
	const [ Boolean, setBoolean ] = useState<boolean>( InitValue );
	const Toggle = () => setBoolean( Current => !Current );

	return [ Boolean, Toggle ];
}