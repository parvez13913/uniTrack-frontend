"use client";

import UMCollapse from "@/components/ui/UMCollapse";

const ViewPreregistrationPage = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items = [
    {
      key: "1",
      label: "OOP",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  const onChange = (element: any) => {
    console.log(element);
  };

  return (
    <div>
      <h1>ViewPreregistrationPage</h1>
      <UMCollapse items={items} onChange={onChange} defaultActiveKey={["1"]} />
    </div>
  );
};

export default ViewPreregistrationPage;
