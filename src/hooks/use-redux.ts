import type { AppDispatch, RootState } from '@store';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Пользовательский хук для диспетчера, что бы подцепить типы.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
/**
 * Пользовательский хук для селектора, что бы подцепить типы.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
