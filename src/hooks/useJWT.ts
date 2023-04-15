import { useLocalStorage }        from "./useLocalStorage";
import {
	useEffect,
	useState
}                                 from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";

export function useJWT<T = any & JwtPayload>( StorageKey : string ) {
	const { Storage, SetStorage, ResetStorage } = useLocalStorage( StorageKey, "" );

	const DecodedToken = () : ( T & JwtPayload | undefined ) => {
		try {
			return jwt_decode( Storage.split( Storage )[ 1 ] );
		}
		catch ( e ) {
			console.warn( e );
		}
		return undefined;
	};

	const [ Session, setSession ] = useState( DecodedToken );

	useEffect( () => {
		setSession( DecodedToken );
	}, [ Storage ] );

	const GetRaw = () : T | undefined => {
		if ( !Session ) {
			return Session;
		}

		let RawSession = { ...Session };

		delete RawSession.exp;
		delete RawSession.aud;
		delete RawSession.iat;
		delete RawSession.iss;
		delete RawSession.nbf;
		delete RawSession.jti;
		delete RawSession.sub;

		return RawSession;
	};

	const SecondsLeft = () => {
		return Math.max( ( Session?.exp || 0 ) - Math.trunc( Date.now() / 1000 ), 0 );
	};

	const SessionActive = () => {
		return SecondsLeft() > 0;
	};

	return {
		Token: Storage,
		UpdateToken: SetStorage,
		SecondsLeft,
		SessionActive,
		Session,
		ClearSession: ResetStorage,
		GetRawSession: GetRaw
	};
}