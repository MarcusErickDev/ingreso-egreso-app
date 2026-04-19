import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI COMPONENT] Is Loading');
export const stopLoading = createAction('[UI COMPONENT] Stop Loading');