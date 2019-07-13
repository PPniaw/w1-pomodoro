import { createAction } from 'redux-actions';

export const addMission = createAction('ADD_MISSION', newMissionName => ({ newMissionName }));
export const finishMission = createAction('FINISH_MISSION', missionId => ({ missionId }));
export const selectMission = createAction('SELECT_MISSION', missionId => ({ missionId }));
export const countDown = createAction('COUNT_DOWN', missionId => ({ missionId }));
export const setCountdown = createAction('SET_COUNT_DOWN', isCountdown => ({ isCountdown }));
export const setInitialTime = createAction('SET_INITIAL_TIME');
export const setWorkSound = createAction('SET_WORK_SOUND', sound => ({ sound }));
export const setBreakSound = createAction('SET_BREAK_SOUND', sound => ({ sound }));