import { Collapse } from "antd";

const { Panel } = Collapse;

export type ItemsProps = {
  key: string;
  label: string;
  children: React.ReactNode | React.ReactElement;
  isTaken?: boolean;
};

type UMCollapseProps = {
  items: ItemsProps[];
  onChange?: (element: string | string[] | "") => void;
  defaultActiveKey?: string[];
};

const UMCollapse = ({
  items,
  onChange,
  defaultActiveKey = ["1"],
}: UMCollapseProps) => {
  return (
    <Collapse defaultActiveKey={defaultActiveKey} onChange={onChange}>
      {items?.map((item) => {
        return (
          <Panel header={item?.label} key={item?.key}>
            {item?.children}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default UMCollapse;
