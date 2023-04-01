import {
	useEffect,
	useState
} from "react";

export interface IUseLocalStorage<T> {
	// Get the storage value
	Storage: T,
	// Set the storage value
	SetStorage: ( Value: T ) => void,
	// Reset the storage to default
	ResetStorage: () => void
}

export default function useLocalStorage<T = any>( Key : string, InitValue : T ): IUseLocalStorage<T> {
	const [ Storage, setStorage ] = useState( () => {
		const LocalStorageValue = window.localStorage.getItem( Key );

		if( LocalStorageValue ) {
			if( typeof InitValue === "object" ) {
				const Storage = {
					...InitValue,
					...JSON.parse( LocalStorageValue )
				}

				window.localStorage.setItem( Key, JSON.stringify( Storage ) );
				return Storage;
			}

			return LocalStorageValue;
		}

		window.localStorage.setItem( Key, JSON.stringify( InitValue ) );
		return InitValue;
	} );

	// update if storage was updated
	useEffect( () => {
		const Event = (e: StorageEvent) => {
			if( e.newValue !== Storage && e.key === Key ) {
				if( typeof InitValue === "object" && e.newValue ) {
					setStorage( (Current: T) => JSON.parse( e.newValue! ) );
					return;
				}
				setStorage( e.newValue );
			}
		}

		window.addEventListener("storage", Event);

		return () => {
			window.removeEventListener( "storage", Event );
		}
	}, [] )

	const SetStorage = ( Value : T ) => {
		window.localStorage.setItem( Key, JSON.stringify( Value ) );
		setStorage( Value );
	}

	const ResetStorage = () => {
		window.localStorage.removeItem( Key );
		setStorage( "" );
	}

	return {
		Storage: Storage,
		SetStorage: SetStorage,
		ResetStorage: ResetStorage
	};
}