import { useToggle } from "./useToggle";

export default function useUpdate() {
	const [ undefined, Toggle ] = useToggle( false );
	return Toggle;
}