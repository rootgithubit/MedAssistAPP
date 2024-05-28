var initialState={user:{},
  doctor:{},
  answers:{}
}

export default function RootReducer(state=initialState,action)
{
   switch(action.type)
   {

    case 'ADD_ANSWERS':
      console.log("PAYYY",action.payload)
      state.answers[action.payload[0]]=action.payload[1]
        console.log("ANSWER",state.answers)
        return ({user:state.user,doctor:state.doctor,answers:state.answers})
    case 'ADD_DOCTOR':
        state.doctor=action.payload[0]
        console.log(state.doctor)
        return ({user:state.user,doctor:state.doctor,answers:state.answers})
    case 'ADD_USER':
        state.user[action.payload[0]]=action.payload[1]
        console.log(state.user)
        return ({user:state.user,doctor:state.doctor,answers:state.answers})
    case 'EDIT_USER':
            state.user[action.payload[0]]=action.payload[1]
            console.log(state.user)
            return ({user:state.user,doctor:state.doctor,answers:state.answers})
    case 'DELETE_USER':
                delete state.user[action.payload[0]]
                console.log(state.user)
        return ({user:state.user,doctor:state.doctor,answers:state.answers})
    default:    
    return ({user:state.user,doctor:state.doctor,answers:state.answers})

   }


}