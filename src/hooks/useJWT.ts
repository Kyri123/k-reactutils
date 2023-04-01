import useLocalStorage from "./useLocalStorage";
import {
	useEffect,
	useState
} from "react";
import jwt_decode from "jwt-decode";

export interface JwtSession {
	[key: string]: any;
	iss?: string | undefined;
	sub?: string | undefined;
	aud?: string | string[] | undefined;
	exp?: number | undefined;
	nbf?: number | undefined;
	iat?: number | undefined;
	jti?: string | undefined;
}

export default function useJWT<T = any & JwtSession>( StorageKey: string ) {
	const { Storage, SetStorage, ResetStorage } = useLocalStorage<string>( StorageKey, "" );
	const [ Session, setSession ] = useState< T & JwtSession | undefined >( undefined );

	useEffect( () => {
		try {
			const Decode: T & JwtSession = jwt_decode( Storage.split( Storage )[ 1 ] );
			setSession( current => Decode );
			return;
		}
		catch( e ) { console.warn( e ) }
		setSession( undefined );
	}, [ Storage ] )

	const SessionActive = () => {
		return SecondsLeft() > 0;
	}

	const SecondsLeft = () => {
		return Math.max( ( Session?.exp || 0 ) - Math.trunc( Date.now() / 1000 ), 0 );
	}

	return {
		Token: Storage,
		UpdateToken: SetStorage,
		SecondsLeft,
		SessionActive,
		Session,
		ClearSession: ResetStorage
	}
}