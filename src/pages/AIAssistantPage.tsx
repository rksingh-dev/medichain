import React from 'react';
import AIAssistant from '../components/ai/AIAssistant';
import Layout from '../components/layout/Layout';

const AIAssistantPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">AI Medical Assistant</h1>
        <p className="text-gray-600">Get intelligent insights and answers to medical questions</p>
      </div>
      
      <div className="h-[calc(100vh-180px)]">
        <AIAssistant />
      </div>
    </Layout>
  );
};

export default AIAssistantPage;