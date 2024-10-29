import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Capsules ,Status} from './api'



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

interface form{
  capsule_id:string;
  original_launch:string;
  status:Status
}
interface editPaylaod{
  newForm:form;
  selectedRowIndex:number
}

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

    setCapsules:(state , action : PayloadAction<Capsules[]>)=>{
         state = {...state, capsules : action.payload }

         return state
    },
    addCapsule :(state ,action :PayloadAction<Capsules>)=>{
         state.capsules.push(action.payload)
    },
    deleteCapsule :(state ,action :PayloadAction<number>)=>{  
         state.capsules= state.capsules.filter( (capsule,index) => index != action.payload )
    },


    editCapsule: (state, action: PayloadAction<editPaylaod>)=>{

          const newCapsules= state.capsules.map((capsule,index) =>{
               if(index === action.payload.selectedRowIndex)
                {  return {
                          ...capsule, 
                          capsule_id: action.payload.newForm.capsule_id , 
                          original_launch: action.payload.newForm.original_launch,
                          status : action.payload.newForm.status
                  }
                }
              else{  return capsule }
          })

      state = {...state , capsules:newCapsules}

      return state
    },

    setReloadTable:(state , action:PayloadAction<boolean>)=>{
         state.reloadTable = action.payload;
    }
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode ,setCapsules ,addCapsule,deleteCapsule , editCapsule ,setReloadTable} = globalSlice.actions;

export default globalSlice.reducer;
