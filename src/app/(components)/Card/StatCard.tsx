import { Button } from "primereact/button";
import React from "react";

type StatDetail = {
  total: number;
};

type StatCardProps = {
  title: string;
  details: StatDetail[];
};

const StatCard = ({title,details}: StatCardProps) => {

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between w-[30%]">
            {/* HEADER */}
            <div>
              <div className="flex justify-between items-center mb-2 px-5 pt-4">
                <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
              </div>
              <hr />
            </div>

           {/* BODY */}
           <div className="flex mb-6 items-center justify-around gap-4 px-5">
                <div className="flex-1">
                  {details.map((detail, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center justify-between my-4">
                        <span className="font-bold text-gray-800 text-5xl">{detail.total}</span>
                      </div>
                      {index < details.length - 1 && <hr />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
      


    </div>
  );
};

export default StatCard;
