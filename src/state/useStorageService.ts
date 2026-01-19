import { useEffect, useRef } from "react";
import { storageService } from "../domain/storage-service";

export function useStorageService<T>(key: string, stateValue: T, setStateValue: (value: T) => void) {
	const isFirstRender = useRef(true);

	// Load from localStorage on mount
	useEffect(() => {
		const storedValue = storageService.getItem<T>(key);
		if (storedValue !== null) {
			setStateValue(storedValue);
		}
	}, [key, setStateValue]);

	// Save to localStorage when state changes (skip first render)
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		storageService.setItem<T>(key, stateValue);
	}, [key, stateValue]);
}