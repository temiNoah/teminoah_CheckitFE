"use client";

import {  useGetCapsulesQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
 import 'primereact/resources/themes/lara-light-blue/theme.css'; // Or any other theme you prefer
 import 'primereact/resources/primereact.min.css';
 import 'primeicons/primeicons.css';
 import 'primeflex/primeflex.css'; 
 import { FilterMatchMode, FilterOperator } from 'primereact/api';
 import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import { Button } from 'primereact/button';
import { Menubar } from "primereact/menubar";
import { useState,useEffect } from "react";

import { Dialog } from 'primereact/dialog';
import AddOrEditForm from '../(components)/Add';
import { setIsDarkMode, setIsSidebarCollapsed, setCapsules, addCapsule, deleteCapsule, editCapsule } from "@/state";
import {convertUtcToZonedTime , convertZonedTimeToUTC} from '../../utility/DateTimeFormatter';
import StatCard from '../(components)/Card/StatCard'
import {Status} from '../../state/api'
import CapsuleGrid from '../(components)/CapsuleDetails'
import { Capsules } from "@/state/api";

interface formType{
  capsuleId:string;
  originalLaunchDate:string;
  status:Status
}

const Dashboard =  () => {
   const dispatch = useAppDispatch();
   const capsules = useAppSelector((state) => state.global.capsules);
   const { data: products, isError, isLoading } = useGetCapsulesQuery();
   const [isVisible, setIsVisible] = useState(false);
   const [showCapsuleDetails,setShowCapsuleDetails] = useState(false);
   const [globalFilterValue, setGlobalFilterValue] = useState('');
   const [selectedRow , setSelectedRow] = useState<Capsules| null>(null);
   const [selectedRowIndex , setSelectedRowIndex] = useState(-1);


   useEffect(() => {
      products ? dispatch(setCapsules(products)) :'';
   }, [products])

   const [items, setitems] = useState([
     {
       label: "New",
       icon: "pi pi-fw pi-plus",
       command: () => { setIsVisible(true); setSelectedRow(null); }
     },
     {
       label: "Delete",
       icon: "pi pi-fw pi-trash",
     },
     {
       separator: true,
     },
     {
       label: "Export",
       icon: "pi pi-fw pi-external-link",
       // template: ()=> <div></div>
     },
     {
       label:"Refresh",
       icon: "pi pi-refresh",
       command: () => {}
     }
   ]) 


   const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        original_launch: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });


  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

 

  const missionTemplate = (rowData: Capsules) => {
    const result: any[] = Array.isArray(rowData.missions) ? rowData.missions.map( (mission,index) => (
            <div className="flex flex-row gap-2" key={index}> 
                <div> Name: <span>{mission.name}</span>  </div>
                <div> Flight: <span>{mission.flight}</span>  </div>
           </div>
    ))

    :
    []

    return <div className="flex flex-col gap-2">{result}</div>
  };

  const launchDateTemplate = (rowData: Capsules)=>{
        return (
            <div className="flex flex-row gap-1">
               <span>{rowData.original_launch ? convertUtcToZonedTime(rowData.original_launch) :''}</span>
            </div>
    );
  }

  const actionTemplate = (rowData: Capsules,{ rowIndex }:any) => {
    return (
            <div className="flex flex-row gap-1">
               <Button icon="pi pi-pencil" className="p-button-text" onClick={() => { setSelectedRow(rowData);setSelectedRowIndex(rowIndex); setIsVisible(true)}} />
               <Button icon="pi pi-trash" className="p-button-text text-red-500" onClick={() => {dispatch(deleteCapsule(rowIndex))}} />
            </div>
    );
  };

   const onGlobalFilterChange = (e:any) => {
        const value = e.target.value;
        const _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

  const noWrapContentStyle= { bodyStyle : { whiteSpace: 'nowrap', minWidth: '100px' } , headerStyle: { whiteSpace: 'nowrap' }}
  
  const renderHeader=()=>{
        return (
          <div className="flex justify-content-end">
            <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="filter" className="py-2 px-5" />
            </IconField>
          </div>
        );
  };


  const header = renderHeader();

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);



  const handleAddCapsule = (form: formType)=>{
     const capsule ={capsule_id : form.capsuleId , original_launch : form.originalLaunchDate , status : form.status}
     dispatch(addCapsule(capsule))
   }

  const handleEditCapsule = (form: formType, selectedRowIndex: number)=>{
          const newForm = { capsule_id: form.capsuleId, original_launch: form.originalLaunchDate, status: form.status }
           dispatch(editCapsule({ newForm ,selectedRowIndex}))
          setIsVisible(false)
   }




  return (
    <div className="flex flex-col">
      
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-5 pb-4 custom-grid-rows border-0">
            <StatCard
              title="Total Capsules"
              details={[
                {
                  total: products.length,
                },
              ]}
            />

            <StatCard
              title="Total Active Capsules"
              details={[
                {
                  total: products.reduce((sum , capsule)=>{
                                                 return  capsule.status=== Status.Active? sum + 1 : sum
                                  },0)
                
                },
              ]}
            />

            <StatCard
              title="Total Destroyed Capsules"
              details={[
                {
                  total: products.reduce((sum , capsule)=>{
                               return  capsule.status=== Status.Destroyed? sum + 1 : sum
                  },0)
                },
              ]}
            />
         </div>
      {/* <Header name="Inventory" /> */}
      <Menubar model={items} className="bg-gray-100" />
     
      <div className="card">
        <DataTable value={capsules} paginator rows={5} stripedRows showGridlines={true} rowsPerPageOptions={[5, 10, 25, 50]} 
          tableStyle={{ minWidth: '100rem' }}    
          filters={filters} filterDisplay="row" loading={isLoading}
          globalFilterFields={['status', 'original_launch', 'type']}
          header={header} emptyMessage="No capsules found."
          selectionMode="single" 
          selection={selectedRow} 
          onSelectionChange={(e) => {setSelectedRow(e.value as Capsules); setShowCapsuleDetails(true); }}
          >
          <Column field="capsule_serial" header="Capsule Serial" sortable {...noWrapContentStyle} />
          <Column field="capsule_id" header="Capsule ID" sortable className="w-55" {...noWrapContentStyle} />
          <Column field="status" header="Status" />
          <Column field="original_launch" header="Original Launch" body={launchDateTemplate} sortable {...noWrapContentStyle} />
          <Column field="original_launch_unix" header="Original Launch Unix" sortable {...noWrapContentStyle} />
          <Column field="missions" header="Missions" body={missionTemplate}  {...noWrapContentStyle} />
          <Column field="landings" header="Landings" sortable {...noWrapContentStyle} />
          <Column field="type" header="Type" sortable {...noWrapContentStyle} />
          <Column field="details" header="Details"  bodyStyle={{minWidth:'200px'}} />
          <Column field="reuse_count" header="Reuse Count" sortable {...noWrapContentStyle} />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </div>


      
      {
        isVisible &&
      <Dialog
                header= { (selectedRow ? "Edit":"Add " )+ " new capsule"}
                visible={isVisible}
                style={{ width: '50%' , height:'70%' }}
                onHide={()=>{closeModal(); setSelectedRow(null)}}
            >
              <AddOrEditForm 
                      onSubmit={(form)=>{ selectedRow? handleEditCapsule(form , selectedRowIndex) :handleAddCapsule(form)}} 
                      onCancel={closeModal} 
                      formValues={selectedRow ? selectedRow : null}
              />
       </Dialog>
      }


     { selectedRow &&
       <Dialog
            header= { "Capsule Details"}
            visible={showCapsuleDetails}
            style={{ width: '50%' , height:'70%' }}
            onHide={()=>{setShowCapsuleDetails(false); setSelectedRow(null)}}
       >
          <CapsuleGrid data={selectedRow}/>
       </Dialog>
      }
    
    </div>
  );
};

export default Dashboard;
