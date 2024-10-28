import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Capsules} from './api'



export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  capsules : Capsules[],
  reloadTable:boolean
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  capsules :[],
  reloadTable:false
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },

    setCapsules:(state , action : PayloadAction<Capsules>)=>{
         state.capsules =action.payload
    },
    addCapsule :(state ,action :PayloadAction<Capsules>)=>{
         state.capsules.push(action.payload)
    },
    deleteCapsule :(state ,action :PayloadAction<Capsules>)=>{  
         state.capsules= state.capsules.filter( (capsule,index) => index != action.payload )
    },


    editCapsule : (state , action : PayloadAction<Capsules>)=>{

          state.capsules= state.capsules.map((capsule,index) =>{
               if(index === action.payload.selectedRowIndex)
                {  return {
                          ...capsule, 
                          capsule_id: action.payload.form.capsuleId , 
                          original_launch:action.payload.form.originalLaunchDate,
                          status : action.payload.form.status
                  }
                }
              else{  return capsule }
          })
    },

    setReloadTable:(state , action:PayloadAction<boolean>)=>{
         state.reloadTable = action.payload;
    }
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode ,setCapsules ,addCapsule,deleteCapsule , editCapsule ,setReloadTable} = globalSlice.actions;

export default globalSlice.reducer;
