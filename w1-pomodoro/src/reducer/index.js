import produce from 'immer';

const initialState = {
  isCountdown: false,
  isBreakTime: false,
  BreakDefaultTime: 300,
  BreaktTime: 300,
  sound: {
    break: 'default',
    work: 'babySound'
  },
  missions: [
    {
      id: 1,
      name: 'FIND A FUCKING JOB',
      done: false,
      tomatoes: 4,
      selected: true,
      initialTime: 3,
      time: 3,
    },
    {
      id: 2,
      name: 'SURF GITHUB AND PORNHUB',
      done: false,
      tomatoes: 0,
      selected: false,
      initialTime: 1500,
      time: 1500
    },
    {
      id: 2,
      name: 'WHATS DONE IS DONE',
      done: true,
      tomatoes: 3,
      selected: false,
      initialTime: 1500,
      time: 0
    }    
  ]
};

const appReducer = (state = initialState, action) => produce(state, draft => {  
  switch (action.type) {
    case 'ADD_MISSION':
      if (!action.payload.newMissionName) return  
      draft.missions.push({
        id: draft.missions.length + 1,
        name: action.payload.newMissionName,
        done: false,
        tomatoes: 0,
        selected: draft.missions.filter(x => x.selected).length === 0 ? true : false,
        initialTime: 1500,
        time: 1500
      });
      break;
    case 'FINISH_MISSION':
      if(draft.missions.filter(x => x.selected).length === 0) {        
        draft.missions.find(x => x.id === action.payload.missionId).selected = true  
      }
      draft.missions.find(x => x.id === action.payload.missionId).selected = false
      draft.missions.find(x => x.id === action.payload.missionId).done = true          
      if (!draft.missions.find(x => x.selected) && draft.missions.filter(x => !x.done).length > 0) {
        const sortById = (a, b) => {
          return a.id - b.id;
        }
        draft.missions.filter(x => !x.done).sort(sortById)
        draft.missions.filter(x => !x.done)[0].selected = true
      }      
      break;
    case 'SELECT_MISSION':
      draft.missions.find(x => x.selected) && (draft.missions.find(x => x.selected).selected = false)
      draft.missions.find(x => x.id === action.payload.missionId) && (draft.missions.find(x => x.id === action.payload.missionId).selected = true)
      break;
    case 'COUNT_DOWN':         
      draft.missions.find(x => x.selected) && (draft.missions.find(x => x.selected).time = draft.missions.find(x => x.selected).time - 1)
      if (draft.missions.find(x => x.selected).time === 0) {
        draft.missions.find(x => x.selected).tomatoes += 1;
        draft.isCountdown = false         
      } 
      break;
    case 'SET_COUNT_DOWN':      
      draft.isCountdown = action.payload.isCountdown
      break;
    case 'SET_INITIAL_TIME':      
      draft.missions.find(x => x.selected).time = draft.missions.find(x => x.selected).initialTime
      break;   
    case 'SET_WORK_SOUND':            
      draft.sound.work = action.payload.sound
      break;
    case 'SET_BREAK_SOUND':      
      draft.sound.break = action.payload.sound
      break;
    case 'SET_BREAK_MODE':      
      draft.isBreakTime = action.payload.isBreakTime
      break;  
    default:
      break;
  }
})

export default appReducer;