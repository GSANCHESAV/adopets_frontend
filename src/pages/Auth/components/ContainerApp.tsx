import React from 'react';

interface ChildrenComponentProps {
  children: React.ReactNode;
}

const ContainerApp: React.FC<ChildrenComponentProps> = ({
  children,
}: ChildrenComponentProps) => {
  const screenHeight = window.innerHeight;
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: screenHeight,
        backgroundColor: '#fbfeff',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};

export default ContainerApp;
