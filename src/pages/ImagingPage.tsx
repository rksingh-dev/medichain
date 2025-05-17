import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { mockMedicalRecords } from '../data/mockData';
import MedicalImageCard from '../components/medical/MedicalImageCard';
import Layout from '../components/layout/Layout';

const ImagingPage: React.FC = () => {
  // Filter records by image type
  const ecgRecords = mockMedicalRecords.filter(record => 
    record.images?.some(img => img.type === 'ecg')
  );
  
  const mriRecords = mockMedicalRecords.filter(record => 
    record.images?.some(img => img.type === 'mri')
  );
  
  const xrayRecords = mockMedicalRecords.filter(record => 
    record.images?.some(img => img.type === 'xray')
  );
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Medical Imaging</h1>
        <p className="text-gray-600">View and analyze patient medical images</p>
      </div>
      
      <Tabs defaultValue="all">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Images</TabsTrigger>
            <TabsTrigger value="ecg">ECG</TabsTrigger>
            <TabsTrigger value="mri">MRI</TabsTrigger>
            <TabsTrigger value="xray">X-Ray</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMedicalRecords.map(record => 
              record.images?.map((image, index) => (
                <MedicalImageCard 
                  key={`${record.id}-${index}`} 
                  record={record} 
                  image={image} 
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="ecg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecgRecords.map(record => 
              record.images
                ?.filter(img => img.type === 'ecg')
                .map((image, index) => (
                  <MedicalImageCard 
                    key={`${record.id}-${index}`} 
                    record={record} 
                    image={image} 
                  />
                ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="mri">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mriRecords.map(record => 
              record.images
                ?.filter(img => img.type === 'mri')
                .map((image, index) => (
                  <MedicalImageCard 
                    key={`${record.id}-${index}`} 
                    record={record} 
                    image={image} 
                  />
                ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="xray">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {xrayRecords.map(record => 
              record.images
                ?.filter(img => img.type === 'xray')
                .map((image, index) => (
                  <MedicalImageCard 
                    key={`${record.id}-${index}`} 
                    record={record} 
                    image={image} 
                  />
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ImagingPage;