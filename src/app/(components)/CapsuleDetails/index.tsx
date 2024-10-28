import React from 'react';
import 'primeflex/primeflex.css';

import {convertUtcToZonedTime} from '../../../utility/DateTimeFormatter'

const CapsuleGrid = ({data}) => {


  
  return (
    <div className="p-grid p-justify-center w-full border-0 ps-8">
      <div className="p-col-12 p-md-4 border-0 ">
        <strong className="border-0">Capsule Serial:</strong> <span className="p-col-6 border-0">{data?.capsule_serial ? data.capsule_serial : ''}</span>
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Capsule ID:</strong> {data?.capsule_id ? data.capsule_id : ''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Status:</strong> {data?.status ? data.status : ''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Original Launch:</strong> {data?.original_launch ? convertUtcToZonedTime(data.original_launch) : ''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Original Launch (Unix):</strong> {data?.original_launch_unix ? data.original_launch_unix :''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Landings:</strong> {data?.landings ? data.landings : ''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Type:</strong> {data?.type ? data.type : ''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Details:</strong> {data?.details ? data.details :''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Reuse Count:</strong> {data?.reuse_count ? data.reuse_count : ''}
      </div>
      <div className="p-col-12 p-md-4 py-3">
        <strong>Missions:</strong>
        <ul>
          {data?.missions.map((mission, index) => (
            <li key={index}>{mission?.name ? mission?.name : ''} (Flight: {mission?.flight ? mission.flight :''})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CapsuleGrid;
